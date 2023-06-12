/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "20.127.184.47",
        port: "8081",
      },
      {
        protocol: "https",
        hostname: "openapi.tuyaeu.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
