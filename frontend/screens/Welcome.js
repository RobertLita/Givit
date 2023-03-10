import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Carousel from "../components/Carousel";

const illustrations = [
  { id: 1, source: require("../images/welcome1.jpg") },
  { id: 2, source: require("../images/welcome2.jpg") },
];

const Welcome = () => {
  return (
    <SafeAreaView
      className="justify-center items-center bg-white"
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }} className="justify-center items-center">
        <Text className="text-3xl font-bold">
          Give a <Text className="text-red-400">little.</Text> Help a{" "}
          <Text className="text-red-400">lot.</Text>
        </Text>
        <Text className="text-gray-400 font-medium pt-2">
          Make a difference
        </Text>
      </View>
      <View style={{ flex: 2 }} className="relative justify-center">
        <Carousel images={illustrations} />
      </View>

      <View className="justify-center " style={{ flex: 2 }}>
        <TouchableOpacity
          className="px-20 py-2 bg-red-400 rounded-md mb-6"
          style={styles.shadow}
        >
          <Text className="text-white text-base">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="px-20 py-2 bg-white rounded-md"
          style={styles.shadow}
        >
          <Text className="text-base">Sign up</Text>
        </TouchableOpacity>
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

export default Welcome;
