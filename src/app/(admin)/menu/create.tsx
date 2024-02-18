import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React from 'react'
import Button from '@/components/Button';
import { useState } from 'react';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors,  setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const {id} = useLocalSearchParams();
    const isUpdating = !!id;

    const resetFields = () => {
        setName('');
        setPrice('');
    };

    const validateInput = () => {
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
        if ( isNaN(parseFloat(price)) ) {
            setErrors('Price is not a number.');
            return false;
        }
        // Add if statement to check if price is greater than 0
        return true; // Returns true if no errors detected
    };

    const onSubmit = () => {
        if (isUpdating) {
            onUpdateCreate();
        } else {
            onCreate();
        }
    }

    const onCreate = () => { 
        if(!validateInput()) { // If errors occured
            return;
        }

        console.warn("Creating Product: ", name, " $: ", price);

        // Save in the database

        resetFields();
    };

    const onUpdateCreate = () => { 
        if(!validateInput()) { // If errors occured
            return;
        }

        console.warn("Updating Product: ", name, " $: ", price);

        // Save in the database

        resetFields();
    };

    const onDelete = () => {
        console.warn("DELETE!!!")
    }

    const confirmDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this product?", [
            {
                text: "Cancel",
            },
            {
                text: "Delete",
                style: 'destructive',
                onPress: onDelete,
            },
        ]);
    };
 
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if(!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

  return (
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

const styles = StyleSheet.create({
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
