//Import the react framework and its features as well as button components, the Link feature and an image of a pizza.//

import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link } from 'expo-router';
import { defaultPizzaImage } from '@/components/ProductListItem';

//Returns the design of the home menu.//
const index = () => {
  return (
    <View style={ styles.container }>
      <Image 
      style={ styles.image }
      source={{ uri: "https://icons.iconarchive.com/icons/iconarchive/fat-sugar-food/512/Pizza-icon.png" }} 
      />

      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>

      <Link href={'/sign_in'} asChild>
        <Button text="Sign In" />
      </Link>
    </View>
  );
};

//Holder for the styling.//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 30,
  },
});

//Exports the index file.//
export default index;
