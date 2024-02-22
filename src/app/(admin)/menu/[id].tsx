import { Stack, useLocalSearchParams, useRouter, Link } from 'expo-router'; // Imports various hooks from expo-router
import { View, Text, Image, StyleSheet, Pressable } from 'react-native' // Imports various hooks from react native
import products from '@assets/data/products'; // Imports pre-existing product data from assets
import { defaultPizzaImage } from '@/components/ProductListItem'; // Imports the default pizza image from ProductListItem in Components
import { useState } from 'react'; // Imports the useState hook from react to allow the dev to handle the setting of pizza sizes
import { useCart } from '@/provider/CartProvider'; // Imports the useCart hook that allows us to use the cart, as the name implies
import { PizzaSize } from '@/types'; // Imports the PizzaSize type 
import { FontAwesome } from '@expo/vector-icons'; // Importing fonts to use for UI, (SpaceMono-Regular)
import Colors from '@/constants/Colors'; // Imports color from the constants folder provided by the tutorial guy

const sizes: PizzaSize[] = ["S", "M", "L", "XL"]; // Sets an array of Pizza sizes to be used later on

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