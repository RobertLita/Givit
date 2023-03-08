import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={Home}></Stack.Screen> */}
        <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
