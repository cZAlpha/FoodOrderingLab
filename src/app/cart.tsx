import { View, Text, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '@/provider/CartProvider'

const CartScreen = () => {
  const { items } = useCart();

  return ( 
    <View>
      <Text>Cart Items Length: {items.length} </Text>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
    
  );
};

export default CartScreen 