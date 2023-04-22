// .storybook/main.ts

import viteTsconfigPaths from 'vite-tsconfig-paths'
const config = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-mdx-gfm'],
  core: {},
  async viteFinal(config, options) {
    return {
      ...config,
      plugins: [...(config.plugins || []), viteTsconfigPaths()],
    }
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
}
export default config
