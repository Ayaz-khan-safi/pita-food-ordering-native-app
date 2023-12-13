import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import {
  Ionicons,
  EvilIcons,
  MaterialIcons,
  FontAwesome5,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import {
  useFindOneOrderQuery,
  useOrderUpdateMutation,
} from "../services/ordersApi";
import { useUsersListQuery } from "../services/usersApi";
import Steps from "react-native-steps";
import InvoiceScreen from "../components/invoice";
import RNPrint from "react-native-print";
import { useNavigation } from "@react-navigation/native";

const labels = ["Created", "Accepted", "Ready", "Delivered"];
const configs = {
  stepIndicatorSize: 24,
  currentStepIndicatorSize: 42,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: "#FFDF00",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#FFDF00",
  stepStrokeUnFinishedColor: "green",
  separatorFinishedColor: "#FFDF00",
  separatorUnFinishedColor: "green",
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

const deliveryTimeArray = ["15 min", "30 min", "45 min", "60 min", "Others"];
const windowHeight = Dimensions.get("window").height;

export default function OrderDetailsScreen() {
  const [rider, setRider] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  const route = useRoute();
  const navigation = useNavigation();

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

  const handleAssignRider = async (orderStatus) => {
    const data = await {
      ...singleData?.data,
      riderId: rider,
      timing: deliveryTime,
      orderStatus: orderStatus,
    };
    delete data._id
    updateOrder(JSON.stringify(data))
      .unwrap()
      .then((response) => {
        try {
          console.log("This is response: ", response);
          setIsModalVisible(!isModalVisible);
        } catch (error) {
          console.log("This is error: ", error);
        }
      })
      .catch(
        (error) => console.log("There is a problem connecting to API.", error),
        console.log(data),
        console.log(rider)
      );
  };

  const handleGoToOrdersPage = async () => {
    navigation.navigate("dynamic");
  };

  const handlePrint = async () => {
    const printContent = <Text>Here is the print content</Text>;
    console.log("Printing...");
    setIsModalVisible(!isModalVisible);
    // await RNPrint.print({
    //   printerURL: "your-printer-url",
    //   html: printContent,
    // });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const renderContent = (orderStatus) => {
    switch (orderStatus) {
      case "CREATED":
        return (
          <View style={styles.actionsContainer}>
            <View style={styles.buttonContainerCreated}>
              <TouchableOpacity
                style={[
                  styles.buttonCreated,
                  { backgroundColor: "#fff", color: "green" },
                ]}
                onPress={() => handleAssignRider("CANCELED")}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonCreated, { backgroundColor: "green" }]}
                onPress={() => handleAssignRider("ACCEPTED")}
              >
                <Text style={{ ...styles.buttonText, color: "#fff" }}>
                  Accept the order{" "}
                  <Ionicons
                    name="arrow-forward-sharp"
                    size={14}
                    color="white"
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "ACCEPTED":
        return (
          <View style={styles.actionsContainer}>
            <View style={styles.containerPicker}>
              <View style={{ flexDirection: "column", gap: 3 }}>
                <View>
                  <Text style={styles.selectLabel}>
                    
                    {singleData?.data?.orderDeliverType === "DELIVERY"
                      ? "Delievery "
                      : "Pickup "}
                    Time :
                  </Text>
                  <FlatList
                    data={deliveryTimeArray}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.timeSingleCard}
                        activeOpacity={1}
                        onPress={() => setDeliveryTime(item)}
                      >
                        {deliveryTime === item ? (
                          <Ionicons
                            name="checkmark-circle-sharp"
                            size={30}
                            color="green"
                            style={styles.checkIcon}
                          />
                        ) : (
                          ""
                        )}

                        <Text style={styles.timeText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    horizontal={true}
                  />
                </View>
                {singleData?.data?.orderDeliverType === "DELIVERY" ? (
                  <View>
                    <Text style={styles.selectLabel}>Rider</Text>
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
                ) : null}
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "green" }]}
                onPress={() => handleAssignRider("READY")}
              >
                <Text style={{ ...styles.buttonText, color: "#fff" }}>
                  Process the order{" "}
                  <Ionicons
                    name="arrow-forward-sharp"
                    size={14}
                    color="white"
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "READY":
        return (
          <View style={styles.buttonContainerReady}>
            <Text style={styles.buttonTextReady}>
              This order is ready to deliver!
            </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={handlePrint}
            >
              <Text style={{ ...styles.buttonText, color: "#fff" }}>
                Print the order{" "}
                <AntDesign name="printer" size={16} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        );
      case "DELIVERED":
        return (
          <View style={styles.buttonContainerReady}>
            <Text style={styles.buttonTextReady}>
              This order is already Delivered!
            </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={handleGoToOrdersPage}
            >
              <Text style={{ ...styles.buttonText, color: "#fff" }}>
                <AntDesign name="back" size={16} color="white" /> Go back to
                orders page{" "}
              </Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return (
          <View style={styles.buttonContainerReady}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={handleGoToOrdersPage}
            >
              <Text style={{ ...styles.buttonText, color: "#fff" }}>
                <AntDesign name="back" size={16} color="white" /> Go back to
                orders page{" "}
              </Text>
            </TouchableOpacity>
          </View>
        );
    }
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
              {`${singleData?.data?.address}`}
            </Text>
          ) : (
            ""
          )}

          <View style={styles.stepperContainer}>
            <Steps
              configs={configs}
              count={4}
              current={
                singleData?.data?.orderStatus === "CREATED"
                  ? 0
                  : singleData?.data?.orderStatus === "ACCEPTED"
                  ? 1
                  : singleData?.data?.orderStatus === "READY"
                  ? 2
                  : singleData?.data?.orderStatus === "DELIVERED"
                  ? 3
                  : 0
              }
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
        <View>
          {renderContent((orderStatus = singleData?.data?.orderStatus))}
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={{ gap: 15 }}
      >
        <InvoiceScreen singleData={singleData}/>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "green" }]}
          onPress={handlePrint}
        >
          <Text style={{...styles.buttonText, color: "#fff"}}>
            Print Invoice <AntDesign name="printer" size={16} color="white" />
          </Text>
        </TouchableOpacity>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 10,
    paddingTop: 50,
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
  buttonContainerReady: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: 15,
    width: "100%",
    marginVertical: 10,
  },
  buttonContainerCreated: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  buttonCreated: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
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
  buttonTextReady: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  buttonText: {
    // color: "white",
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
