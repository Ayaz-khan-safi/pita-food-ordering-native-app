import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const AppHeader = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.options.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFDF00",
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 100,
    overflow: "hidden",
    marginBottom: -40,
  },
  headerText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AppHeader;
