/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/files/:path*",
        destination: "/api/files/:path*",
      },
    ];
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "2pvfvqb3-3000.brs.devtunnels.ms"]
    }
  }
};

export default nextConfig;
