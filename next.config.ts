/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // আনস্প্ল্যাশ ইমেজের জন্য
      },
      {
        protocol: 'https',
        hostname: '**', // এটি দিলে যেকোনো অনলাইন সোর্স থেকে ছবি লোড হবে (সহজ সমাধান)
      },
    ],
  },
};

export default nextConfig;