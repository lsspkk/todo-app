import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { MainMenu } from './MainMenu'

export default { component: MainMenu } as Meta<typeof MainMenu>
export const Home: StoryFn<typeof MainMenu> = () => (
  <MainMenu {...{ username: 'Tester', pathname: 'home', handleLogout: () => {} }} />
)
