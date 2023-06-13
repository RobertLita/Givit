import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Goal = ({ title, description, completed }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="w-11/12 bg-gray-100 max-h-96 rounded-lg items-center py-4 mb-6"
      onPress={() => navigation.navigate("GoalDetails")}
    >
      <View className="mx-2">
        <Text className="text-2xl mb-3">{title}</Text>
        <Text className="text-base">{description}</Text>
      </View>
      {completed ? (
        <View className="mt-6 bg-green-200 rounded px-10">
          <Text className="text-base">Completed</Text>
        </View>
      ) : (
        <View className="mt-6 bg-red-200 rounded px-10">
          <Text className="text-base">Uncompleted</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Goal;
