import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native' // Various basic React Native imports
import { defaultPizzaImage } from '@/components/ProductListItem'; // imports the default pizza image from a component
import { Stack, useLocalSearchParams } from 'expo-router'; // Imports Stack for UI and useLocal hook for data
import * as ImagePicker from 'expo-image-picker'; // Allows the user to pick images from the camera roll
import Button from '@/components/Button'; // Basic button component
import Colors from '@/constants/Colors'; // Color import
import { useState } from 'react'; // Allows for state control from React 𓅬
import React from 'react' // R𓅬E𓅬A𓅬C𓅬T

const CreateProductScreen = () => { // Func to create the product screen
    const [name, setName] = useState(''); // state declarations ... 
    const [price, setPrice] = useState('');
    const [errors,  setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null); // end of state declarations.

    const {id} = useLocalSearchParams(); // Id is set equal to a hook
    const isUpdating = !!id; // if the item is updating dont give ID

    const resetFields = () => { // resets the name and price fields
        setName('');
        setPrice('');
    };

    const validateInput = () => { // Defines what a valid input is
        setErrors('');
        if (!name) { // if Name field is empty
            setErrors('Name is required.');
            if (!price ) { // if name field is empty AND price field is empty
                setErrors('Name and Price are required.');
                return false;
            }
            if ( isNaN(parseFloat(price)) ){ // if name field is empty but price is not a number
                setErrors('Price is not a number.');
                return false;
            }
            return false;
        }
        if (!price) { // If price field is empty
            setErrors('Price is required.');
            if (!name) { // If price field and name field are empty
                setErrors('Name and Price are required.');
                return false;
            }
            return false;
        }
        if ( isNaN(parseFloat(price)) ) { // Ascertains if whether the inputted price is a number after parsing is as a float
            setErrors('Price is not a number.');
            return false;
        }

        // TO DO: Add if statement to check if price is greater than 0

        return true; // Returns true if no errors detected
    };

    const onUpdateCreate = () => { 
        if(!validateInput()) { return; } // If input was invalid, return nada 
        console.warn("Updating Product: ", name, " $: ", price); // If input WAS VALID, print to the screen that the product was updated

        // TO DO:Save in the database

        resetFields();
    };

    const onCreate = () => { 
        if(!validateInput()) { return; } // If input was invalid, return nada 
        console.warn("Creating Product: ", name, " $: ", price); // If input WAS VALID, print to the screen that the product was created

        // TO DO: Save in the database

        resetFields(); // Resets the fields after creation
    };

    const onSubmit = () => { // When the submit button is clicked
        if (isUpdating) { // if isUpdating var is true, update the product
            onUpdateCreate(); 
        } else {
            onCreate(); // Otherwise, create the a new product using the inputted information
        }
    }

    const onDelete = () => { // Deletes the item
        console.warn("DELETE!!!")
    }

    const confirmDelete = () => { // Function to prompt the user to confirm if they'd like to delete the given item
        Alert.alert("Confirm", "Are you sure you want to delete this product?", [
            {   // Cancel Button
                text: "Cancel",
            },
            {   // Delete Button
                text: "Delete",
                style: 'destructive',
                onPress: onDelete,
            },
        ]);
    };
 
    const pickImage = async () => { // Func to allow the user to pick an image from their library
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if(!result.canceled) { // if the result was not cancelled, set the image to the image picked by the user
            setImage(result.assets[0].uri);
        }
    }

  return ( // Returns the updated view containing the information about the given product
    <View style={styles.container}>
        <Stack.Screen options={{ title: isUpdating ? 'Update Product' :  "Create Product" }}/>

        <Image
            source={{ uri: image || defaultPizzaImage }}
            style={styles.image}
        />
        <Text onPress={pickImage} style={styles.textButton}>
            Select Image
        </Text>

        <Text style={styles.label}>Name</Text>
        <TextInput 
        style={styles.input} 
        placeholder='Name'
        value={name}
        onChangeText={setName}
        />

        <Text style={styles.label}>Price ($)</Text>
        <TextInput 
        style={styles.input} 
        placeholder='9.99'
        keyboardType='numeric'
        value={price}
        onChangeText={setPrice}
        />

        <Text style={styles.error}>{errors}</Text>

        <Button 
            onPress={onSubmit} 
            text={ isUpdating ? "Update" : "Create"}
        />

        {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}>
            Delete
        </Text>
        )}
    </View>
  );
};

const styles = StyleSheet.create({ // Defines a stylesheet for the page
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    error: {
        color: 'red', 
        fontSize: 20, 
        fontWeight: 'bold',
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
});

export default CreateProductScreen
