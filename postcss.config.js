/* eslint-disable global-require */
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    require('autoprefixer'),
    postcssPresetEnv({
      stage: 0,
      features: {
        'nesting-rules': true,
        'color-mod-function': true,
        'custom-media': true,
        'focus-within-pseudo-class': false,
      },
    }),
  ],
};
