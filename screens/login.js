import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useUserLoginMutation } from "../services/loginApi";
import * as SecureStore from "expo-secure-store";
import { EXPO_DEFAULT_BASE_URL } from "@env";

export default function Login() {
  const [email, setEmail] = useState("attzazg@gmail.com");
  const [pass, setPass] = useState("aBC@1234567");
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState(
    "Unable to connect to server. Please try again"
  );

  const navigation = useNavigation();
  const [mutation] = useUserLoginMutation();

  const handleLogin = () => {
    console.log(email, " ", pass);
    mutation({ email, pass })
      .unwrap()
      .then(async (response) => {
        if (response.data == null) {
          console.log(response.message);
          setIsSnackBarVisible(true);
          setSnackBarMessage(response);
        } else {
          if (response.data.user.role === "OWNER") {
            console.log(response.data.AccessToken);
            await SecureStore.setItemAsync("token", response.data.AccessToken);
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
  console.log(EXPO_DEFAULT_BASE_URL);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={Platform.OS === "android" ? -80 : 0}
    >
      <ImageBackground
        source={require("../assets/bg-img.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.formContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Pita Burger Master</Text>
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#000"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={pass}
                placeholderTextColor="#000"
                onChangeText={setPass}
                secureTextEntry={true}
              />
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
      <Snackbar
        visible={isSnackBarVisible}
        onDismiss={() => {
          setIsSnackBarVisible(false);
        }}
        duration={5000}
        style={styles.snackBar}
      >
        {snackBarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  container: {
    paddingHorizontal: 40,
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
  headingContainer: {},
  headingText: {
    color: "#fff",
    fontSize: 34,
    textAlign: "center",
  },
  formContainer: {
    flexDirection: "column",
    gap: 60,
    position: "relative",
    bottom: 100,
  },
  snackBar: {
    backgroundColor: "#F00",
    marginHorizontal: 40,
    flex: 1,
    justifyContent: "flex-start",
    bottom: 400,
  },
});
