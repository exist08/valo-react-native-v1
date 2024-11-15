import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import Agents from './screens/Agents';
import Maps from './screens/Maps';
import Cards from './screens/Cards';
import Weapons from './screens/Weapons';
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Weapons"
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
        <Drawer.Screen name="Agents" component={Agents} />
        <Drawer.Screen name="Maps" component={Maps} />
        <Drawer.Screen name="Cards" component={Cards} />
        <Drawer.Screen name="Weapons" component={Weapons} />
        {/* Add more screens as needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
