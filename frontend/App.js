import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerTitle: () => {},
            headerBackImageSource: require("./assets/back.png"),
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="Sign up" component={SignUp}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
