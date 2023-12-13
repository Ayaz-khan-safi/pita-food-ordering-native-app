import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useFindOneOrderQuery } from "../services/ordersApi";

const InvoiceScreen = (singleData) => {
  console.log(singleData);

  return (
    <View style={styles.container}>
      <View style={styles.companyInfo}>
        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <Image
            source={require("../assets/logo.png")}
            style={{
              width: 200,
              height: 65,
            }}
          ></Image>
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
          <Text style={styles.value}>COD</Text>
          <Text style={styles.label}>Customer:</Text>
          <Text style={styles.value}>Ahmed Ali</Text>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>123 Company Street, City, Country</Text>
        </View>
        <View style={styles.invoiceDetails}>
          <Text style={styles.label}>Invoice #:</Text>
          <Text style={styles.value}>12345</Text>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>12/12/2023</Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.headerText}>Item</Text>
          <Text style={styles.headerText}>QTY</Text>
          <Text style={styles.headerText}>Price</Text>
          <Text style={styles.headerText}>Amt</Text>
        </View>
        {singleData?.data?.orderDetails.map((item, idx) => (
          <View key={idx} style={styles.itemRow}>
            <Text style={styles.itemCell}>{item.name}</Text>
            <Text style={styles.itemCell}>{item.name}</Text>
            <Text style={styles.itemCell}>{item.name}</Text>
            <Text style={styles.itemCell}>{item.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>$35.00</Text>
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
    padding: 8,
    backgroundColor: "#e2e2e2",
  },
  headerText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#aaa",
  },
  itemCell: {
    fontSize: 12,
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
