import React from 'react'; // Imports basic React library
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Imports font(s)
import { Tabs } from 'expo-router'; // Allows for tabs to be displayed on the bottom of the screen
import Colors from '../../constants/Colors'; // Colors imported from tutorial maker assets

// (MESSAGE FROM TUTORIAL MAKER) 'You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/'
function TabBarIcon(props: { // Custom component that defines the styling and orientation of elements within the tab's icon
  name: React.ComponentProps<typeof FontAwesome>['name']; // The name of the icon has a fonttype of FontAweson, and takes an args of a string of name
  color: string; // The color of the icon is defined using a string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />; // Styling of the component before returning it
}

export default function TabLayout() { // Returns a set of tabs, with each tab having screen content of its own
  return (
    <Tabs // Start of the tab group
      screenOptions={{ // Styling applied to all tabs in the tab group
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveBackgroundColor: 'gainsboro',
        tabBarStyle : {
          backgroundColor: Colors.light.tint,
        }
      }}>
      <Tabs.Screen name="index" options={{ href: null }} />

      <Tabs.Screen // Menu tab (left tab)
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
        }}
      />

      <Tabs.Screen // Orders tab (right tab)
        name="two"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
