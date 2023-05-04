import { View, Text } from "react-native";
import React from "react";

const Badge = ({ label, ...rest }) => {
  const colors = {
    CLOTHING: "green",
    ELECTRONICS: "blue",
    HOUSEHOLD: "yellow",
    TOYS: "red",
    MEDIA: "purple",
    SPORT: "pink",
    SCHOOL: "gray",
    PERSONAL: "indigo",
  };
  const bgColor = `bg-${colors[label]}-200`;
  const color = `text-${colors[label]}-600`;
  const containerClassName = `${bgColor} px-1 w-1/2 rounded ml-2 items-center justify-center`;
  const textClassName = `${color} uppercase font-medium`;
  return (
    <View className={containerClassName} rest>
      <Text className={textClassName}>{label}</Text>
    </View>
  );
};

export default Badge;
