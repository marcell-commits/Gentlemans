from __future__ import annotations

import base64
import sys
from dataclasses import dataclass
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / ".codex-python-packages"))

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer


ROOT = Path(__file__).resolve().parents[1]
FONT_PATH = ROOT / "assets" / "logo-fonts" / "Cinzel.ttf"
OUT_DIR = ROOT / "assets" / "logo-rebuild"

VIEWBOX_W = 1182
VIEWBOX_H = 333
PRIMARY_GOLD = "#A67C45"
ALT_GOLD = "#B08A4A"


@dataclass(frozen=True)
class TextTarget:
    name: str
    text: str
    x1: float
    y1: float
    x2: float
    y2: float


@dataclass(frozen=True)
class LayoutRun:
    target: TextTarget
    size: float
    tracking: float
    x: float
    baseline: float
    bbox: tuple[float, float, float, float]


TEXT_TARGETS = [
    TextTarget("main", "GENTLEMAN'S CLUB", 37, 46, 1144, 129),
    TextTarget("barbershop", "BARBERSHOP", 304, 177, 864, 212),
    TextTarget("city", "SZOMBATHELY", 367, 258, 801, 287),
]

LINE_LEFT = (52, 193.8, 259, 193.8)
LINE_RIGHT = (904, 193.8, 1125, 193.8)
LINE_WIDTH = 3.2
WEIGHT = 500


