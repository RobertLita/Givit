import { View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import Badge from "./Badge";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const stars = {
  NEW: [1, 1, 1, 1, 1],
  "VERY GOOD": [1, 1, 1, 1, 0.5],
  GOOD: [1, 1, 1, 1, 0],
  ACCEPTABLE: [1, 1, 1, 0.5, 0],
};

const Donation = ({
  name,
  status,
  condition,
  image,
  username,
  category,
  id,
  date,
  ...rest
}) => {
  const [fav, setFav] = useState(false);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      {...rest}
      onPress={() => navigation.navigate("DonationDetails", { id })}
    >
      <Image
        source={require("../images/welcome2.jpg")}
        style={{ width: "40%", height: "100%" }}
      />
      <View style={{ flex: 1 }}>
        <View className="flex-row justify-between mt-3" style={{ flex: 1 }}>
          <Badge label={category} />
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
        <View className="justify-center" style={{ flex: 3 }}>
          <Text className="text-xl ml-4">{name}</Text>
        </View>
        <View style={{ flex: 4 }} className="justify-evenly ml-4">
          <View>
            <View className="flex-row items-center">
              {stars[condition].map((star, index) => {
                if (star === 1) {
                  // full star
                  return (
                    <MaterialIcons
                      name="star"
                      size={30}
                      color="#F9AC67"
                      key={index}
                    />
                  );
                } else if (star === 0.5) {
                  // half star
                  return (
                    <MaterialIcons
                      name="star-half"
                      size={30}
                      color="#F9AC67"
                      key={index}
                    />
                  );
                } else {
                  // empty star
                  return (
                    <MaterialIcons
                      name="star-outline"
                      size={30}
                      color="#F9AC67"
                      key={index}
                    />
                  );
                }
              })}
            </View>
            <Text className="text-gray-500 ml-3">({condition})</Text>
          </View>

          <Text>Status {status}</Text>
        </View>
        <View className="justify-center items-center" style={{ flex: 1 }}>
          <Text className="text-gray-700">{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Donation;
