import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importing fonts to use for UI, (SpaceMono-Regular)
import { DarkTheme, 
         DefaultTheme, 
         ThemeProvider 
} from '@react-navigation/native'; // Importing dark theme from react native to make the screen dark when necessary
import { useFonts } from 'expo-font'; // Another font import
import { Stack } from 'expo-router'; // 
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@components/useColorScheme';
import CartProvider from '@/provider/CartProvider';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <Stack>
          <Stack.Screen name="index" options={{ 
            title: 'Food Ordering', 
            headerTitleStyle: {
              fontSize: 30, 
              fontWeight: 'bold', 
            }
          }}
          />
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} /> {/*Auth.*/}
          
          <Stack.Screen name="cart" options={{ 
            presentation: 'modal',
            title: 'Cart', // Set the title to 'Cart'
            headerTitleStyle: {
              fontSize: 20, 
              fontWeight: 'bold', 
            }
          }} />
        </Stack>
      </CartProvider>
    </ThemeProvider>
  );
}
