import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItem';
import { View, Pressable, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function MenuScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: "Sign in",  
                headerLeft: () => ( // CUSTOM (MADE BY NOAH) BUTTON TO GO BACK TO INDEX ROUTE
                    <Link href="/" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="backward"
                                    size={20}
                                    color={Colors.light.tint}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} // If pressed, then the opacity is 0.5, else it is 1
                                />
                            )}
                        </Pressable>
                    </Link>
                ),
                headerTitleStyle: {
                    fontSize: 22, // Adjust the font size as desired
                    fontWeight: 'bold', // Adjust the font weight as desired
                }
                }}
      />

      <FlatList
        data = {products} // Data is the products array
        renderItem = { ({ item }) => <ProductListItem product={item} /> }
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }} // Gap between the items
        columnWrapperStyle={{ gap: 10 }}
      />
    
    </View>
  );
}


