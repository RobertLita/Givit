import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import Carousel from "../../components/Carousel";
import Badge from "../../components/Badge";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const illustrations = [
  { id: 1, source: require("../../images/welcome1.jpg") },
  { id: 2, source: require("../../images/welcome2.jpg") },
  { id: 3, source: require("../../images/welcome3.jpg") },
];
const stars = {
  NEW: [1, 1, 1, 1, 1],
  "VERY GOOD": [1, 1, 1, 1, 0.5],
  GOOD: [1, 1, 1, 1, 0],
  ACCEPTABLE: [1, 1, 1, 0.5, 0],
};

const DonationDetails = () => {
  const [fav, setFav] = useState(false);
  const route = useRoute();
  const { id } = route.params;
  const category = "PERSONAL";
  const name = "Jucarie de plus";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dictum, tortor at fringilla volutpat, augue ante viverra purus, sit amet convallis lacus eros nec odio. ";
  const status = "AVAILABLE";
  const condition = "ACCEPTABLE";
  const username = "robert";
  const date = "2023-05-04";
  // carusel
  // titlu + heart
  // description
  // detalii
  // button de donate
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="justify-start items-center bg-white z-0"
    >
      <ScrollView>
        <View className="h-72">
          <Carousel images={illustrations} />
        </View>
        <View className="mt-8 w-full bg-gray-100 rounded-2xl justify-evenly mb-12 h-[420] relative">
          <MaterialIcons
            name="delete"
            size={30}
            color="slategray"
            style={{ position: "absolute", top: 10, right: 10 }}
          />
          <MaterialIcons
            name="edit"
            size={30}
            color="slategray"
            style={{ position: "absolute", top: 10, right: 65 }}
          />
          <Text className="text-2xl ml-3 mt-3">{name}</Text>
          <View className="items-center w-full">
            <Badge label={category} />
          </View>
          <Text className="text-md ml-3 mr-3">{description}</Text>
          <View className="flex-row ml-3 mr-3 items-center">
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
            <Text className="text-gray-500 ml-3 text-base">({condition})</Text>
          </View>

          <View className="flex-row items-center justify-evenly">
            {status === "AVAILABLE" ? (
              <View className="py-2 px-3 border justify-center items-center rounded-lg border-gray-500">
                <Text>AVAILABLE</Text>
              </View>
            ) : (
              <Text>AVAILABLE</Text>
            )}

            <MaterialIcons name="horizontal-rule" size={24} color="black" />
            {status === "RESERVED" ? (
              <View className="py-2 px-3 border justify-center items-center rounded-lg border-gray-500">
                <Text>RESERVED</Text>
              </View>
            ) : (
              <Text>RESERVED</Text>
            )}
            <MaterialIcons name="horizontal-rule" size={24} color="black" />
            {status === "DONATED" ? (
              <View className="py-2 px-3 border justify-center items-center rounded-lg border-gray-500">
                <Text>DONATED</Text>
              </View>
            ) : (
              <Text>DONATED</Text>
            )}
          </View>

          <View className="justify-around items-center flex-row">
            <Text className="text-lg ml-3 mr-3">Donated by {username}</Text>
            <Text className="text-base ml-3 mr-3">{date}</Text>
          </View>
        </View>
      </ScrollView>

      <View
        className="w-full items-center absolute bottom-0 flex-row justify-between px-4 py-2 bg-white"
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          onPress={() => {
            setFav(!fav);
          }}
          className="py-3 px-4 border justify-center items-center rounded-lg mr-4 border-gray-500"
        >
          {!fav ? (
            <AntDesign name="hearto" size={20} color="black" />
          ) : (
            <AntDesign name="heart" size={20} color="red" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="py-2 bg-red-400 rounded-md flex-row justify-center flex-grow"
          style={styles.shadow}
          // onPress={() => navigation.navigate("Sign up")}
        >
          <Text className="text-base text-white">Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  // contentContainer: {
  //   position: "relative",
  //   justifyContent: "center",
  // },
});

export default DonationDetails;
