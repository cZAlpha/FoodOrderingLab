import { FontAwesome } from "@expo/vector-icons"; // Importing fonts to use for UI, (SpaceMono-Regular)
import { Link, Stack } from "expo-router"; // Link: allows for custom routing, Stack: allows you to 'stack' screens on top of one another for easier access 
import { Pressable } from "react-native"; // Basically just a React Native library that allows you to use buttons
import Colors from "@/constants/Colors"; // Refers to Colors that were included within the project from the creator

export default function MenuStack() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Menu",  
                headerLeft: () => ( // CUSTOM (MADE BY NOAH) BUTTON TO GO BACK TO INDEX ROUTE
                    <Link href="/" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="backward"
                                    size={20}
                                    color={Colors.light.tint}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ), 
                headerRight: () => ( // ADD BUTTON (NOT DONE)
                    <Link href="/(admin)/menu/create" asChild> 
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="plus"
                                    size={20}
                                    color={Colors.light.tint}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ), 
                headerTitleStyle: {
                    fontSize: 22, // Adjust the font size as desired
                    fontWeight: 'bold', // Adjust the font weight as desired
                }
                }}/>
        </Stack>
    );
}
