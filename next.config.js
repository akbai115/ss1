const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
  // Ensure strict checks don't break the build silently
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig; 