import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import dummyData from "../data/dummy";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useFindOneOrderQuery } from "../services/ordersApi";
import { Ionicons } from "@expo/vector-icons";

export default function OrderDetailsScreen() {
  const [rider, setRider] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(0);
  const route = useRoute();

  const dynamicID = route.params?.id;

  const { data: singleData } = useFindOneOrderQuery({ id: dynamicID });

  console.log(singleData?.data);

  const handleAssignRider = () => {
    console.log("Rider assigned!", deliveryTime);
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
            <Text style={styles.selectLabel}>ORDER DETAILS</Text>
            <FlatList
              data={singleData?.data?.orderDetails}
              keyExtractor={(item, idx) => idx}
              renderItem={({ item }) => (
                <>
                  <Text style={styles.orderItemText}>{item?.productName}</Text>
                  <View style={styles.addonsList}>
                    <Text style={styles.addonsText}>ADDONS: </Text>
                    {item?.addons.map((item, idx) => (
                      <Text key={idx} style={styles.addonsText}>
                        {item?.addonName}
                      </Text>
                    ))}
                  </View>
                </>
              )}
            />
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
            <View>
              <Text style={styles.selectLabel}>
                Select Expected Delivery Time:
              </Text>
              <View style={styles.timeCards}>
                <TouchableOpacity
                  style={styles.timeSingleCard}
                  activeOpacity={1}
                  onPress={() => setDeliveryTime(15)}
                >
                  {deliveryTime === 15 ? (
                    <Ionicons
                      name="checkmark-circle-sharp"
                      size={30}
                      color="green"
                      style={styles.checkIcon}
                    />
                  ) : (
                    ""
                  )}

                  <Text style={styles.timeText}>15 mins</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.timeSingleCard}
                  activeOpacity={1}
                  onPress={() => setDeliveryTime(30)}
                >
                  {deliveryTime === 30 ? (
                    <Ionicons
                      name="checkmark-circle-sharp"
                      size={30}
                      color="green"
                      style={styles.checkIcon}
                    />
                  ) : (
                    ""
                  )}
                  <Text style={styles.timeText}>30 mins</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.timeSingleCard}
                  activeOpacity={1}
                  onPress={() => setDeliveryTime(60)}
                >
                  {deliveryTime === 60 ? (
                    <Ionicons
                      name="checkmark-circle-sharp"
                      size={30}
                      color="green"
                      style={styles.checkIcon}
                    />
                  ) : (
                    ""
                  )}
                  <Text style={styles.timeText}>1 hour</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.selectLabel}>Select a Rider</Text>
              <Picker
                selectedValue={rider}
                onValueChange={(itemValue, itemIndex) => setRider(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Peter Hudson" value="Peter Hudson" />
                <Picker.Item label="David Screw" value="David Screw" />
                <Picker.Item label="Andre Pen" value="Andre Pen" />
              </Picker>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={handleAssignRider}
            >
              <Text style={styles.buttonText}>
                Process and Print{" "}
                <Ionicons name="arrow-forward-sharp" size={14} color="white" />
              </Text>
            </TouchableOpacity>
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
    top: 30,
    left: 10,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  statusContainer: {
    position: "absolute",
    top: 30,
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
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
    width: "100%",
    paddingVertical: 10,
  },
  customerInfoContainer: {
    flexDirection: "column",
    gap: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
    width: "100%",
    paddingVertical: 10,
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#000",
    gap: 15,
  },
  timeSingleCard: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderWidth: 0.5,
    backgroundColor: "#FFDF00",
    borderColor: "#FFDF00",
    borderRadius: 4,
    padding: 5,
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
    gap: 10,
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
});
