import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";

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
