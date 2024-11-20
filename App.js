import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './components/ButtonTab/TabNavigator';
import SplashScreen from './pages/SplashScreen'; // Import splash screen
import AboutScreen from './pages/AboutScreen';
import TermsOfServiceScreen from './pages/TermsOfServiceScreen';
import PrivacyPolicyScreen from './pages/PrivacyPolicyScreen';
import HelpScreen from './pages/HelpScreen';
import EditProfileScreen from './pages/EditProfileScreen';
import ProfileScreen from './pages/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="MainApp"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'Profile', headerShown: true }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{ title: 'Edit Profile', headerShown: true }}
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
            <Stack.Screen name="SplashScreen" 
              component={SplashScreen} 
              options={{ headerShown: false }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
