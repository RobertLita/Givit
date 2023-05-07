import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Input from "../../components/Input";

const AddDonation = () => {
  const [imageArray, setImageArray] = useState([]);
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <Text className="font-bold text-3xl text-black ml-4 mb-6">
        New donation
      </Text>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "black",
          alignItems: "center",
          rowGap: 12,
          justifyContent: "center",
        }}
      >
        <View className="w-11/12 justify-between h-64">
          <Text className="text-lg">Images</Text>
          <View className="flex-wrap flex-row items-center gap-x-2 gap-y-2">
            <TouchableOpacity className="border border-gray-500 w-24 h-24 justify-center items-center border-dashed">
              <Text className="text-base text-gray-400">+ Add an image</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-500 w-24 h-24 justify-center items-center border-dashed">
              <Text className="text-base text-gray-400">+ Add an image</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-500 w-24 h-24 justify-center items-center border-dashed">
              <Text className="text-base text-gray-400">+ Add an image</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-500 w-24 h-24 justify-center items-center border-dashed">
              <Text className="text-base text-gray-400">+ Add an image</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-11/12">
          <Text className="text-lg mb-2">Title</Text>
          <Input />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddDonation;
