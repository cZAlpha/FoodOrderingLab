import { Stack, useLocalSearchParams, useRouter, Link } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@/components/Button';
import { useCart } from '@/provider/CartProvider';
import { PizzaSize } from '@/types';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const {addItem} = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const product = products.find( (p) => p.id.toString() == id)

  const addToCart = () => {
    if ( !product ) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart')
  }

  if ( !product ){
    return <Text>Product Not Found</Text>
  }

  return (
    <View style={ styles.container }>
      <Stack.Screen 
        options={{ 
          title: "Menu",   // EDIT BUTTON
                headerRight: () => (
                    <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="pencil"
                                    size={25}
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
      
      <Stack.Screen options={{ title: product.name }}/>
      
      <Image 
      style={ styles.image }
      source={{ uri: product.image || defaultPizzaImage }} 
      />

      <Text style={ styles.name }> {product.name} </Text>
      <Text style={ styles.price }> ${product.price} </Text>
    </View>
  );
}; 

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  price: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
});

export default ProductDetailsScreen