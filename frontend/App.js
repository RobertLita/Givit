import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/auth/Welcome";
import Login from "./screens/auth/Login";
import SignUp from "./screens/auth/SignUp";
import Marketplace from "./screens/explore/Marketplace";
import Profile from "./screens/profile/Profile";
import Settings from "./screens/Settings";
import Categories from "./screens/explore/Categories";
import DonationDetails from "./screens/explore/DonationDetails";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  headerTitle: () => {},
  headerBackImageSource: require("./assets/back.png"),
  unmountOnBlur: true,
};

const Auth = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="WelcomePage" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Sign up" component={SignUp} />
    </Stack.Navigator>
  );
};

const Explore = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Marketplace" component={Marketplace} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="DonationDetails" component={DonationDetails} />
    </Stack.Navigator>
  );
};

const You = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;

              if (rn === "Welcome") {
                iconName = focused ? "home" : "home-outline";
              } else if (rn == "Explore") {
                iconName = focused ? "compass" : "compass-outline";
              } else if (rn === "You") {
                iconName = focused ? "person" : "person-outline";
              } else if (rn === "Settings") {
                iconName = focused ? "settings" : "settings-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#F9AC67",
            tabBarInactiveTintColor: "grey",
            tabBarLabelStyle: { paddingBottom: 5, fontSize: 10 },
            tabBarStyle: { padding: 5, height: 50 },
            tabBarHideOnKeyboard: true,
            unmountOnBlur: true,
            headerShown: false,
          })}
        >
          <Tab.Screen name="Welcome" component={Auth}></Tab.Screen>
          <Tab.Screen name="Explore" component={Explore}></Tab.Screen>
          <Tab.Screen name="You" component={You}></Tab.Screen>
          <Tab.Screen name="Settings" component={Settings}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
