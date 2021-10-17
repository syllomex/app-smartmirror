import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../assets/colors';
import Widgets from '../screens/Widgets';
import Configuration from '../screens/Configuration';

const { Navigator, Screen } = createBottomTabNavigator();

const Tabs: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: colors.light_2,
        tabBarInactiveBackgroundColor: colors.light_2,
        tabBarActiveTintColor: colors.dark_1,
        tabBarInactiveTintColor: colors.dark_2_transparent,
        tabBarShowLabel: false,
      }}
      sceneContainerStyle={{ backgroundColor: colors.dark_1 }}
    >
      <Screen
        name="Widgets"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps" color={color} size={size} />
          ),
        }}
        component={Widgets}
      />

      <Screen
        name="Configuration"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
        component={Configuration}
      />
    </Navigator>
  );
};

export default Tabs;
