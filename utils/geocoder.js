const NodeGeocoder = require('node-geocoder');

var options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formaterr: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
