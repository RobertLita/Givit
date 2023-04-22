import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";

const Login = () => {
  const navigation = useNavigation();
  // TODO validate inputs

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // api call
    console.log(email, password);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <View style={{ flex: 1 }}>
        <Text className="font-bold text-3xl text-black ml-4">Login</Text>
        <Text className="text-lg font-bold ml-4 mt-2 text-gray-400">
          Please sign in to continue.
        </Text>
      </View>

      <View style={{ flex: 2 }} className="w-full items-center justify-evenly">
        <Input label="Email*" value={email} setValue={setEmail} email />
        <Input
          label="Password*"
          secureTextEntry
          value={password}
          setValue={setPassword}
          password
          className="mx-2"
        />
      </View>
      <View style={{ flex: 2 }} className="w-full items-center justify-center">
        <TouchableOpacity
          className="px-20 py-2 bg-red-400 rounded-md items-center"
          style={styles.shadow}
        >
          <Text className="text-white text-base">Login</Text>
        </TouchableOpacity>
        <Text className="text-base font-semibold text-gray-400 mt-5">
          Don't have an account?{" "}
          <Text
            className="text-red-400"
            onPress={() => navigation.navigate("Sign up")}
          >
            Sign up
          </Text>
        </Text>
        <Text
          className="text-base font-semibold text-gray-300 mt-4"
          onPress={() => navigation.navigate("Sign up")}
        >
          Forgot your password?
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
});

export default Login;
