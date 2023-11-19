import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, selectCounter } from "../slices/counterSlice";
import { useAllOrdersQuery } from "../services/ordersApi";
import OrderCard from "../components/orderCard";

export default function Dashboard() {
  const navigation = useNavigation();

  const { data: orders } = useAllOrdersQuery();

  const allCreatedOrders = orders?.data?.result
    ? orders?.data?.result.filter((order) => order.orderStatus === "CREATED")
        .length
    : 0;
  const allAcceptedOrders = orders?.data?.result
    ? orders?.data?.result.filter((order) => order.orderStatus === "ACCEPTED")
        .length
    : 0;
  const allPendingOrders = orders?.data?.result
    ? orders?.data?.result.filter((order) => order.orderStatus === "PENDING")
        .length
    : 0;
  const allDeliveredOrders = orders?.data?.result
    ? orders?.data?.result.filter((order) => order.orderStatus === "DELIVERED")
        .length
    : 0;

  const pendingOrders = () => {
    navigation.navigate("pendingOrders");
  };
  const deliveredOrders = () => {
    navigation.navigate("deliveredOrders");
  };

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
      
        <View style={styles.containerDetails}>
          <Text style={styles.totalText}>
            Total Orders: {orders?.data?.metadata?.total}
          </Text>
          <Text style={styles.detailsText}>
            Newly Created: {allCreatedOrders}
          </Text>
          <Text style={styles.detailsText}>Accepted: {allAcceptedOrders}</Text>
        </View>
        <View style={styles.containerFlatList}>
          <FlatList
          style={styles.flatList}
            data={orders?.data?.result}
            renderItem={renderOrderCard}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={pendingOrders}>
            <Text style={styles.buttonText}>Pending Orders</Text>
            <Text style={styles.buttonText}>{allPendingOrders}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deliveredButton}
            onPress={deliveredOrders}
          >
            <Text style={styles.deliveredButtonText}>Delivered Orders</Text>
            <Text style={styles.deliveredButtonText}>{allDeliveredOrders}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  totalCount: {
    color: "#fff",
  },
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
    gap: 10,
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  containerFlatList :{
    display: "flex",
    borderRadius: 12,
    flexDirection: "column",
    height: 430,
    gap: 10,
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  containerDetails : {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 40,
    paddingBottom: 20,
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
  deliveredButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    height: 50,
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
  detailsText: {
    fontSize: 16,
    color: "#FFF",
  },
  totalText: {
    fontSize: 36,
    color: "#FFDF00",
  },
  flatList: {
    flex: 1,
  },
});
