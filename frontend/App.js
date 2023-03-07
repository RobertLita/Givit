import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigation from "./navigation";
import Button from "./components/Button";
import Text from "./components/Text";
import { theme } from "./constants";

const App = () => {
  return (
    <View style={styles.container}>
      {/*<Navigation />*/}
      <Button gradient shadow>
        <Text h1 color="white">
          Login
        </Text>
      </Button>
      <Button shadow>
        <Text title>Login</Text>
      </Button>
      <Button bgColor="secondary" shadow>
        <Text title color="white">
          Sign Up
        </Text>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default App;
