import { View, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

const Donation = ({ name, status, condition, image, username, ...rest }) => {
  return (
    <View style={{ flex: 1 }} {...rest}>
      <Image
        source={require("../images/welcome2.jpg")}
        style={{ flex: 1, width: "100%", height: 50 }}
      />
      <View style={{ flex: 1 }}>
        <View
          className="justify-between flex-row items-center"
          style={{ flex: 2 }}
        >
          <Text className="text-lg ml-2">{name}</Text>
          <AntDesign
            name="hearto"
            size={20}
            color="black"
            style={{ marginRight: 6 }}
          />
        </View>
        <View style={{ flex: 3 }} className="justify-evenly items-center">
          <Text>{condition}</Text>
          <Text>{username}</Text>
        </View>
      </View>
    </View>
  );
};

export default Donation;
