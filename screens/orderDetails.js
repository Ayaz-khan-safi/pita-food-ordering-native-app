import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const OrderDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.orderInfoContainer}>
        <Text style={styles.orderId}>Order ID: </Text>
        <Text style={styles.type}>Type: </Text>
        <Text style={styles.status}>Status: </Text>
      </View>
      <View style={styles.customerInfoContainer}>
        <Text style={styles.customerName}>Customer: </Text>
        <Text style={styles.address}>Address: </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.quantity}>Quantity: </Text>
        <Text style={styles.price}>Price: $</Text>
      </View>
      <Image
        source={require("../assets/OrderCardImage/pizzaImage.png")}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  orderInfoContainer: {
    marginBottom: 20,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
  },
  type: {
    fontSize: 16,
  },
  status: {
    fontSize: 16,
  },
  customerInfoContainer: {
    marginBottom: 20,
  },
  customerName: {
    fontSize: 16,
  },
  address: {
    fontSize: 16,
  },
  orderDetailsContainer: {
    marginBottom: 20,
  },
  quantity: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});

export default OrderDetailsScreen;
