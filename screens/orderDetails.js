import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const OrderDetailsScreen = () => {
  const handleAssignRider = () => {
    // Logic to assign a rider to the order
    console.log("Rider assigned!");
  };

  const handleCancelOrder = () => {
    // Logic to cancel the order
    console.log("Order canceled!");
  };
  return (
    <View style={styles.container}>

        <View style={styles.statusContainer}>
          <Text style={styles.status}>Delivery Pending</Text>
        </View>
        <View style={styles.orderIdContainer}>
        <Text style={styles.orderId}>Order ID: 143</Text>
        </View>
      <View style={styles.orderInfoContainer}>
        <Text style={styles.type}>Pizza</Text>
        
      </View>
      <View style={styles.customerInfoContainer}>
        <Text style={styles.customerName}>Customer: John Doe</Text>
        <Text style={styles.address}>Address: 6th st, North ave, Halway Rd, London, United Kingdom</Text>
        <Text style={styles.price}>Price: $14.99</Text>
        <Text style={styles.quantity}>Quantity: 2</Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.TotalPrice}>Total: $29.98</Text>
      </View>
      <Image
        source={require("../assets/OrderCardImage/pizzaImage.png")}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        {/* Cancel Order Button */}
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleCancelOrder}>
          <Text style={styles.buttonText}>Cancel Order</Text>
        </TouchableOpacity>

        {/* Assign Rider Button */}
        <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleAssignRider}>
          <Text style={styles.buttonText}>Assign To a Rider</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 20,
  },
  orderInfoContainer: {
    marginBottom: 20,
  },
  orderIdContainer : {
    position: "absolute",
    top: 50,
    left: 10,  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",

  },
  type: {
    fontSize: 56,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  statusContainer : {
    position: "absolute",
    top: 50,
    right: 10,
  },
  status: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "red"
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
  TotalPrice : {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: "cover",
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OrderDetailsScreen;
