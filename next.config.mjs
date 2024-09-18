/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["cdn.dummyjson.com", "google.com"],
  },
};

export default nextConfig;
