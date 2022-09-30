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
        source: 'http://localhost:3000',
        destination: 'https://blog.test.yachtmate.club'
      },
    ];
  },
};