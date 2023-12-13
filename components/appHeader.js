import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { decode as atob } from "base-64";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppHeader(props) {
  const navigation = useNavigation();
  useEffect(() => {
    checkAccessToken();
  }, []);

  const checkAccessToken = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync("token");
      if (accessToken && (await accessTokenValidation(accessToken))) {
      } else {
        navigation.navigate("login");
      }
    } catch (error) {
      console.error("Error retrieving or validating access token:", error);
    }
  };

  const accessTokenValidation = async (accessToken) => {
    try {
      const expirationTime = JSON.parse(atob(accessToken.split(".")[1])).exp;
      const isTokenExpired = Date.now() >= expirationTime * 1000;
      return !isTokenExpired;
    } catch (error) {
      console.error("Error validating access token:", error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      navigation.navigate("login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.options.title}</Text>

      {props.options.title != "Login" && (
        <TouchableOpacity style={styles.logoutStyle} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="black" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFDF00",
    height: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    overflow: "hidden",
    marginBottom: -40,
  },
  headerText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  logoutText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  logoutStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
