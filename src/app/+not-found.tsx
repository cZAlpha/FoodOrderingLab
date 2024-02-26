import { Link, Stack } from 'expo-router'; // Allows for us to link things (routing) and create a screen through stack elements
import { StyleSheet } from 'react-native'; // Imports stylesheet from React Native to allow us to define a stylesheet for the page
import { Text, View } from '@components/Themed'; // Allows us to return a view that also contains text

export default function NotFoundScreen() { // If a screen ain't found, route to this screen so that the user knows there was an error or the screen they're accessing doesn't exist
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} /> {/* Title of the page is Oops! */}
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link href="/" style={styles.link}> {/* Link to the home screen */}
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({ // Defines the stylesheet
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
