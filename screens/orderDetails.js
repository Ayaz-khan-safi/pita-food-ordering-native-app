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
import { Ionicons, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import {
  useFindOneOrderQuery,
  useOrderUpdateMutation,
} from "../services/ordersApi";
import { useUsersListQuery } from "../services/usersApi";
import Steps from "react-native-steps";

const labels = ["Created", "Accepted", "Pending"];
const configs = {
  stepIndicatorSize: 24,
  currentStepIndicatorSize: 42,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: "#FFDF00",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#FFDF00",
  stepStrokeUnFinishedColor: "#aaa",
  separatorFinishedColor: "#FFDF00",
  separatorUnFinishedColor: "#aaa",
  stepIndicatorFinishedColor: "#FFDF00",
  stepIndicatorUnFinishedColor: "green",
  stepIndicatorCurrentColor: "#FFDF00",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 24,
  stepIndicatorLabelCurrentColor: "#000",
  stepIndicatorLabelFinishedColor: "#000",
  stepIndicatorLabelUnFinishedColor: "#aaa",
  labelColor: "#aaa",
  labelSize: 13,
  currentStepLabelColor: "#FFDF00",
};

const deliveryTimeArray = [15, 30, 45, 60, "Others"];
const windowHeight = Dimensions.get("window").height;

export default function OrderDetailsScreen() {
  const [rider, setRider] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  const route = useRoute();

  const dynamicID = route.params?.id;

  const { data: singleData } = useFindOneOrderQuery(
    {
      id: dynamicID,
    },
    { refetchOnMountOrArgChange: true }
  );

  const { data: riders } = useUsersListQuery(
    {
      limit: 100,
      page: 1,
      role: "RIDER",
    },
    { refetchOnMountOrArgChange: true }
  );

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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ImageBackground
      source={require("../assets/bg-img.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>{singleData?.data?.orderStatus}</Text>
            <View
              style={{
                ...styles.statusIconTextContainer,
                backgroundColor:
                  singleData?.data?.orderDeliverType === "DELIVERY"
                    ? "green"
                    : "#fff",
              }}
            >
              <Text
                style={{
                  ...styles.orderId,

                  color:
                    singleData?.data?.orderDeliverType === "DELIVERY"
                      ? "#fff"
                      : "green",
                  textTransform: "capitalize",
                }}
              >
                {singleData?.data?.orderDeliverType}{" "}
              </Text>
              {singleData?.data?.orderDeliverType === "DELIVERY" ? (
                <MaterialIcons name="delivery-dining" size={20} color="#fff" />
              ) : (
                <Ionicons name="fast-food-outline" size={20} color="green" />
              )}
            </View>
          </View>
          {singleData?.data?.orderDeliverType === "DELIVERY" ? (
            <Text style={styles.custInfoText}>
              <EvilIcons name="location" size={18} color="#fff" />{" "}
              {`${singleData?.data?.street} ${singleData?.data?.address}`}
            </Text>
          ) : (
            ""
          )}

          <View style={styles.stepperContainer}>
            <Steps
              configs={configs}
              count={3}
              current={current}
              labels={labels}
              reversed={false}
            />
          </View>
        </View>
        <View style={styles.orderDetailsContainer}>
          <View style={styles.orderInfoContainer}>
            <ScrollView style={styles.ScrollViewContainer}>
              <View>
                {singleData?.data?.orderDetails.map((item, idx) => (
                  <View
                    key={item._id}
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
                          fontWeight: "bold",
                          flex: 0,
                          width: "35%",
                        }}
                      >
                        {item.productName}
                      </Text>
                      <View
                        style={{ flex: 0, width: "20%", textAlign: "left" }}
                      >
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
                          fontWeight: "bold",
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
                          fontWeight: "bold",
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
                          fontWeight: "bold",
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
                            key={addon._id}
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
                                fontWeight: "bold",
                                flex: 0,
                                width: "35%",
                                textAlign: "left",
                              }}
                            >
                              {addon.addonName}
                            </Text>
                            <View
                              style={{
                                flex: 0,
                                width: "20%",
                                textAlign: "left",
                              }}
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
              </View>
            </ScrollView>
            <View style={styles.customerInfoContainer}>
              <Text style={styles.TotalPrice}>
                ${singleData?.data?.totalAmount}
              </Text>
            </View>
          </View>
        </View>
        {singleData?.data?.orderStatus === "PENDING" && (
          <View style={styles.actionsContainer}>
            <View style={styles.containerPicker}>
              <View style={{ flexDirection: "column", gap: 3 }}>
                <View>
                  <Text style={styles.selectLabel}>Choose Delivery Time</Text>
                  <ScrollView
                    horizontal={true}
                    contentContainerStyle={styles.timeCards}
                    showsHorizontalScrollIndicator={true}
                  >
                    {deliveryTimeArray.map((time, idx) => (
                      <TouchableOpacity
                        key={time}
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
                <View>
                  <Text style={styles.selectLabel}>Choose Rider</Text>
                  <Picker
                    selectedValue={rider}
                    onValueChange={(itemValue, itemIndex) =>
                      setRider(itemValue)
                    }
                    style={styles.picker}
                  >
                    {userRider?.map((rider, idx) => (
                      <Picker.Item
                        key={rider.name}
                        label={rider.name}
                        value={rider._id}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "green" }]}
                onPress={handleAssignRider}
              >
                <Text style={styles.buttonText}>
                  Proceed to Print{" "}
                  <Ionicons
                    name="arrow-forward-sharp"
                    size={14}
                    color="white"
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {singleData?.data?.orderStatus === "CREATED" && (
          <View style={styles.actionsContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{ ...styles.createdButton, backgroundColor: "#aaa" }}
                onPress={() => console.log("Cancel button Clicked")}
              >
                <Text style={styles.buttonText}>
                  Cancel{" "}
                  <Ionicons
                    name="arrow-forward-sharp"
                    size={14}
                    color="white"
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.createdButton, backgroundColor: "green" }}
                onPress={() => console.log("Accept button Clicked")}
              >
                <Text style={styles.buttonText}>
                  Accept{" "}
                  <Ionicons
                    name="arrow-forward-sharp"
                    size={14}
                    color="white"
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {singleData?.data?.orderStatus === "CREATED" && (
          <View style={styles.actionsContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{ ...styles.createdButton, backgroundColor: "#aaa" }}
                onPress={() => console.log("Cancel button Clicked")}
              >
                <Text style={styles.buttonText}>
                  Cancel{" "}
                  <Ionicons
                    name="arrow-forward-sharp"
                    size={14}
                    color="white"
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.createdButton, backgroundColor: "green" }}
                onPress={() => console.log("Accept button Clicked")}
              >
                <Text style={styles.buttonText}>
                  Accept{" "}
                  <Ionicons
                    name="arrow-forward-sharp"
                    size={14}
                    color="white"
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <Text style={styles.selectLabel}>Hello modal</Text>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 25,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 10,
    paddingTop: 25,
    paddingHorizontal: 25,
  },
  orderDetailsContainer: {
    flex: 1,
  },
  actionsContainer: {},

  statusIconTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  statusContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepperContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  status: {
    textTransform: "capitalize",
    color: "#fff",
    fontSize: 20,
    letterSpacing: 3,
  },
  orderInfoContainer: {
    flexDirection: "column",
    width: "100%",
  },
  customerInfoContainer: {
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
    textAlign: "right",
    fontSize: 14,
    color: "#aaa",
    marginTop: 6,
  },
  TotalPrice: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    textAlign: "right",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginVertical: 10,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  createdButton: {
    flex: "40%",
    paddingVertical: 15,
    // paddingHorizontal: 30,
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
    width: 100,
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
    fontSize: 14,
    color: "#aaa",
    marginBottom: 5,
  },
  picker: {
    height: 40,
    backgroundColor: "#FFDF00",
    marginBottom: 10,
    color: "#000",
    borderRadius: 10,
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
    maxHeight: windowHeight * 0.3,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#FFDF00",
  },

  // New Styling starts from here
  mainContainer: {
    backgroundColor: "#e2e2e2",
  },
});
