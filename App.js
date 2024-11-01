import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './components/ButtonTab/TabNavigator';
import AboutScreen from './pages/AboutScreen';
import TermsOfServiceScreen from './pages/TermsOfServiceScreen';
import PrivacyPolicyScreen from './pages/PrivacyPolicyScreen';
import HelpScreen from './pages/HelpScreen';
import EditProfileScreen from './pages/EditProfileScreen';
import ProfileScreen from './pages/ProfileScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainApp" 
          component={TabNavigator}
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="Profile" // Tambahkan ini untuk layar Profile
          component={ProfileScreen}
          options={{
            title: 'Profile',
            headerShown: true,
          }}
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={{
            title: 'Edit Profile',
            headerShown: true,
          }}
        />

        <Stack.Screen 
          name="Help" 
          component={HelpScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Privacy" 
          component={PrivacyPolicyScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Terms" 
          component={TermsOfServiceScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// components/ButtonTab/styles.js (Optional: jika ingin memisahkan styles)
import { StyleSheet } from 'react-native';

export const tabStyles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    padding: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
