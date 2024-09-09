/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        port: "",
        hostname: "fatvo.salyam.uz",
      },
      {
        protocol: "https",
        port: "",
        hostname: "backfatvo.salyam.uz",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
