import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/login";
// import Dashboard from "./screens/overAllDetails";
import AppHeader from "./components/appHeader";
import OrderDetailsScreen from "./screens/orderDetails";
import DynamicOrders from "./screens/ordersDynamic";
import { Provider } from "react-redux";
import store from "./store/store";

function AppComponent() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          header: (props) => <AppHeader {...props} />,
        }}
      >
        <Stack.Screen
          name="login"
          component={Login}
          options={{ title: "Login" }}
        />
        {/* <Stack.Screen
          name="dashboard"
          component={Dashboard}
          options={{ title: "Dashboard" }}
        /> */}
        <Stack.Screen
          name="orderDetails"
          component={OrderDetailsScreen}
          options={{ title: "Order Details" }}
        />
        <Stack.Screen
          name="dynamic"
          component={DynamicOrders}
          options={{ title: "Orders" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
