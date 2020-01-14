import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import AppLoading from './src/screens/AppLoading'
import Onboarding from './src/screens/Onboarding'
import EventFeed from './src/screens/EventFeed'
import Auth from './src/screens/Auth'
import AuthName from './src/screens/AuthName'
import AuthEmail from './src/screens/AuthEmail'


const AuthStack = createStackNavigator({ Auth, AuthName, AuthEmail })
const AppStack = createStackNavigator({ EventFeed }, { headerMode: 'none' })

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AppLoading,
      Onboarding,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Onboarding'
    }
  )
)

export default function App() {
  const theme = useColorScheme()

  return (
    <AppearanceProvider>
      <AppContainer theme={theme} />
    </AppearanceProvider>
  )
}
