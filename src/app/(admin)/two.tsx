import { StyleSheet } from 'react-native'; // Stylesheet import
import EditScreenInfo from '@components/EditScreenInfo'; // Allows for the editing of screen information
import { Text, View } from '@components/Themed'; // Allows us to return text inside of a view

export default function TabTwoScreen() { // This returns the second screen (the orders screen) but has no content due to the admin not needing to see orders, as they cannot order anything
  return ( // This can honestly be removed if the rest of the admin routing is configured slightly differently to account for it
    <View style={styles.container}> 
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(user)/two.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({ // Defining a style sheet 
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
