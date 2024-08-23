/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*', 
            destination: 'http://localhost:5000/api/:path*', // Forward requests to your API server
          },
        ];
      },
};

export default nextConfig;
