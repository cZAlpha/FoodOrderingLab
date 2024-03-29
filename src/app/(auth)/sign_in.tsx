//Import the react framework and its features as well button components, colors, the link and stack features, and the awsome font.//
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

//Method for setting up the functionalities of the sign-in screen.//
const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //Returns the design for the sign-in screen.//
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign in",  
                headerLeft: () => ( // CUSTOM (MADE BY NOAH) BUTTON TO GO BACK TO INDEX ROUTE
                    <Link href="/" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="backward"
                                    size={20}
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
                }}
      />
      
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder=""
        style={styles.input}
      />

      <Button style={styles.button}
        disabled={loading}
        text={loading ? 'Signing in...' : 'Sign in'}
      />
      <Link href={'/sign_up'} style={styles.textButton}>
        Create an account
      </Link>
    </View>
  );
};

//Holder for the styling of the sign in screen.//
const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
    fontSize: 18,
  },
  button: {
    fontSize: 18,
  }
});
//Exports the sign-in screen.//
export default SignInScreen;
