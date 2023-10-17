import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import OrderCard from "../components/orderCard";
import dummyData from "../data/dummy";

export default function DeliveredOrders() {
  const navigation = useNavigation();

  const deliveredOrdersList = dummyData.filter(
    (item) => item.status === "delivered"
  );
  return (
    <ImageBackground
      source={require("../assets/bg-img.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <FlatList
            FlatList
            data={deliveredOrdersList}
            renderItem={OrderCard}
            keyExtractor={(item) => item.id}
          />
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
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 10,
    paddingBottom: 50,
    paddingTop: 50,
  },
  text: {
    color: "#000",
    fontSize: 18,
  },
});
