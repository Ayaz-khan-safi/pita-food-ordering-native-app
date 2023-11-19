import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/login";
import Dashboard from "./screens/overAllDetails";
import PendingOrders from "./screens/pendingOrders";
import DeliveredOrders from "./screens/deliveredOrders";
import AppHeader from "./components/appHeader";
import OrderDetailsScreen from "./screens/orderDetails";
import { Provider } from "react-redux";
import store from "./store/store";

function AppComponent() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          header: (props) => <AppHeader {...props} />,
        }}
      >
        <Stack.Screen
          name="login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="dashboard"
          component={Dashboard}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="deliveredOrders"
          component={DeliveredOrders}
          options={{ title: "Delivered Orders" }}
        />
        <Stack.Screen
          name="pendingOrders"
          component={PendingOrders}
          options={{ title: "Pending Orders" }}
        />
        <Stack.Screen
          name="orderDetails"
          component={OrderDetailsScreen}
          options={{ title: "Order Details" }}
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
