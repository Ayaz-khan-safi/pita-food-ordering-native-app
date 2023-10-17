import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import OneCard from "../components/oneCard";

export default function Dashboard() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/bg-img.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        {/* <OneCard /> */}
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("pendingOrders")}
          >
            <Text style={styles.buttonText}>Pending Orders</Text>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deliveredButton}
            onPress={() => navigation.navigate("deliveredOrders")}
          >
            <Text style={styles.deliveredButtonText}>Delivered Orders</Text>
            <Text style={styles.deliveredButtonText}>5</Text>
          </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 40,
    paddingBottom: 50,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    height: 100,
    backgroundColor: "#FFDF00",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
  },
  deliveredButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    height: 100,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFDF00",
    backgroundColor: "rgba(255, 223, 0, 0.1)",

    borderRadius: 5,
  },
  deliveredButtonText: {
    color: "#FFDF00",
    fontSize: 18,
  },
});
