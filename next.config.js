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
        source: 'https://blog.test.yachtmate.club',
        destination: 'http://localhost:3000'
      },
    ];
  },
};