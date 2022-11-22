import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const { Navigator, Screen } = createBottomTabNavigator()

import { Dashboard } from '../pages/Dashboard'
import { ListInvoice } from '../pages/ListInvoice'


export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88
        }
      }}
    >
      <Screen
        name='Cadastro'
        component={Dashboard}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (({ size, color }) =>
            <AntDesign
              name='adduser'
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen
        name='Listagem'
        component={ListInvoice}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (({ size, color }) =>
            <Feather
              name='list'
              size={size}
              color={color}
            />
          )
        }}
      />

    </Navigator>
  )
}