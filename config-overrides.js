const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: 'src/search.js',
    template: 'public/search.html',
    outPath: '/search.html'
  },
  {
    entry: 'src/car_page.js',
    template: 'public/car_page.html',
    outPath: '/car_page.html'
  }
]);

module.exports = {
  webpack: function(config, env) {
    multipleEntry.addMultiEntry(config);
    return config;
  }
};
