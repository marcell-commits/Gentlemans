const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/Gentlemans";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isGitHubPages ? repoBasePath : "",
  assetPrefix: isGitHubPages ? `${repoBasePath}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? repoBasePath : ""
  },
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  }
};

export default nextConfig;
