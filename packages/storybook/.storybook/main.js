const { mergeConfig } = require('vite');
const viteTsConfigPaths = require('vite-tsconfig-paths').default;
const rootMain = require('../../../.storybook/main');

export default {
  ...rootMain,
  stories: [
    ...rootMain.stories,
    '../../tompke/**/src/lib/**/*.stories.@(ts|mdx)',
  ],
  addons: [...rootMain.addons],
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [
        viteTsConfigPaths({
          root: '../../../',
        }),
      ],
    });
  },
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
};
