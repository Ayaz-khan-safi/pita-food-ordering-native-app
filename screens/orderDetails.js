import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import dummyData from "../data/dummy";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

export default function OrderDetailsScreen() {
  const [rider, setRider] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const route = useRoute();
  const { id } = route.params;
  const filteredItem = dummyData.filter((item) => item.id === id);

  console.log("Id", filteredItem);
  const handleAssignRider = () => {
    console.log("Rider assigned!");
  };
  console.log(deliveryTime);
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
            <Text style={styles.orderId}>Order ID: {filteredItem[0]?.id}</Text>
          </View>
          {filteredItem[0]?.type === "pizza" ? (
            <Image
              source={require(`../assets/OrderCardImage/pizzaImage.png`)}
              style={styles.image}
            />
          ) : (
            <Image
              source={require("../assets/OrderCardImage/burgerImage.png")}
              style={styles.image}
            />
          )}
          <View style={styles.orderInfoContainer}>
            <Text style={styles.type}>{filteredItem[0]?.type}</Text>
          </View>
          <View style={styles.customerInfoContainer}>
            <Text style={styles.customerName}>
              Customer: {filteredItem[0]?.customerName}
            </Text>
            <Text style={styles.address}>{filteredItem[0]?.address}</Text>
            <Text style={styles.price}>Price: ${filteredItem[0]?.price}</Text>
            <Text style={styles.quantity}>
              Quantity: {filteredItem[0]?.quantity}
            </Text>
          </View>
          <View style={styles.orderDetailsContainer}>
            <Text style={styles.TotalPrice}>
              Total: ${filteredItem[0]?.quantity * filteredItem[0]?.price}
            </Text>
          </View>
          <View style={styles.timeCards}>
            <TouchableOpacity
              style={styles.timeSingleCard}
              onPress={() => setDeliveryTime("15")}
            >
              <Text style={styles.timeText}>15 mins</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeSingleCard}
              onPress={() => setDeliveryTime("30")}
            >
              <Text style={styles.timeText}>30 mins</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeSingleCard}
              onPress={() => setDeliveryTime("60")}
            >
              <Text style={styles.timeText}>1 hour</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerPicker}>
            <Text style={styles.selectLabel}>Select a Rider</Text>
            <Picker
              selectedValue={rider}
              onValueChange={(itemValue, itemIndex) => setRider(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Peter Hudson" value="Peter Hudson" />
              <Picker.Item label="David Screw" value="David Screw" />
              <Picker.Item label="Andre Pen" value="Andre Pen" />
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={handleAssignRider}
            >
              <Text style={styles.buttonText}>Process the order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
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
  orderIdContainer: {
    position: "absolute",
    top: 50,
    left: 10,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  type: {
    fontSize: 56,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
  },
  statusContainer: {
    position: "absolute",
    top: 50,
    right: 10,
  },
  status: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "red",
  },
  customerInfoContainer: {
    marginBottom: 20,
    color: "red",
  },
  customerName: {
    fontSize: 16,
    color: "white",
  },
  address: {
    fontSize: 16,
    color: "white",
  },
  orderDetailsContainer: {
    marginBottom: 20,
    color: "white",
  },
  quantity: {
    fontSize: 16,
    color: "white",
  },
  price: {
    fontSize: 16,
    color: "white",
  },
  TotalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  image: {
    width: 130,
    height: 80,
    resizeMode: "cover",
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 0,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  timeCards: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#000",
    gap: 15,
  },
  timeSingleCard: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    borderWidth: 0.5,
    backgroundColor: "#FFDF00",
    borderColor: "#FFDF00",
    borderRadius: 4,
    padding: 5,
  },
  timeText: {
    color: "#000",
  },
  containerPicker: {
    width: "100%",
    paddingTop: 20,
  },
  selectLabel: {
    marginBottom: 10,
    color: "#fff",
  },
  picker: {
    height: 40,
    backgroundColor: "#FFDF00",
    marginBottom: 10,
    color: "#000",
    borderRadius: 5,
  },
});
