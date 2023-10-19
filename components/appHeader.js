import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function AppHeader(props){
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

