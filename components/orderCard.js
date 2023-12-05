import React, {useState, useEffect} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import moment from 'moment';

export default function OrderCard({ item }) {
  const [timeAgo, setTimeAgo] = useState(null);
  const createdAtString = "2023-11-07T16:05:34.076Z";

  useEffect(() => {
    const createdAt = moment(createdAtString);
    const now = moment();

    const hoursAgo = now.diff(createdAt, 'hours');
    const daysAgo = now.diff(createdAt, 'days');

    if (hoursAgo < 24) {
      setTimeAgo(`${hoursAgo}h ago`);
    } else {
      setTimeAgo(`${daysAgo}d ago`);
    }
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={
          item.orderStatus === "PENDING"
            ? styles.statusContainerPending
            : styles.statusContainerDelivered
        }
      >
        <Text
          style={
            item.orderStatus === "PENDING"
              ? styles.statusTextPending
              : styles.statusTextDelireved
          }
        >
          {item.orderStatus}
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
            <Text style={styles.paymentMode}>Payment: {item?.paymentType}</Text>
          </View>
        </View>
        <View style={styles.timeAddress}>
          <Text style={styles.address}>
            {item?.address}, {item?.street}
          </Text>
          <Text style={styles.timeAgo}>
            {timeAgo}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#FFDF00",
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
  statusContainerDelivered: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "green",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  statusTextDelireved: {
    color: "green",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  statusContainerPending: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "red",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusTextPending: {
    color: "white",
    fontSize: 14,
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
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textShadowColor: "green",
    textShadowRadius: 4
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
    color: "green",
    textShadowColor: "#e2e2e2",
    textShadowRadius: 5,
    marginBottom: 20,
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
    borderBottomColor: "white",
    marginBottom: 5,
  },
  timeAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeAgo: {
    color: "#757272",
    fontSize: 10,
    marginBottom: 2,
  }
});
