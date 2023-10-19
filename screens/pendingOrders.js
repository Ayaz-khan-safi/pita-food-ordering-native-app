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


export default function PendingOrders() {
  const navigation = useNavigation()
  const deliveredOrdersList = dummyData.filter(
    (item) => item.status === "pending"
  );

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
