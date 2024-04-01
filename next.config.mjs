/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  api: {
    bodyParser: false,
  },
};

export default nextConfig;
