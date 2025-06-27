/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },
};

export default nextConfig;
