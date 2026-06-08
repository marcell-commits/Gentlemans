import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f8f6f1] px-5 text-[#131413]">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold text-[#185c4e]">404</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight">Ez a variáns nem található.</h1>
        <p className="mt-4 leading-7 text-[#605c56]">
          Elérhető útvonalak: barber, szepsegszalon, autokozmetika, szemelyi-edzo.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#131413] px-5 text-sm font-bold text-white"
        >
          Vissza a főoldalra
        </Link>
      </div>
    </main>
  );
}
