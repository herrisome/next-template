/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: false,
  // 取消注释以添加域白名单
  images: {
    domains: [
      'res.cloudinary.com',
      'dummyimage.com',
      'feishu.com',
      's1-imfile.feishucdn.com',
      's3-imfile.feishucdn.com',
    ],
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};
