import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { store } from './src/store';
import HomeScreen from './src/screens/HomeScreen';
import CallLogsScreen from './src/screens/CallLogsScreen';
import BlockListScreen from './src/screens/BlockListScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: '#2196F3',
                tabBarInactiveTintColor: '#757575',
              }}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: 'หน้าหลัก',
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="home" size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="CallLogs"
                component={CallLogsScreen}
                options={{
                  title: 'ประวัติการโทร',
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="phone-log" size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="BlockList"
                component={BlockListScreen}
                options={{
                  title: 'รายการบล็อก',
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="block-helper" size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  title: 'ตั้งค่า',
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="cog" size={size} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
