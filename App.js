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
import { NotificationResponse, Notification } from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import firebase from './firebase';

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
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  const registerForPushNotifications = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status: newStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (newStatus !== 'granted') {
        return;
      }
    }

    const expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;

    // Add the Expo Push Token to Firebase
    const uid = firebase.auth().currentUser.uid; // Replace with your user ID logic
    firebase.database().ref(`users/${uid}/pushToken`).set(expoPushToken);
  };

  // Handle incoming notifications
  Notifications.addNotificationReceivedListener(handleNotification);

  function handleNotification(notification) {
    console.log('Notification received:', notification);
  }

  // Handle tapped notifications
  Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

  function handleNotificationResponse(response) {
    console.log('Notification tapped:', response);
  }
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
