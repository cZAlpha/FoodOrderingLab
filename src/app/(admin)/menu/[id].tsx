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

const ProductDetailsScreen = () => { // The ProductDetailsScreen 
  const { id } = useLocalSearchParams(); // The ID of which is gathered through the use of a hook
  const {addItem} = useCart(); // Gets item from the CartProvider; located @ provider/CartProvider (component?) 

  const router = useRouter(); // Router from React Routing

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M'); // Uses state to set the default Pizza size upon instantiation is 'M' for "Medium"

  const product = products.find( (p) => p.id.toString() == id) // Product is set to the pdocut of the given item

  const addToCart = () => { // function to add the item to the cart if the product is defined
    if ( !product ) { return; } // Returns nothing if the product isn't defined
    addItem(product, selectedSize); // Adds the item to the cart if it is defined with the given product and size
    router.push('/cart') // Pushes the information to the /cart route
  }

  if ( !product ){ return <Text>Product Not Found</Text>; } //  If the product is not defined, return text saying as much

  return ( // Returns the elements making up the page
    <View style={ styles.container }> 
      <Stack.Screen // Uses stacks to make the screen
        options={{ 
          title: "Menu",   // EDIT BUTTON
                headerRight: () => (
                    <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                        <Pressable> 
                            {({ pressed }) => ( // Pressable button
                                <FontAwesome // styling
                                    name="pencil"
                                    size={25}
                                    color={Colors.light.tint}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ), 
                headerTitleStyle: { // Styling the header 
                    fontSize: 22,
                    fontWeight: 'bold',
                }
      }}/>
      
      <Stack.Screen options={{ title: product.name } /* Sets the title to the given product name*/ }/>

      <Image // The product image, with styling and a default image if the right product image could not be found
      style={ styles.image }
      source={{ uri: product.image || defaultPizzaImage }} 
      />
      {/* The procuct name and price (👁ˋ_ˊ👁) */}
      <Text style={ styles.name }> {product.name} </Text> 
      <Text style={ styles.price }> ${product.price} </Text>
    </View>
  );
}; 

const styles = StyleSheet.create({ // Defines the given style sheet for different elements within the file 𓆏
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