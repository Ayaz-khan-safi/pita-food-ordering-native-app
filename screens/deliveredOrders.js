import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import OrderCard from "../components/orderCard";
import dummyData from "../data/dummy";
import { useNavigation } from "@react-navigation/native";
import { useAllOrdersQuery } from "../services/ordersApi";

  export default function DeliveredOrders() {
    const navigation = useNavigation()
    // const deliveredOrdersList = dummyData.filter(
    //   (item) => item.status === "delivered"
    // );
  

    const { data: orders } = useAllOrdersQuery();
    console.log(orders?.data?.result);
  
    const deliveredOrdersList = orders?.data?.result
      ? orders?.data?.result.filter((order) => order.orderStatus === "PENDING")
      : 0;
  
    console.log(deliveredOrdersList);
    const handleCardClick = (item) => {
      console.log('Card clicked:', item);
      navigation.navigate('orderDetails',{id: item.id})
    };

    const renderOrderCard = ({ item }) => {
      return (
        <TouchableOpacity onPress={() => handleCardClick(item)}>
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
            data={deliveredOrdersList}
            renderItem={renderOrderCard}
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
})
