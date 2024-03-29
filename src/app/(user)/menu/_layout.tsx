import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router"; // Link is a component that allows you to navigate to a different page
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";

export default function MenuStack() {
    return (
        <Stack 
            screenOptions={{ 
                headerRight: () => (
                    <Link href="/cart" asChild> // Link to the cart page
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="shopping-cart"
                                    size={20}
                                    color={Colors.light.tint}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                )
            }}>
            <Stack.Screen name="index" options={{ title: "Menu",
        headerTitleStyle: {
            fontSize: 22, // Adjust the font size as desired
            fontWeight: 'bold', // Adjust the font weight as desired
          }
        }}/>
        </Stack>
    );
}
