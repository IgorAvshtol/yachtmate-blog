module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['adminblog.test.yachtmate.club'],
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      {
        source: '/api',
        destination: 'https://backend.test.yachtmate.club/api'
      },
    ];
  },
};