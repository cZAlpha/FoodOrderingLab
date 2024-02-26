import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Order } from '../types';
import relativeTime from 'dayjs/plugin/relativeTime'; // relativeTime used to display the time in a relative format
import dayjs from 'dayjs';// dayjs displays dates and times for modern browsers
import { Link, useSegments } from 'expo-router';

dayjs.extend(relativeTime); // Extend dayjs with the relativeTime plugin

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => { // Define the type of the props
  const segments = useSegments(); // Get the segments from the router

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild> // Link to the order detail screen
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{order.id}</Text> // Display the order id
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text> // Display the time in a relative format
        </View>

        <Text style={styles.status}>{order.status}</Text> // Display the status of the order
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between', // Align the items
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
});

export default OrderListItem;