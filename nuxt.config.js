const pkg = require('./package');

module.exports = {
  mode: 'universal',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' },
    ],
  },

  loading: { color: '#fff' },
  css: [
  ],
  plugins: [
  ],
  modules: [
  ],
  build: {
    extend(config, ctx) {
    },
  },
  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' },
  ],
};
