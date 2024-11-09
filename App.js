import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import NewsScreen from './screens/NewsScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#1A1A1A', // dark background
            width: 250,
          },
          headerShown: false,
          drawerActiveBackgroundColor: '#FF4655', // active item color (red)
          drawerActiveTintColor: '#fff', // active item text color
          drawerInactiveTintColor: '#fff', // inactive item text color
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Game" component={GameScreen} />
        <Drawer.Screen name="News" component={NewsScreen} />
        {/* Add more screens as needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
