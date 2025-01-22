import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LensSearchScreen from '../screens/LensSearchScreen';
import LensResultsScreen from '../screens/LensResultsScreen';
import { LensSearch, GoogleSearch, Home, VoiceSearch, } from './ScreenNameConstant';
import GoogleSearchScreen from '../screens/GoogleSearch';
import VoiceSearchScreen from '../screens/VoiceSearch';

export type RootStackParamList = {
  Home: undefined;
  LensSearch: undefined;
  GoogleSearch: undefined;
  VoiceSearch:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name={Home} component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={LensSearch} component={LensSearchScreen} options={{ headerShown: false }}/>
      <Stack.Screen name={GoogleSearch} component={GoogleSearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name={VoiceSearch} component={VoiceSearchScreen} options={{ headerShown: false }} />




    </Stack.Navigator>
  );
}
