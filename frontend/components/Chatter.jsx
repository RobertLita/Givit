import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Chatter = ({ name, myId, otherId }) => {
  const navigation = useNavigation();
  return (
    <View className="bg-gray-200 flex-row h-16 items-center rounded">
      <View className="w-3/4 items-center">
        <Text className="text-black-400 font-medium text-xl">{name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ChatPage", { myId, otherId })}
      >
        <View className="w-10 h-10 rounded bg-gray-300 justify-center items-center ">
          <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Chatter;
