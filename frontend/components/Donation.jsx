import { View, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import Badge from "./Badge";
import { FontAwesome } from "@expo/vector-icons";

const Donation = ({ name, status, condition, image, username, ...rest }) => {
  const stars = {
    NEW: [1, 1, 1, 1, 1],
    "VERY GOOD": [1, 1, 1, 1, 0.5],
    GOOD: [1, 1, 1, 1, 0],
    ACCEPTABLE: [1, 1, 1, 0.5, 0],
  };
  const [fav, setFav] = useState(false);
  return (
    <View style={{ flex: 1 }} {...rest}>
      <Image
        source={require("../images/welcome2.jpg")}
        style={{ width: "40%", height: "100%" }}
      />
      <View style={{ flex: 1 }}>
        <View className="flex-row justify-between mt-3" style={{ flex: 1 }}>
          <Badge label="CLOTHING" />
          {!fav ? (
            <AntDesign
              name="hearto"
              size={20}
              color="black"
              style={{ marginRight: 6 }}
              onPress={() => {
                setFav(true);
              }}
            />
          ) : (
            <AntDesign
              name="heart"
              size={20}
              color="red"
              style={{ marginRight: 6 }}
              onPress={() => {
                setFav(false);
              }}
            />
          )}
        </View>
        <View className="justify-center items-center" style={{ flex: 3 }}>
          <Text className="text-xl ml-2">{name}</Text>
        </View>
        <View style={{ flex: 4 }} className="justify-evenly ml-3">
          <View>
            <View className="flex-row items-center">
              {stars[condition].map((star, index) => {
                if (star === 1) {
                  // full star
                  return <FontAwesome name="star" size={24} color="#F9AC67" />;
                } else if (star === 0.5) {
                  // half star
                  return (
                    <FontAwesome
                      name="star-half-empty"
                      size={24}
                      color="#F9AC67"
                    />
                  );
                } else {
                  // empty star
                  return (
                    <FontAwesome name="star-o" size={24} color="#F9AC67" />
                  );
                }
              })}
            </View>
            <Text className="text-gray-700 ml-3">({condition})</Text>
          </View>

          <Text>Donated by: {username}</Text>
        </View>
        <View className="justify-center items-center" style={{ flex: 1 }}>
          <Text className="text-gray-700">2023-05-04</Text>
        </View>
      </View>
    </View>
  );
};

export default Donation;
