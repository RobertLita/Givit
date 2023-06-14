import { View, Text, SafeAreaView } from "react-native";
import React from "react";

const Success = () => {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="bg-white items-center justify-center"
    >
      <View className="bg-green-200 rounded w-3/4 h-20 items-center mt-4 justify-center">
        <Text className="text-green-900 text-lg">
          Cool! You've just added a new donation!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Success;
