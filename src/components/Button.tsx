//Import react features as well as colors and the forwardRef functionality.//

import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { forwardRef } from 'react';

//Set up buttons props.//
type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

//Return the button design.//
const Button = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);

//Holder for the button design.//
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
});
//Export the button.//
export default Button;
