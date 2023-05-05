import { View, Text } from "react-native";
import React from "react";

const colors = {
  CLOTHING: "green",
  ELECTRONICS: "blue",
  HOUSEHOLD: "yellow",
  TOYS: "red",
  MEDIA: "purple",
  SPORT: "pink",
  SCHOOL: "blue",
  PERSONAL: "indigo",
};

const Badge = ({ label, ...rest }) => {
  return (
    <>
      {label === "CLOTHING" ? (
        <View className="bg-green-200 px-1 w-2/3 rounded ml-2 items-center justify-center">
          <Text className="text-green-600 uppercase font-medium">{label}</Text>
        </View>
      ) : label === "ELECTRONICS" ? (
        <View className="bg-blue-200 px-1 w-2/3 rounded ml-2 items-center justify-center">
          <Text className="text-blue-600 uppercase font-medium">{label}</Text>
        </View>
      ) : label === "HOUSEHOLD" ? (
        <View className="bg-yellow-200 px-1 w-2/3 rounded ml-2 items-center justify-center">
          <Text className="text-yellow-600 uppercase font-medium">{label}</Text>
        </View>
      ) : label === "TOYS" ? (
        <View className="bg-red-200 px-1 w-2/3 rounded ml-2 items-center justify-center">
          <Text className="text-red-600 uppercase font-medium">{label}</Text>
        </View>
      ) : label === "MEDIA" ? (
        <View className="bg-purple-200 px-1 w-2/3 rounded ml-2 items-center justify-center">
          <Text className="text-purple-600 uppercase font-medium">{label}</Text>
        </View>
      ) : label === "SPORT" ? (
        <View className="bg-pink-200 px-1 w-2/3 rounded ml-2 items-center justify-center">
          <Text className="text-pink-600 uppercase font-medium">{label}</Text>
        </View>
      ) : label === "SCHOOL" ? (
        <View className="bg-blue-200 px-1 w-2/3 rounded ml-2 items-center justify-center">
          <Text className="text-blue-600 uppercase font-medium">{label}</Text>
        </View>
      ) : (
        <View className="bg-indigo-200 px-1 w-2/3 rounded ml-2 items-center justify-center">
          <Text className="text-indigo-600 uppercase font-medium">{label}</Text>
        </View>
      )}
    </>
  );
};

export default Badge;
