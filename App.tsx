import React, {createContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux'; // Import Provider
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store/store'; // Import the Redux store
import {mainBackgroundColor} from './src/constant';
import { ThemeProvider } from './src/utils/ThemeContext';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  return (
    <ThemeProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
}
