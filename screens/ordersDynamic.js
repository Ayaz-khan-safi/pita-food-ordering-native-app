import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import dummyData from "../data/dummy";
import OrderCard from "../components/orderCard";
import { useNavigation } from "@react-navigation/native";
import { useAllOrdersQuery } from "../services/ordersApi";
import { useRoute } from "@react-navigation/native";

export default function DynamicOrders() {
  const route = useRoute();
  const dynamicData = route.params?.dynamicData;
  const navigation = useNavigation();

  const { data: orders } = useAllOrdersQuery();
  console.log(orders?.data?.result);

  const dynamicOrdersDisplay = orders?.data?.result
    ? orders?.data?.result.filter((order) => order.orderStatus === dynamicData)
    : 0;

  console.log(dynamicOrdersDisplay);

  const handleCardClick = (item) => {
    console.log("Card clicked 2:", item._id);
    navigation.navigate("orderDetails", { id: item._id });
  };

  const renderOrderCard = ({ item }) => {
    return (
      <TouchableOpacity
        delayPressOut={500}
        onPress={() => handleCardClick(item)}
      >
        <OrderCard item={item} />
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground
      source={require("../assets/bg-img.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <FlatList
            data={dynamicOrdersDisplay}
            renderItem={renderOrderCard}
            keyExtractor={(item) => item._id}
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
    backgroundColor: "rgba(0, 0, 0, 0.8)",
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
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    height: 50,
    backgroundColor: "#FFDF00",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
  },
});
