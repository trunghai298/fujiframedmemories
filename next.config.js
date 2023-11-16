/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
  env: {
    CLIENT_ID:
      "154898651210-fa37fl34j4j5ehkbbhgqr8j95kpfkm31.apps.googleusercontent.com",
    CLIENT_SECRET: "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",
    REDIRECT_URI: "http://localhost:3000/api/auth/callback/google",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
