import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function OrderCard({ item }) {
  const totalPrice = item.price * item.quantity;

  return (
    <View style={styles.container}>
      <View
        style={
          item.status === "pending"
            ? styles.statusContainerPending
            : styles.statusContainerDelivered
        }
      >
        <Text
          style={
            item.status === "pending"
              ? styles.statusTextPending
              : styles.statusTextDelireved
          }
        >
          {item.status}
        </Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {totalPrice}</Text>
      </View>

      <Image style={styles.image} source={item.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.topDetails}>
          <View>
            <Text style={styles.orderType}>{item.type}</Text>

            <Text style={styles.price}>Price: {item.price}</Text>
          </View>
          <View>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.customerName}>CUSTOMER: {item.customerName}</Text>
          <Text style={styles.address}>ADDRESS: {item.address}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#FFDF00",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  statusContainerDelivered: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "green",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusTextDelireved: {
    color: "green",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  statusContainerPending: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "red",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusTextPending: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  totalContainer: {
    position: "absolute",
    top: 2,
    right: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  totalText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    textShadowColor: "green",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  image: {
    width: 100,
    height: 90,
    borderRadius: 0,
    marginRight: 30,
    marginTop: 30,
  },
  detailsContainer: {
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    color: "green",
    marginBottom: 2,
  },
  address: {
    fontSize: 14,
    color: "green",
    marginBottom: 2,
  },
  orderType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    textTransform: "capitalize",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  quantity: {
    fontSize: 14,
    color: "green",
    marginBottom: 2,
  },
  price: {
    fontSize: 14,
    color: "green",
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  topDetails: {
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    marginBottom: 5,
  },
});
