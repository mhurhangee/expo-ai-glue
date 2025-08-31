import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { useCustomFonts } from '@/hooks/use-custom-fonts';
import { ThemeContext, useThemeState } from "@/hooks/use-theme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const themeState = useThemeState();
  const [loaded, error] = useCustomFonts();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={themeState}>
      <GluestackUIProvider mode={themeState.isDarkMode ? 'dark' : 'light'}>
        <ThemeProvider value={themeState.isDarkMode ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </GluestackUIProvider>
    </ThemeContext.Provider>
  );
}