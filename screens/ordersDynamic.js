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
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

const buttons = [
  {
    name: "Created",
    icon: MaterialIcons,
  },
  {
    name: "Accepted",
    icon: AntDesign,
  },
  {
    name: "Cancelled",
    icon: MaterialIcons,
  },
  {
    name: "Ready",
    icon: MaterialIcons,
  },
  {
    name: "Delivered",
    icon: MaterialIcons,
  },
];

export default function DynamicOrders() {
  const [dynamicData, setdynamicData] = useState("Created");
  const route = useRoute();
  // const dynamicData = route.params?.dynamicData;
  const navigation = useNavigation();

  const { data: orders } = useAllOrdersQuery();
  const dynamicOrdersDisplay = orders?.data?.result
    ? orders?.data?.result.filter(
        (order) => order.orderStatus === dynamicData.toUpperCase()
      )
    : 0;

  const updateIndex = (status) => {
    console.log(status);
    setdynamicData(status);
    // Add your logic based on the selected index
  };

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
          <View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.buttonContainerStyle}
              showsHorizontalScrollIndicator={false}
            >
              {/* <ButtonGroup
              onPress={updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{ height: 40 }}
            /> */}
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.button}
                  onPress={() => {
                    updateIndex(button.name);
                  }}
                >
                  <View style={styles.buttonBadge}>
                    <Text style={{ color: "#000", fontSize: 12 }}>
                      {dynamicOrdersDisplay.length}
                    </Text>
                  </View>
                  <View style={styles.buttonInner}>
                    <button.icon name="pending" size={24} color="black" />
                    <Text style={{ color: "#000" }}>{button.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View>
            <FlatList
              data={dynamicOrdersDisplay}
              renderItem={renderOrderCard}
              keyExtractor={(item, idx) => idx}
            />
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
  },
  container: {
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 25,
    padding: 50,
  },
  buttonContainerStyle: {
    flexDirection: "row",
    paddingVertical: 25,
  },
  button: {
    marginRight: 20,
    backgroundColor: "#FFDF00",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  buttonInner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  buttonBadge: {
    position: "absolute",
    backgroundColor: "#fff",
    textAlign: "center",
    height: 25,
    width: 25,
    borderRadius: 25,
    top: -7,
    right: -10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
