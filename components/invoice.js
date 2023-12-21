import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useFindOneOrderQuery } from "../services/ordersApi";

const InvoiceScreen = (singleData) => {
  console.log(singleData?.singleData?.data);
  return (
    <View style={styles.container}>
      <View style={styles.companyInfo}>
        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          {/* <Image
            source={require("../images/logo.png")}
            style={{
              width: 200,
              height: 65,
            }}
          ></Image> */}
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: 4 }}>
          <Text style={styles.companyAddress}>
            123 Company Street, City, Country
          </Text>
          <Text style={styles.companyAddress}>PHONE: 987263015</Text>
        </View>
      </View>

      <View style={styles.invoiceDetailsSection}>
        <View style={styles.invoiceDetails}>
          <Text style={styles.label}>Payment Mode:</Text>
          <Text style={styles.value}>
            {singleData?.singleData?.data?.paymentType}
          </Text>
          <Text style={styles.label}>Customer:</Text>
          <Text style={styles.value}>
            {singleData?.singleData?.data?.customerData?.name}
          </Text>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>
            {singleData?.singleData?.data?.customerData?.address}
          </Text>
        </View>
        <View style={styles.invoiceDetails}>
          <Text style={styles.label}>Invoice #:</Text>
          <Text style={styles.value}>12345</Text>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>
            {singleData?.singleData?.data?.createdAt.split("T")[0]}
          </Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.headerTextName}>Item Name</Text>
          <Text style={styles.headerText}>Qty</Text>
          <Text style={styles.headerText}>Price</Text>
          <Text style={styles.headerTextLast}>Amt</Text>
        </View>
        {singleData?.singleData?.data?.orderDetails.map((item, idx) => (
          <View key={item._id} style={styles.mapContainer}>
            <View style={styles.itemRow}>
              <Text style={styles.productNameCell}>{item?.productName}</Text>
              <Text style={styles.itemCell}>{item.productQuantity}</Text>
              <Text style={styles.itemCell}>${item.productPrice}</Text>
              <Text style={styles.itemCellLast}>${item.productSubTotal}</Text>
            </View>
            {item?.addons?.map((addon, index) => (
              <View key={addon._id} style={styles.addonRow}>
                <Text style={styles.productNameCell}>
                  {" "}
                  + {addon?.addonName}
                </Text>
                <Text style={styles.itemCell}>{addon.addonQuantity}</Text>
                <Text style={styles.itemCell}>${addon.addonPrice}</Text>
                <Text style={styles.itemCellLast}>${addon.addonSubTotal}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>
          ${singleData?.singleData?.data?.totalAmount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  companyInfo: {
    alignItems: "center",
    marginBottom: 16,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  companyDetails: {},
  companyAddress: {
    fontSize: 12,
    textTransform: "uppercase",
  },
  invoiceDetailsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
    marginRight: 16,
    gap: 15,
    marginBottom: 6,
  },

  invoiceDetails: {},
  label: {
    fontSize: 12,
    fontWeight: "bold",
  },
  value: {
    fontSize: 12,
    marginBottom: 3,
  },
  itemsContainer: {
    flex: 2,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#c7c7c7",
  },
  headerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerTextName: {
    flex: 3,
    fontSize: 12,
    fontWeight: "bold",
  },
  headerTextLast: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
  },
  mapContainer: {
    backgroundColor: "#f8f8f8",
    marginBottom: 1,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#ededed",
  },
  addonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  itemCell: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
  },
  productNameCell: {
    flex: 3,
    fontSize: 12,
  },
  itemCellLast: {
    flex: 1,
    fontSize: 11,
    textAlign: "right",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default InvoiceScreen;
