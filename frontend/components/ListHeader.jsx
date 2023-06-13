import { View, Text } from "react-native";
import React from "react";

const ListHeader = ({ title }) => {
  return (
    <View>
      <Text className="font-bold text-2xl text-black ml-4 mb-2">{title}</Text>
    </View>
  );
};

export default ListHeader;
