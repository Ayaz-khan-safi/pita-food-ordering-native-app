import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import dummyData from "../data/dummy";
import OrderCard from "../components/orderCard";
import { useNavigation } from "@react-navigation/native";
import { useAllOrdersQuery } from "../services/ordersApi";
import { useRoute } from "@react-navigation/native";
import { ButtonGroup } from "react-native-elements";

const buttons = [
  "CREATED",
  "PENDING",
  "ACCEPTED",
  "CANCELED",
  "READY",
  "DELIVERED",
];

export default function DynamicOrders() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dynamicData, setdynamicData] = useState("DELIVERED");
  const route = useRoute();
  // const dynamicData = route.params?.dynamicData;
  const navigation = useNavigation();

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    console.log(selectedIndex);
    // Add your logic based on the selected index
  };

  const { data: orders } = useAllOrdersQuery();

  const dynamicOrdersDisplay = orders?.data?.result
    ? orders?.data?.result.filter((order) => order.orderStatus === dynamicData)
    : 0;

  const handleCardClick = (item) => {
    navigation.navigate("orderDetails", { id: item._id });
  };

  const renderOrderCard = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
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
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.buttonContainerStyle}
          >
            {/* <ButtonGroup
              onPress={updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{ height: 40 }}
            /> */}
            {buttons.map((buttonText, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => {
                  updateIndex(index);
                }}
              >
                <Text style={{ color: "#000" }}>{buttonText}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <FlatList
            data={dynamicOrdersDisplay}
            renderItem={renderOrderCard}
            keyExtractor={(item, idx) => idx}
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
    paddingTop: 100,
  },
  buttonContainerStyle: {
    flexDirection: "row",
  },
  button: {
    marginRight: 10,
    backgroundColor: "#FFDF00",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
