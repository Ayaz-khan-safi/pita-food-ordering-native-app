import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity , ImageBackground,} from "react-native";
import dummyData from "../data/dummy";
import { useRoute } from '@react-navigation/native';


export default function OrderDetailsScreen() {

  const route = useRoute();
  const { id } = route.params;
  const filteredItem = dummyData.filter(
    (item) => item.id === id
  );

  // const totalPrice = {filteredItem[0].quantity} + {filteredItem[0].quantity}
  console.log('Id',filteredItem)
  const handleAssignRider = () => {
    // Logic to assign a rider to the order
    console.log("Rider assigned!");
  };

  const handleCancelOrder = () => {
    // Logic to cancel the order
    console.log("Order canceled!");
  };
  return (
    <ImageBackground
    source={require("../assets/bg-img.jpg")}
    style={styles.backgroundImage}
  >
    <View style={styles.overlay}>
    <View style={styles.container}>

        <View style={styles.statusContainer}>
          <Text style={styles.status}>Delivery Pending</Text>
        </View>
        <View style={styles.orderIdContainer}>
        <Text style={styles.orderId}>Order ID: {filteredItem[0].id}</Text>
        </View>
      <View style={styles.orderInfoContainer}>
        <Text style={styles.type}>{filteredItem[0].type}</Text>
        
      </View>
      <View style={styles.customerInfoContainer}>
        <Text style={styles.customerName}>Customer: {filteredItem[0].customerName}</Text>
        <Text style={styles.address}>{filteredItem[0].address}</Text>
        <Text style={styles.price}>Price: ${filteredItem[0].price}</Text>
        <Text style={styles.quantity}>Quantity: {filteredItem[0].quantity}</Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.TotalPrice}>Total: ${filteredItem[0].quantity * filteredItem[0].price}</Text>
      </View>
      {
        filteredItem[0].type === 'pizza' ? 
        <Image
          source={require("../assets/OrderCardImage/pizzaImage.png")}
          style={styles.image}
        />
:        <Image
source={require("../assets/OrderCardImage/burgerImage.png")}
style={styles.image}
/>

      }
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
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
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
    color: "white"

  },
  type: {
    fontSize: 56,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white"
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
    color: "red"
  },
  customerName: {
    fontSize: 16,
    color: "white"
  },
  address: {
    fontSize: 16,
    color: "white"
  },
  orderDetailsContainer: {
    marginBottom: 20,
    color: "white"
  },
  quantity: {
    fontSize: 16,
    color: "white"
  },
  price: {
    fontSize: 16,
    color: "white"
  },
  TotalPrice : {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white"
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

