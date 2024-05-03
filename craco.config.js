const CracoAlias = require("craco-alias");

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify"),
        },
      },
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        // Configurations des alias si nécessaire
      },
    },
  ],
};
