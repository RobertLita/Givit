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

const SignUp = () => {
  const navigation = useNavigation();
  // TODO validate inputs

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // api call
    console.log(email, password);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <View style={{ flex: 1 }}>
        <Text className="font-bold text-3xl text-black ml-4">Sign up</Text>
        <Text className="text-lg font-bold ml-4 mt-2 text-gray-400">
          Please sign up to continue.
        </Text>
      </View>
      <View style={{ flex: 4 }} className="w-full items-center justify-center">
        <View className="w-10/12 h-full justify-evenly">
          <Input
            label="Username*"
            value={username}
            setValue={setUsername}
            style={{ width: "100%" }}
          />
          <Input
            label="Email*"
            value={email}
            setValue={setEmail}
            email
            style={{ width: "100%" }}
          />
          <Input
            label="Password*"
            secureTextEntry
            value={password}
            setValue={setPassword}
            password
            style={{ width: "100%" }}
          />
        </View>
      </View>
      <View style={{ flex: 2 }} className="w-full items-center justify-center">
        <TouchableOpacity
          className="px-20 py-2 bg-red-400 rounded-md items-center"
          style={styles.shadow}
        >
          <Text className="text-white text-base">Sign up</Text>
        </TouchableOpacity>
        <Text className="text-base font-semibold text-gray-400 mt-5">
          Have an account?{" "}
          <Text
            className="text-red-400"
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
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

export default SignUp;
