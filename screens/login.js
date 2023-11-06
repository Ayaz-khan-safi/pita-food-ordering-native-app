import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useLoginUserMutation } from "../services/login-Api";
import * as SecureStore from "expo-secure-store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState(
    "Incorrect Username OR Password. Please try again."
  );

  const navigation = useNavigation();
  const [mutation] = useLoginUserMutation();

  const handleLogin = () => {
    console.log(email, " ", pass);
    mutation({ email, pass })
      .unwrap()
      .then(async (response) => {
        if (response.data == null) {
          console.log(response.message);
          setIsSnackBarVisible(true);
          setSnackBarMessage(response.message);
        } else {
          if (response.data.user.role === "OWNER") {
            console.log(response.data.user.role);
            await SecureStore.setItemAsync("token", response.data.access);
            navigation.navigate("dashboard");
          }
        }
      })
      .catch((error) => {
        console.log("error", error);
        setIsSnackBarVisible(true);
        setSnackBarMessage(error.data.message);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/bg-img.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Pita Burger Master</Text>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            placeholderTextColor="#000"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#000"
            onChangeText={setPass}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Snackbar
        visible={isSnackBarVisible}
        onDismiss={() => {
          setIsSnackBarVisible(false);
        }}
        duration={5000}
        style={{
          backgroundColor: "#F00",
          marginBottom: "120%",
          marginHorizontal: 40,
        }}
      >
        {snackBarMessage}
      </Snackbar>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Blackish overlay
    justifyContent: "flex-end",
  },
  container: {
    paddingHorizontal: 40,
    paddingBottom: 50,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    marginBottom: 10,
    color: "#000",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    height: 50,
    backgroundColor: "#FFDF00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
  },
  headingContainer: {
    marginBottom: 100,
  },
  headingText: {
    color: "#fff",
    fontSize: 34,
    textAlign: "center",
  },
});
