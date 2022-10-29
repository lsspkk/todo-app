// .storybook/main.ts

import type { StorybookViteConfig } from '@storybook/builder-vite'
import defaultConfig from '../vite.config'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'

const config: StorybookViteConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, options) {
    return { ...config, plugins: [...(config.plugins || []), viteTsconfigPaths()] }
  },
}

export default config
