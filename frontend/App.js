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
import Categories from "./screens/explore/Categories";
import DonationDetails from "./screens/explore/DonationDetails";
import AddDonation from "./screens/add/AddDonation";
import CameraView from "./screens/add/CameraView";
import UserRewards from "./screens/profile/UserRewards";
import UserReviews from "./screens/profile/UserReviews";
import UserDonations from "./screens/profile/UserDonations";
import Goals from "./screens/goals/Goals";
import Chat from "./screens/chat/Chat";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ImageGallery from "./screens/add/ImageGallery";
import GoalDetails from "./screens/goals/GoalDetails";

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
      <Stack.Screen name="UserRewards" component={UserRewards} />
      <Stack.Screen name="UserReviews" component={UserReviews} />
      <Stack.Screen name="UserDonations" component={UserDonations} />
      <Stack.Screen name="CameraView" component={CameraView} />
      <Stack.Screen name="ImageGallery" component={ImageGallery} />
    </Stack.Navigator>
  );
};

const Add = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="AddDonation" component={AddDonation} />
      <Stack.Screen name="CameraView" component={CameraView} />
      <Stack.Screen name="ImageGallery" component={ImageGallery} />
    </Stack.Navigator>
  );
};

const GoalsPage = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="GoalsPage" component={Goals} />
      <Stack.Screen name="GoalDetails" component={GoalDetails} />
    </Stack.Navigator>
  );
};

const ChatPage = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="ChatPage" component={Chat} />
    </Stack.Navigator>
  );
};

const Routes = () => {
  const { authState } = useAuth();
  // console.log(authState.authenticated);

  return (
    <NavigationContainer>
      {authState.authenticated ? (
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
              } else if (rn === "Donate") {
                iconName = focused ? "add-circle" : "add-circle-outline";
              } else if (rn === "Chat") {
                iconName = focused
                  ? "chatbubble-ellipses"
                  : "chatbubble-ellipses-outline";
              } else if (rn == "Goals") {
                iconName = focused ? "ios-bulb" : "ios-bulb-outline";
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
          <Tab.Screen name="Explore" component={Explore}></Tab.Screen>
          <Tab.Screen name="Goals" component={GoalsPage}></Tab.Screen>
          <Tab.Screen name="Donate" component={Add}></Tab.Screen>
          <Tab.Screen name="Chat" component={ChatPage}></Tab.Screen>
          <Tab.Screen name="You" component={You}></Tab.Screen>
        </Tab.Navigator>
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
