import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Marketplace from "./screens/Marketplace";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTitle: () => {},
        headerBackImageSource: require("./assets/back.png"),
      }}
    >
      <Stack.Screen name="WelcomePage" component={Welcome}></Stack.Screen>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Sign up" component={SignUp}></Stack.Screen>
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
              } else if (rn === "Profile") {
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

            headerShown: false,
          })}
        >
          <Tab.Screen name="Welcome" component={Auth}></Tab.Screen>
          <Tab.Screen name="Explore" component={Marketplace}></Tab.Screen>
          <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
          <Tab.Screen name="Settings" component={Settings}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
