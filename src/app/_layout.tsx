import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importing fonts to use for UI, (SpaceMono-Regular)
import { DarkTheme, 
         DefaultTheme, 
         ThemeProvider 
} from '@react-navigation/native'; // Importing dark theme from react native to make the screen dark when necessary
import { useFonts } from 'expo-font'; // Another font import
import { Stack } from 'expo-router'; // Stack: allows you to 'stack' screens on top of one another for easier access 
import * as SplashScreen from 'expo-splash-screen'; // Imports all the stuff from 'SplashScreen' which is a 
import { useEffect } from 'react'; // Imports the useEffect hook from React, which in this file is mainly used to 
import { useColorScheme } from '@components/useColorScheme'; // Imports the useColorScheme component that sets the general color screen
import CartProvider from '@/provider/CartProvider'; // Imports the Cartprovider hook 


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)', // Ensure that reloading on `/modal` keeps a back button present.
};

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'), // Loads the SpaceMono Regular font from FontAwesome
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Hides asych loading of the splash screen (see line 23)
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync(); // If the screen is loaded, show all the information at once instead of asychronously
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Returns null if the screen has not loaded yet (basically do nothing until it does)
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme(); // Sets the color scheme of the nav depending on dark or light mode

  return ( // Changes the color scheme depending on if the user has dark mode on or not
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> 
      <CartProvider>
        <Stack>
          <Stack.Screen name="index" options={{  
            title: 'Food Ordering', // Title of the header
            headerTitleStyle: { // Header styling
              fontSize: 30, // header font size
              fontWeight: 'bold', // header font weight
            }
          }}
          />
          <Stack.Screen name="(user)" options={{ headerShown: false }} /> {/* User Button and Route */}
          <Stack.Screen name="(admin)" options={{ headerShown: false }} /> {/* Admin Button and Route */} 
          <Stack.Screen name="(auth)" options={{ headerShown: false }} /> {/* Auth. Button and Route */} 
          <Stack.Screen name="cart" options={{ // Has the cart ready for the user if they click user or admin
            presentation: 'modal', // Sets the cart as a modal
            title: 'Cart', // Set the title to 'Cart'
            headerTitleStyle: { // Header styling
              fontSize: 20, // header font size
              fontWeight: 'bold', // header font weight
            }
          }} />
        </Stack>
      </CartProvider>
    </ThemeProvider>
  );
}
