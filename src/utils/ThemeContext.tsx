import React, { createContext, useState, useContext } from 'react';
import { mainBackgroundColor } from '../constant';


const theme = {
    light: {
      background: '#ffffff', // White background
      text: '#000000', // Black text
      primary: '#4285F4', // Primary color (e.g., buttons, icons)
      secondary: '#f0f0f0', // Secondary elements
    },
    dark: {
      background: mainBackgroundColor, // Black background
      text: '#ffffff', // White text
      primary: '#1a73e8', // Primary color
      secondary: '#121212', // Secondary elements
    },
  };
  

const ThemeContext = createContext({
  theme: theme.light, // Default theme
  toggleTheme: () => {}, // Placeholder for toggle function
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme: isDark ? theme.dark : theme.light, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
