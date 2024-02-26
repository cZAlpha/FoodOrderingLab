import { CartItem, Product } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from 'expo-crypto';

type CartType = {
    items: CartItem[]; // Array of cart items
    addItem: (product: Product, size: CartItem['size']) => void; // Function to add a product to the cart
    updateQuantity: (itemId: string, amount: -1 | 1) => void; // Function to update the quantity of a cart item
    total: number;
};

export const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {}, // Default function to add a product to the cart
    updateQuantity: () => {}, // Default function to update the quantity of a cart item
    total: 0, // Default total
});

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]); // Array of cart items

    const addItem = (product: Product, size: CartItem['size']) => {
        // If already in cart, increment quantity
        const existingItem = items.find(item => item.product == product && item.size == size);

        if (existingItem) {
            updateQuantity(existingItem.id, 1); // Increment the quantity of the existing item
            return; 
        }

        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };

        setItems([newCartItem, ...items]);
    };
    
    // updateQuantity
    const updateQuantity = (itemId: string, amount: -1 | 1) => { // Update the quantity of a cart item
        setItems(items.map((item) =>  // Map through the items
                item.id != itemId // If the item id is not equal to the item id
                ? item  // Return the item
                : {...item, quantity: item.quantity + amount }  // Or return the item with the updated quantity
            ).filter( (item) => item.quantity > 0) // Filter out items with a quantity of 0
        );
    };

    // calculateTotal

    const total = items.reduce((sum, item) => sum += item.product.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{items, addItem, updateQuantity, total}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart =  () => useContext(CartContext);