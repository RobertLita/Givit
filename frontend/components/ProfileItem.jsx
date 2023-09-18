import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileItem = ({ title, iconName, linkTo, count, data, ...rest }) => {
  const navigation = useNavigation();
  return (
    <View className="flex-row py-3 items-center mx-5 justify-around" rest>
      <View className="rounded-full bg-orange-100 w-12 h-12 items-center justify-center">
        <FontAwesome name={iconName} size={30} color="#F9AC67" />
      </View>
      <View className="w-2/4">
        <Text className="text-black-400 font-medium text-xl">
          {title} ({count})
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(linkTo, { data: data })}
      >
        <View className="w-10 h-10 rounded bg-gray-300 justify-center items-center ">
          <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileItem;
