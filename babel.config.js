module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@features': './src/features',
            '@navigation': './src/navigation',
            '@styles': './src/styles',
            '@stores': './src/stores',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@types': './src/types',
            '@assets': './assets',
          },
        },
      ],
    ],
  };
};
