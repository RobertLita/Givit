import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const Welcome = () => {
  return (
    <View>
      <Image />

      <TouchableOpacity>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
