import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native'
import { Stack } from 'expo-router';

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: "Details" }}/>

      <Text>Product Details For id: {id}</Text>
    </View>
  );
}; 

export default ProductDetailsScreen