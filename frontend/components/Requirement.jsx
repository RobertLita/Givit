import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Requirement = ({ name, description, donatedBy }) => {
  return (
    <View
      className="w-11/12 bg-gray-100 max-h-96 rounded-lg items-center py-4 mb-6"
      style={styles.shadow}
    >
      <View className="flex-row items-center justify-between w-full">
        <View className="w-2/3 flex-column justify-between ml-2">
          <Text className="text-xl">{name}</Text>
          <Text className="text-base  mt-4">{description}</Text>
        </View>
        {!donatedBy && (
          <View>
            <TouchableOpacity
              style={styles.shadow}
              className="px-6 py-2 bg-red-400 rounded-md items-center mr-2"
            >
              <Text className="text-base">Donate</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {donatedBy ? (
        <View className="mt-6 bg-green-200 rounded px-10">
          <Text className="text-xl">Donated by {donatedBy}</Text>
        </View>
      ) : (
        <View className="mt-6 bg-red-200 rounded px-10">
          <Text className="text-xl">Looking for donator...</Text>
        </View>
      )}
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

export default Requirement;
