import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const Reward = ({ title, description, amount }) => {
  return (
    <View className="w-full justify-center">
      <View
        className="w-11/12 bg-gray-100 max-h-96 justify-around rounded-lg items-center py-4 mb-6"
        style={styles.shadow}
      >
        <View className="flex-row justify-between items-center w-full">
          <Image
            source={require("../images/badge.png")}
            className="w-10 h-10 ml-3"
          />
          <Text className="text-xl ">{title}</Text>
          <View className="flex-row mr-3">
            <Text className="text-base mr-1">{amount}</Text>
            <FontAwesome name="gift" size={24} color="black" />
          </View>
        </View>
        <Text className="mx-2 mt-6 text-base">{description}</Text>
      </View>
    </View>
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

export default Reward;
