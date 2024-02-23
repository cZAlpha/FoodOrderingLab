//Import specific react features as well as the button component, status bar component, and specific cart-related functionalities.//

import { View, Text, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '@/provider/CartProvider'
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';

//This method sets up the functionality of the cart screen as well as returns the design of it.//
const CartScreen = () => {
  const { items, total } = useCart();

  return ( 
    <View style={{padding: 10 }}>
      <FlatList 
        data={items} 
        renderItem={({ item }) => <CartListItem cartItem={item}/>}
        contentContainerStyle={{gap: 10}} 
      />

      <Text style={{marginTop: 10, fontSize: 20, fontWeight: '500' }}>Total: ${total}</Text>
      <Button text="Checkout" />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
    
  );
};

//Exports cart screen.//
export default CartScreen 
