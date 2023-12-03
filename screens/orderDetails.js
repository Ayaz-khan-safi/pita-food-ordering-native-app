import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { Table, Row } from "react-native-table-component";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { EXPO_DEFAULT_BASE_URL } from "@env";
import {
  useFindOneOrderQuery,
  useOrderUpdateMutation,
} from "../services/ordersApi";
import { useUsersListQuery } from "../services/usersApi";

const deliveryTimeArray = [15, 30, 45, 60, "Others"];
const windowHeight = Dimensions.get("window").height;

export default function OrderDetailsScreen() {
  const [rider, setRider] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const route = useRoute();

  const dynamicID = route.params?.id;

  const { data: singleData } = useFindOneOrderQuery({
    id: dynamicID,
  });

  const { data: riders } = useUsersListQuery({
    limit: 100,
    page: 1,
    role: "RIDER",
  });

  const [updateOrder] = useOrderUpdateMutation();

  const userRider = riders?.data?.result;

  const handleAssignRider = async () => {
    console.log("Rider assigned!", deliveryTime, rider);
    const data = await {
      ...singleData?.data,
      riderId: rider,
      timing: deliveryTime,
    };
    console.log(singleData?.data?._id, data);
    updateOrder(data)
      .unwrap()
      .then((response) => {
        try {
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) =>
        console.log("There is a problem connecting to API.", error)
      );
      setIsModalVisible(!isModalVisible);
  };
  console.log("Single Data = ", singleData?.data);

  // console.log(EXPO_DEFAULT_BASE_URL);

  // console.log(userriRider);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <ImageBackground
      source={require("../assets/bg-img.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>{singleData?.data?.orderStatus}</Text>
          </View>
          <View style={styles.orderIdContainer}>
            <Text style={styles.orderId}>
              Order Type: {singleData?.data?.orderDeliverType}
            </Text>
          </View>

          <View style={styles.orderInfoContainer}>
            <Text style={styles.selectLabel}>Order Details</Text>
            <ScrollView style={styles.ScrollViewContainer}>
              {singleData?.data?.orderDetails.map((item, idx) => (
                <View
                  style={{
                    backgroundColor: "#F2D401",
                    borderBottomWidth: 1,
                    borderBottomColor: "#938100",
                    paddingVertical: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        fontWeight: 800,
                        flex: 0,
                        width: "35%",
                      }}
                    >
                      {item.productName}
                    </Text>
                    <View style={{ flex: 0, width: "20%", textAlign: "left" }}>
                      <Image
                        source={require("../assets/OrderCardImage/pizzaImage.png")}
                        style={{
                          width: 50,
                          height: 30,
                          flex: 0,
                        }}
                      ></Image>
                    </View>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 14,
                        fontWeight: 600,
                        flex: 0,
                        width: "15%",
                        textAlign: "center",
                      }}
                    >
                      {item.productQuantity}
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 14,
                        fontWeight: 600,
                        flex: 0,
                        width: "15%",
                        textAlign: "center",
                      }}
                    >
                      ${item.productPrice}
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 14,
                        fontWeight: 700,
                        flex: 0,
                        width: "15%",
                        textAlign: "right",
                      }}
                    >
                      ${item.productSubTotal}
                    </Text>
                  </View>
                  {item.addons &&
                    item.addons.map((addon, idx) => (
                      <View
                        style={{ paddingHorizontal: 15, paddingVertical: 5 }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginVertical: 5,
                            borderRadius: 5,
                            backgroundColor: "#FFDF00",
                            padding: 5,
                          }}
                        >
                          <Text
                            style={{
                              color: "#000",
                              fontSize: 16,
                              fontWeight: 700,
                              flex: 0,
                              width: "35%",
                              textAlign: "left",
                            }}
                          >
                            {addon.addonName}
                          </Text>
                          <View
                            style={{ flex: 0, width: "20%", textAlign: "left" }}
                          >
                            <Image
                              source={require("../assets/OrderCardImage/pizzaImage.png")}
                              style={{ width: 50, height: 30 }}
                            ></Image>
                          </View>
                          <Text
                            style={{
                              color: "#000",
                              flex: 0,
                              width: "15%",
                              textAlign: "center",
                            }}
                          >
                            {addon.addonQuantity}
                          </Text>
                          <Text
                            style={{
                              color: "#000",
                              flex: 0,
                              width: "15%",
                              textAlign: "center",
                            }}
                          >
                            ${addon.addonPrice}
                          </Text>
                          <Text
                            style={{
                              color: "#000",
                              flex: 0,
                              width: "15%",
                              textAlign: "right",
                            }}
                          >
                            ${addon.addonSubTotal}
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.customerInfoContainer}>
            <Text style={styles.custInfoText}>
              Address:{" "}
              {`${singleData?.data?.street} ${singleData?.data?.address}`}
            </Text>
            <Text style={styles.custInfoText}>
              Tax: {singleData?.data?.taxAmount}
            </Text>
            <Text style={styles.TotalPrice}>
              Total: ${singleData?.data?.totalAmount}
            </Text>
          </View>
          <View style={styles.containerPicker}>
            <Text style={styles.selectLabel}>
              Choose rider & delivery time:
            </Text>
            <View style={{ flexDirection: "column", gap: 15 }}>
              <View>
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={styles.timeCards}
                  showsHorizontalScrollIndicator={true}
                >
                  {deliveryTimeArray.map((time, idx) => (
                    <TouchableOpacity
                      style={styles.timeSingleCard}
                      activeOpacity={1}
                      onPress={() => setDeliveryTime(time)}
                    >
                      {deliveryTime === time ? (
                        <Ionicons
                          name="checkmark-circle-sharp"
                          size={30}
                          color="green"
                          style={styles.checkIcon}
                        />
                      ) : (
                        ""
                      )}

                      <Text style={styles.timeText}>{time}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <Picker
                selectedValue={rider}
                onValueChange={(itemValue, itemIndex) => setRider(itemValue)}
                style={styles.picker}
              >
                {userRider?.map((rider, idx) => (
                  <Picker.Item label={rider.name} value={rider._id} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={handleAssignRider}
            >
              <Text style={styles.buttonText}>
                Proceed to Print{" "}
                <Ionicons name="arrow-forward-sharp" size={14} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <Text style={styles.selectLabel}>Hello modal</Text>
        </Modal>
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
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 20,
  },
  orderIdContainer: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  statusContainer: {
    position: "absolute",
    top: 40,
    right: 10,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "red",
  },
  orderInfoContainer: {
    flexDirection: "column",
    gap: 5,
    width: "100%",
    paddingVertical: 5,
  },
  customerInfoContainer: {
    flexDirection: "column",
    gap: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
    width: "100%",
    paddingVertical: 10,
  },
  orderDetails: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  orderItemText: {
    fontSize: 18,
    color: "#FFDF00",
  },
  addonsList: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  addonsText: {
    fontSize: 14,
    color: "white",
  },
  custInfoText: {
    fontSize: 14,
    color: "white",
  },
  TotalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 0,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  timeCards: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  timeSingleCard: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 120,
    borderWidth: 0.5,
    backgroundColor: "#FFDF00",
    borderColor: "#FFDF00",
    borderRadius: 4,
    padding: 5,
    marginRight: 10,
  },
  checkIcon: {
    position: "absolute",
    top: -10,
  },
  timeText: {
    color: "#000",
  },
  containerPicker: {
    width: "100%",
    paddingVertical: 10,
  },
  selectLabel: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  picker: {
    height: 40,
    backgroundColor: "#FFDF00",
    marginBottom: 10,
    color: "#000",
    borderRadius: 5,
  },
  tableHead: { height: 40, padding: 8, backgroundColor: "#FFDF00" },
  tableText: {
    margin: 6,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#FFF1C1",
    padding: 8,
  },
  ScrollViewContainer: {
    height: windowHeight * 0.3,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#FFDF00",
  },
});
