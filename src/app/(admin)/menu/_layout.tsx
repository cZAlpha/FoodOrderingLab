import { FontAwesome } from "@expo/vector-icons"; // Importing fonts to use for UI, (SpaceMono-Regular)
import { Link, Stack } from "expo-router"; // Link: allows for custom routing, Stack: allows you to 'stack' screens on top of one another for easier access 
import { Pressable } from "react-native"; // Basically just a React Native library that allows you to use buttons
import Colors from "@/constants/Colors"; // Refers to Colors that were included within the project from the creator

export default function MenuStack() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Menu",  
                headerLeft: () => ( // CUSTOM (MADE BY NOAH) BUTTON TO GO BACK TO INDEX (Home Page) ROUTE
                    <Link href="/" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="backward" // sets the orientation of the icon to backward to make it look like a back button
                                    size={20} // sets the size of the icon
                                    color={Colors.light.tint} // sets the color of the icon
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} // Sets the right-side margin as well as styling when it is pressed
                                />
                            )}
                        </Pressable>
                    </Link> 
                ),  // END OF CUSTOM BACK BUTTON 
                headerRight: () => ( // ADD BUTTON - Sends user to the route below upon clicking the button
                    <Link href="/(admin)/menu/create" asChild>  
                        <Pressable> 
                            {({ pressed }) => (
                                <FontAwesome
                                    name="plus" // Makes the icon a plus sign
                                    size={20} // Defines the size of the icon
                                    color={Colors.light.tint} // Makes it a blue color using imported library
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} // Sets the right-side margin as well as styling when it is pressed
                                />
                            )}
                        </Pressable>
                    </Link>
                ), // END OF ADD BUTTON
                headerTitleStyle: { // This handles the styling of the title
                    fontSize: 22, // font size of title
                    fontWeight: 'bold', // sets font weight of title to bold
                }
                }}/>
        </Stack>
    );
}
