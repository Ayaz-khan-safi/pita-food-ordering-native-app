import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import moment from "moment";

export default function OrderCard({ item }) {
  const [timeAgo, setTimeAgo] = useState(null);
  const createdAtString = "2023-11-07T16:05:34.076Z";

  useEffect(() => {
    const createdAt = moment(createdAtString);
    const now = moment();

    const hoursAgo = now.diff(createdAt, "hours");
    const daysAgo = now.diff(createdAt, "days");

    if (hoursAgo < 24) {
      setTimeAgo(`${hoursAgo}h ago`);
    } else {
      setTimeAgo(`${daysAgo}d ago`);
    }
  }, []);
  return (
    <View style={{...styles.container, backgroundColor: item.orderStatus === "DELIVERED" ?  "#fff" :  "#FFDF00",}}>
      <View
        style={{
          ...styles.statusContainer,
          backgroundColor:
            item.orderDeliverType === "DELIVERY" ? "green" : "#fff",
        }}
      >
        <Text
          style={{
            ...styles.statusText,
            color: item.orderDeliverType === "DELIVERY" ? "#fff" : "green",
          }}
        >
          {item.orderDeliverType}
        </Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>${item?.totalAmount}</Text>
      </View>

      <Image
        style={styles.image}
        source={require("../assets/OrderCardImage/pizzaImage.png")}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.topDetails}>
          <View>
            <Text style={styles.custName}>{item?.customerData?.name}</Text>

            <Text style={styles.orderObj}>Burger | Coke | Family Deal</Text>
          </View>
          <View>
            <Text style={styles.paymentMode}><EvilIcons name="credit-card" size={14} color="green" /> {item?.paymentType}</Text>
          </View>
        </View>
        <View style={styles.timeAddress}>
          <Text style={styles.address}>
          <EvilIcons name="location" size={14} color="green" />{" "}{item?.address}, {item?.street}
          </Text>
          <Text style={styles.timeAgo}><Ionicons name="time-outline" size={13} color="green" />{" "}{timeAgo}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  statusContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "green",
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  statusText: {
    color: "green",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  statusContainerAccepted: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "green",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusTextAccepted: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  totalContainer: {
    position: "absolute",
    top: 2,
    right: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  totalText: {
    color: "green",
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    width: 70,
    height: 60,
    borderRadius: 0,
    marginRight: 25,
    marginTop: 30,
  },
  detailsContainer: {
    flex: 1,
  },
  customerName: {
    fontSize: 12,
    color: "green",
    marginBottom: 2,
  },
  address: {
    fontSize: 10,
    color: "green",
    marginBottom: 2,
  },
  custName: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "green",
    textShadowColor: "#e2e2e2",
    textShadowRadius: 5,
    marginBottom: 10,
  },
  paymentMode: {
    fontSize: 10,
    color: "green",
    marginBottom: 2,
  },
  orderObj: {
    fontSize: 10,
    color: "green",
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  topDetails: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#9DB20B",
    marginBottom: 5,
  },
  timeAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeAgo: {
    color: "green",
    fontSize: 10,
    marginBottom: 2,
  },
});
