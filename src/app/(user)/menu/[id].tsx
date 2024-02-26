import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native' // Pressable is a button for mobile
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react'; // useState is a hook
import Button from '@/components/Button';
import { useCart } from '@/provider/CartProvider';
import { PizzaSize } from '@/types';

const sizes: PizzaSize[] = ["S", "M", "L", "XL"]; // Array of Pizza Sizes

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams(); // Get the id from the URL
  const {addItem} = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M'); // Default size is Medium

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
      <Stack.Screen options={{ title: product.name }}/>
      
      <Image 
      style={ styles.image }
      source={{ uri: product.image || defaultPizzaImage }} 
      />

      <Text style={ {fontSize: 20, fontWeight: 'bold'} }>Select Size</Text>
      <View style={styles.sizes}>
      {sizes.map((size) => ( // For each size in sizes, create a Pressable button
        <Pressable 
          onPress={ () => { 
            setSelectedSize(size); 
          }}
          style={[
            styles.size, 
            { 
              backgroundColor: selectedSize == size ? 'gainsboro' : 'white' // If selected size is equal to size, then the background color is gainsboro, else it is white
            }]} 
            key={size}
          >

          <Text style={[
            styles.sizeText, 
            {
              color: selectedSize == size ? 'black' : 'gray', // If selected size is equal to size, then the color is black, else it is gray
            },
            ]}
          > 
            {size} 
          </Text>
        </Pressable>
      ))} 
      </View>

      <Text style={ styles.price }> ${product.price} </Text>
      <Button onPress={ addToCart } text="Add To Cart" />
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
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto'
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Space around the items
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500'
  }
});

export default ProductDetailsScreen