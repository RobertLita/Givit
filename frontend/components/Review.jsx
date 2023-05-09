import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const Review = () => {
  const rating = 4.5;
  const message =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dictum, tortor at fringilla volutpat, augue ante viverra purus, sit amet convallis lacus eros nec odio. ";
  return (
    <View
      className="w-11/12 bg-gray-100 max-h-96 justify-around rounded-lg items-center py-4 mb-6"
      style={styles.shadow}
    >
      <View className="flex-row justify-between items-center w-full">
        <View className="bg-gray-400 w-20 h-20 mx-3 rounded-full items-center justify-center" />
        <View className="bg-gray-300 w-12 h-6 items-center justify-around rounded-md flex-row mr-5">
          <FontAwesome name="star" size={16} color="black" />
          <Text className="text-md">{rating}</Text>
        </View>
      </View>
      <Text className="text-base mx-4 mt-6">{message}</Text>
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

export default Review;
