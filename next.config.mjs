/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "2pvfvqb3-3000.brs.devtunnels.ms"]
    }
  }
};

export default nextConfig;
