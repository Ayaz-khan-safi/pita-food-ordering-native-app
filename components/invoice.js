import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InvoiceScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.companyInfo}>
        <Text style={styles.companyName}>Your Company Name</Text>
        <Text style={styles.companyAddress}>123 Company Street, City, Country</Text>
      </View>


      <View style={styles.invoiceDetails}>
        <Text style={styles.label}>Invoice Number:</Text>
        <Text style={styles.value}>12345</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>12/12/2023</Text>

      </View>


      <View style={styles.itemsContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.headerText}>Item</Text>
          <Text style={styles.headerText}>QTY</Text>
          <Text style={styles.headerText}>Amt</Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemCell}>Item 1</Text>
          <Text style={styles.itemCell}>$20.00</Text>
          <Text style={styles.itemCell}>$20.00</Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemCell}>Item 2</Text>
          <Text style={styles.itemCell}>$20.00</Text>
          <Text style={styles.itemCell}>$15.00</Text>
        </View>


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
    backgroundColor: 'white',
  },
  companyInfo: {
    alignItems: 'center', 
    marginBottom: 16,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  companyAddress: {
    fontSize: 16,
  },
  invoiceDetails: {
    flex: 1, 
    marginTop:50,
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
  },
  itemsContainer: {
    flex: 2,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 8,
    backgroundColor: '#e2e2e2',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#aaa',
  },
  itemCell: {
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InvoiceScreen;
