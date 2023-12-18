import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import dummyData from "../data/dummy";
import OrderCard from "../components/orderCard";
import { useNavigation } from "@react-navigation/native";
import {
  useFindSpecificOrdersQuery,
  useAllOrdersQuery,
} from "../services/ordersApi";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as SecureStore from "expo-secure-store";
import { decode as atob } from "base-64";

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
    name: "Canceled",
    icon: "progress-close",
    color: "#e74c3c",
  },
];

export default function DynamicOrders() {
  const [dynamicData, setdynamicData] = useState("Created");
  const [limit, setLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const route = useRoute();

  const navigation = useNavigation();

  const { data: allOrdersData } = useAllOrdersQuery();

  const allOrders = allOrdersData?.data?.result;

  const {
    data: statusBasedOrders,
    isLoading,
    isFetching,
  } = useFindSpecificOrdersQuery(
    {
      page: pageNumber,
      limit: limit,
      statusOrder: dynamicData.toUpperCase(),
    }
    // { refetchOnMountOrArgChange: true }
  );

  const dynamicOrdersDisplay = statusBasedOrders?.data;

  const updateIndex = (status) => {
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

  const handleEndReached = () => {
    if (!isLoadingMore && dynamicOrdersDisplay?.metadata?.total > 0) {
      setIsLoadingMore(true);
      setLimit((prevLimit) => prevLimit + 10);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  useEffect(() => {
    if (isLoadingMore) {
      // Use the refetch function from useFindSpecificOrdersQuery to fetch more data
      statusBasedOrders
        .refetch({
          page: pageNumber,
          limit: limit,
          statusOrder: dynamicData.toUpperCase(),
        })
        .then(() => {
          setIsLoadingMore(false);
        });
    }
  }, [isLoadingMore]);

  return (
    <ImageBackground
      source={require("../assets/bgimg.jpg")}
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
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 12,
                      color: dynamicData === item.name ? "#FFDF00" : "#757272",
                    }}
                  >
                    {item.name}
                  </Text>
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
              {`Showing ${
                dynamicOrdersDisplay?.metadata?.total > 1
                  ? dynamicOrdersDisplay?.result?.length
                  : 0
              } out of ${
                dynamicOrdersDisplay?.metadata?.total > 1
                  ? dynamicOrdersDisplay?.metadata?.total
                  : 0
              }`}
            </Text>
          </View>

          <View>
            {isFetching ? (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  height: "70%",
                  gap: 10,
                  // backgroundColor: "#aaa",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Animatable.View
                  animation="rotate"
                  iterationCount="infinite"
                  easing="linear"
                >
                  <AntDesign name="loading1" size={36} color="#757272" />
                </Animatable.View>
                <Text style={{ color: "#757272", fontSize: 14 }}>
                  Fetching Data...
                </Text>
              </View>
            ) : dynamicOrdersDisplay?.metadata?.total > 1 ? (
              <FlatList
                style={styles.cardsContainerStyle}
                data={dynamicOrdersDisplay?.result}
                renderItem={renderOrderCard}
                keyExtractor={(item, idx) => idx}
                horizontal={false}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
                ListFooterComponent={
                  isLoadingMore && (
                    <View
                      style={{
                        width: "100%",
                        alignItems: "center",
                        height: 50,
                        justifyContent: "center",
                      }}
                    >
                      <Animatable.View
                        animation="rotate"
                        iterationCount="infinite"
                        easing="linear"
                      >
                        <AntDesign name="loading1" size={36} color="#757272" />
                      </Animatable.View>
                      <Text style={{ color: "#757272", fontSize: 14 }}>
                        Loading More...
                      </Text>
                    </View>
                  )
                }
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  height: "70%",
                  gap: 10,
                  // backgroundColor: "#aaa",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="emoji-sad" size={36} color="#757272" />
                <Text style={{ color: "#757272", fontSize: 14 }}>
                  No order found
                </Text>
              </View>
            )}
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
    flexDirection: "column",
    paddingVertical: 5,
    height: 500,
  },
  button: {
    marginRight: 30,
    alignItems: "center",
  },
  buttonClicked: {
    marginRight: 30,
    alignItems: "center",
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