def xml_escape(value: str) -> str:
    return (
        value.replace("&", "&amp;")
        .replace('"', "&quot;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def fmt(value: float) -> str:
    rounded = round(value, 3)
    if abs(rounded - round(rounded)) < 0.001:
        return str(int(round(rounded)))
    return f"{rounded:.3f}".rstrip("0").rstrip(".")


def load_font() -> TTFont:
    font = TTFont(str(FONT_PATH))
    return instancer.instantiateVariableFont(font, {"wght": WEIGHT}, inplace=False)


def glyph_bounds(glyph_set, glyph_name: str) -> tuple[float, float, float, float] | None:
    pen = BoundsPen(glyph_set)
    glyph_set[glyph_name].draw(pen)
    return pen.bounds


def get_glyph_path(glyph_set, glyph_name: str) -> str:
    pen = SVGPathPen(glyph_set)
    glyph_set[glyph_name].draw(pen)
    return pen.getCommands()


def local_bbox(
    font: TTFont,
    glyph_set,
    target: TextTarget,
    size: float,
    tracking: float,
) -> tuple[float, float, float, float]:
    cmap = font.getBestCmap()
    upm = font["head"].unitsPerEm
    scale = size / upm
    pen_x = 0.0
    bounds: list[tuple[float, float, float, float]] = []

    for index, char in enumerate(target.text):
        glyph_name = cmap.get(ord(char))
        if glyph_name:
            box = glyph_bounds(glyph_set, glyph_name)
            if box:
                x_min, y_min, x_max, y_max = box
                bounds.append(
                    (
                        pen_x * scale + x_min * scale,
                        -y_max * scale,
                        pen_x * scale + x_max * scale,
                        -y_min * scale,
                    )
                )
            advance = glyph_set[glyph_name].width
        else:
            advance = glyph_set["space"].width if "space" in glyph_set else upm * 0.25

        pen_x += advance
        if index < len(target.text) - 1:
            pen_x += tracking / scale

    return (
        min(box[0] for box in bounds),
        min(box[1] for box in bounds),
        max(box[2] for box in bounds),
        max(box[3] for box in bounds),
    )


def fit_text(font: TTFont, glyph_set, target: TextTarget) -> LayoutRun:
    raw_box = local_bbox(font, glyph_set, target, 100, 0)
    raw_height = raw_box[3] - raw_box[1]
    target_height = target.y2 - target.y1
    size = 100 * target_height / raw_height

    width_0 = local_bbox(font, glyph_set, target, size, 0)[2] - local_bbox(
        font, glyph_set, target, size, 0
    )[0]
    width_1 = local_bbox(font, glyph_set, target, size, 1)[2] - local_bbox(
        font, glyph_set, target, size, 1
    )[0]
    tracking_slope = width_1 - width_0
    target_width = target.x2 - target.x1
    tracking = (target_width - width_0) / tracking_slope if tracking_slope else 0

    box = local_bbox(font, glyph_set, target, size, tracking)
    x = target.x1 - box[0]
    baseline = target.y1 - box[1]
    placed_box = (box[0] + x, box[1] + baseline, box[2] + x, box[3] + baseline)
    return LayoutRun(target, size, tracking, x, baseline, placed_box)


def build_path_runs(font: TTFont, glyph_set, run: LayoutRun, color: str) -> list[str]:
    cmap = font.getBestCmap()
    upm = font["head"].unitsPerEm
    scale = run.size / upm
    pen_x = 0.0
    parts: list[str] = []

    for index, char in enumerate(run.target.text):
        glyph_name = cmap.get(ord(char))
        if glyph_name:
            path = get_glyph_path(glyph_set, glyph_name)
            if path:
                x = run.x + pen_x * scale
                parts.append(
                    f'<path d="{path}" fill="{color}" transform="translate({fmt(x)} {fmt(run.baseline)}) scale({fmt(scale)} -{fmt(scale)})"/>'
                )
            advance = glyph_set[glyph_name].width
        else:
            advance = glyph_set["space"].width if "space" in glyph_set else upm * 0.25

        pen_x += advance
        if index < len(run.target.text) - 1:
            pen_x += run.tracking / scale

    return parts


def build_outlined_svg(color: str, title: str) -> str:
    font = load_font()
    glyph_set = font.getGlyphSet()
    runs = [fit_text(font, glyph_set, target) for target in TEXT_TARGETS]
    content: list[str] = []
    for run in runs:
        content.extend(build_path_runs(font, glyph_set, run, color))

    content.append(
        f'<line x1="{LINE_LEFT[0]}" y1="{LINE_LEFT[1]}" x2="{LINE_LEFT[2]}" y2="{LINE_LEFT[3]}" stroke="{color}" stroke-width="{LINE_WIDTH}" stroke-linecap="butt"/>'
    )
    content.append(
        f'<line x1="{LINE_RIGHT[0]}" y1="{LINE_RIGHT[1]}" x2="{LINE_RIGHT[2]}" y2="{LINE_RIGHT[3]}" stroke="{color}" stroke-width="{LINE_WIDTH}" stroke-linecap="butt"/>'
    )

    return "\n".join(
        [
            '<?xml version="1.0" encoding="UTF-8"?>',
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{VIEWBOX_W}" height="{VIEWBOX_H}" viewBox="0 0 {VIEWBOX_W} {VIEWBOX_H}" role="img" aria-label="{xml_escape(title)}">',
            f"<title>{xml_escape(title)}</title>",
            '<g id="gentlemans-club-barbershop-szombathely" fill-rule="nonzero">',
            *content,
            "</g>",
            "</svg>",
            "",
        ]
    )


def build_editable_svg() -> str:
    font = load_font()
    glyph_set = font.getGlyphSet()
    runs = [fit_text(font, glyph_set, target) for target in TEXT_TARGETS]
    encoded_font = base64.b64encode(FONT_PATH.read_bytes()).decode("ascii")

    texts = []
    for run in runs:
        center_x = (run.target.x1 + run.target.x2) / 2
        texts.append(
            f'<text x="{fmt(center_x)}" y="{fmt(run.baseline)}" text-anchor="middle" font-family="Cinzel" font-size="{fmt(run.size)}" font-weight="{WEIGHT}" letter-spacing="{fmt(run.tracking)}" fill="{PRIMARY_GOLD}">{xml_escape(run.target.text)}</text>'
        )

    return "\n".join(
        [
            '<?xml version="1.0" encoding="UTF-8"?>',
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{VIEWBOX_W}" height="{VIEWBOX_H}" viewBox="0 0 {VIEWBOX_W} {VIEWBOX_H}" role="img" aria-label="Gentleman&apos;s Club Barbershop Szombathely editable logo">',
            "<defs>",
            "<style>",
            "@font-face {",
            "  font-family: 'Cinzel';",
            f"  src: url(data:font/ttf;base64,{encoded_font}) format('truetype');",
            "  font-weight: 400 900;",
            "}",
            "</style>",
            "</defs>",
            *texts,
            f'<line x1="{LINE_LEFT[0]}" y1="{LINE_LEFT[1]}" x2="{LINE_LEFT[2]}" y2="{LINE_LEFT[3]}" stroke="{PRIMARY_GOLD}" stroke-width="{LINE_WIDTH}" stroke-linecap="butt"/>',
            f'<line x1="{LINE_RIGHT[0]}" y1="{LINE_RIGHT[1]}" x2="{LINE_RIGHT[2]}" y2="{LINE_RIGHT[3]}" stroke="{PRIMARY_GOLD}" stroke-width="{LINE_WIDTH}" stroke-linecap="butt"/>',
            "</svg>",
            "",
        ]
    )


def build_specs() -> str:
    font = load_font()
    glyph_set = font.getGlyphSet()
    runs = [fit_text(font, glyph_set, target) for target in TEXT_TARGETS]
    lines = [
        "# Gentleman's Club Barbershop Szombathely - Canva beallitasok",
        "",
        "Referencia: `public/gentlemans-club-logo.jpg`",
        "",
        "## Font",
        "",
        "- Valasztott font: Cinzel",
        "- Font weight: 500 / Medium",
        "- Indoklas: a megadott listabol ez adja vissza legjobban a referencia klasszikus romai kapitalis, premium barber karakteret.",
        "",
        "## Szinek",
        "",
        f"- Arany: `{PRIMARY_GOLD}`",
        f"- Alternativ arany: `{ALT_GOLD}`",
        "- Fekete: `#000000`",
        "- Feher: `#FFFFFF`",
        "",
        "## Meretezes es spacing",
        "",
        "A meretek a `1182 x 333 px` SVG viewBox koordinatarendszereben ertendok.",
        "",
        "| Elem | Szoveg | Font size | Letter spacing | Bbox |",
        "| --- | --- | ---: | ---: | --- |",
    ]
    for run in runs:
        lines.append(
            f"| {run.target.name} | `{run.target.text}` | `{fmt(run.size)} px` | `{fmt(run.tracking)} px` | `{fmt(run.bbox[0])},{fmt(run.bbox[1])} - {fmt(run.bbox[2])},{fmt(run.bbox[3])}` |"
        )
    lines.extend(
        [
            "",
            "## Vonalak",
            "",
            f"- Bal vonal: `{LINE_LEFT[0]},{LINE_LEFT[1]} - {LINE_LEFT[2]},{LINE_LEFT[3]}`",
            f"- Jobb vonal: `{LINE_RIGHT[0]},{LINE_RIGHT[1]} - {LINE_RIGHT[2]},{LINE_RIGHT[3]}`",
            f"- Vastagsag: `{LINE_WIDTH} px`",
            "- Line cap: butt / negyszoges veg",
            "",
            "## Canva export",
            "",
            "- Background: transparent",
            "- Export: PNG",
            "- Canva Premium opcio: Transparent Background bekapcsolva",
            "- Ne legyen hatterszin, keret, panel, ikon vagy arnyek.",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    variants = {
        "gold": PRIMARY_GOLD,
        "black": "#000000",
        "white": "#FFFFFF",
    }
    for name, color in variants.items():
        svg = build_outlined_svg(
            color,
            f"Gentleman's Club Barbershop Szombathely {name} logo",
        )
        (OUT_DIR / f"gentlemans-club-logo-{name}.svg").write_text(
            svg, encoding="utf-8"
        )

    (OUT_DIR / "gentlemans-club-logo-canva-editable.svg").write_text(
        build_editable_svg(), encoding="utf-8"
    )
    (OUT_DIR / "canva-specs.md").write_text(build_specs(), encoding="utf-8")
    print(f"Generated SVG assets in {OUT_DIR}")


if __name__ == "__main__":
    main()
