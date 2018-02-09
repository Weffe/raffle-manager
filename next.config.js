const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
  webpack(config, { dev }) {
    // remove Uglify plugin
    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== "UglifyJsPlugin";
    });

    if (!dev) {
      // add Babili plugin
      config.plugins.push(
        new BabiliPlugin()
      );
    }

    return config;
  },
  exportPathMap() {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
      '/register': { page: '/register' },
      '/forgotaccount': { page: '/forgotaccount' },
      '/dashboard': { page: '/dashboard' },
    }
  }
}