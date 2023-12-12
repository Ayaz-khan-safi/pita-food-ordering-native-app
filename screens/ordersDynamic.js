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
import {
  useFindSpecificOrdersQuery,
  useAllOrdersQuery,
} from "../services/ordersApi";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const buttons = [
  {
    name: "Created",
    icon: "progress-alert",
    color: "#3498db",
  },
  {
    name: "Accepted",
    icon: "progress-check",
    color: "#2ecc71",
  },
  {
    name: "Ready",
    icon: "progress-star",
    color: "#27ae60",
  },
  {
    name: "Delivered",
    icon: "progress-upload",
    color: "#9b59b6",
  },
  {
    name: "Cancelled",
    icon: "progress-close",
    color: "#e74c3c",
  },
];

export default function DynamicOrders() {
  const [dynamicData, setdynamicData] = useState("Accepted");
  const [limit, setLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const route = useRoute();

  const navigation = useNavigation();
  const { data: allOrdersData } = useAllOrdersQuery();

  const allOrders = allOrdersData?.data?.result;

  const { data: statusBasedOrders } = useFindSpecificOrdersQuery(
    {
      page: pageNumber,
      limit: limit,
      statusOrder: dynamicData.toUpperCase(),
    }
    // { refetchOnMountOrArgChange: true }
  );

  const dynamicOrdersDisplay = statusBasedOrders?.data;

  const updateIndex = (status) => {
    console.log(status);
    setdynamicData(status);
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
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={{ color: "#fff", fontSize: 20, letterSpacing: 3 }}>
              {dynamicData}
            </Text>
          </View>
          <View>
            {/* <ScrollView
              horizontal={true}
              contentContainerStyle={styles.buttonContainerStyle}
              showsHorizontalScrollIndicator={true}
            >
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={
                    dynamicData === button.name
                      ? styles.buttonClicked
                      : styles.button
                  }
                  activeOpacity={0.7}
                  onPress={() => {
                    updateIndex(button.name);
                  }}
                >
                  <View
                    style={{
                      ...styles.buttonBadge,
                      backgroundColor:
                        dynamicData === button.name ? "#FFDF00" : "#757272",
                    }}
                  >
                    <Text
                      style={{
                        color: dynamicData === button.name ? "#000" : "#000",
                        fontSize: 12,
                      }}
                    >
                      {dynamicData === button.name &&
                        dynamicOrdersDisplay?.metadata?.total}
                    </Text>
                  </View>
                  <View style={styles.buttonInner}>
                    <MaterialCommunityIcons
                      name={button.icon}
                      size={56}
                      color={
                        dynamicData === button.name ? "#FFDF00" : "#757272"
                      }
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView> */}
            <FlatList
              data={buttons}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.name}
                  style={
                    dynamicData === item.name
                      ? styles.buttonClicked
                      : styles.button
                  }
                  activeOpacity={0.7}
                  onPress={() => {
                    updateIndex(item.name);
                  }}
                >
                  <View
                    style={{
                      ...styles.buttonBadge,
                      backgroundColor:
                        dynamicData === item.name ? "#FFDF00" : "#757272",
                    }}
                  >
                    <Text
                      style={{
                        color: dynamicData === item.name ? "#000" : "#000",
                        fontSize: 12,
                      }}
                    >
                      {dynamicData === item.name &&
                        dynamicOrdersDisplay?.metadata?.total}
                    </Text>
                  </View>
                  <View style={styles.buttonInner}>
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={56}
                      color={dynamicData === item.name ? "#FFDF00" : "#757272"}
                    />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
              horizontal={true}
              contentContainerStyle={styles.buttonContainerStyle}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingVertical: 4,
            }}
          >
            <Text style={{ color: "#757272", fontSize: 12 }}>
              Showing {dynamicOrdersDisplay?.result?.length} out of{" "}
              {dynamicOrdersDisplay?.metadata?.total}
            </Text>
          </View>
          <View
            vertical={true}
            contentContainerStyle={styles.cardsContainerStyle}
            showsHorizontalScrollIndicator={true}
          >
            <FlatList
              data={dynamicOrdersDisplay?.result}
              renderItem={renderOrderCard}
              keyExtractor={(item, idx) => idx}
              horizontal={false}
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
    gap: 5,
    paddingHorizontal: 25,
    paddingTop: 50,
  },
  buttonContainerStyle: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  cardsContainerStyle: {
    flexDirection: "row",
    paddingVertical: 5,
    height: 500,
  },
  button: {
    marginRight: 30,
  },
  buttonClicked: {
    marginRight: 30,
  },
  buttonInner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  buttonBadge: {
    borderWidth: 1,
    position: "absolute",
    textAlign: "center",
    height: 20,
    width: 20,
    borderRadius: 25,
    top: -7,
    right: -5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
