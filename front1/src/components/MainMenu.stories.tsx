import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MainMenu } from './MainMenu'

export default { component: MainMenu } as ComponentMeta<typeof MainMenu>
export const Home: ComponentStory<typeof MainMenu> = () => (
  <MainMenu {...{ username: 'Tester', pathname: 'home', handleLogout: () => {} }} />
)
