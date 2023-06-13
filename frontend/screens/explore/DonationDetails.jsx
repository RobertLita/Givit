import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
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
  const [details, setDetails] = useState(null);
  const [username, setUsername] = useState("");
  console.log(details !== null);
  // console.log(route);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (route !== undefined) {
          console.log(route);
          const response = await axios.get(
            `http://10.0.2.2:8000/objects/${route.params.id}`
          );

          const user = await axios.get(
            `http://10.0.2.2:8000/objects/${route.params.id}/donor`
          );
          setDetails(response.data);
          setUsername(user.data.username);
        }
      } catch (e) {
        console.log(e.request);
      }
    };
    fetchData();
  }, [route]);
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="justify-start items-center bg-white z-0"
    >
      {details !== null && (
        <>
          <ScrollView>
            <View className="h-[360]">
              <Carousel images={details.images} />
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
              <Text className="text-2xl ml-3 mt-3">{details.name}</Text>
              <View className="items-center w-full">
                <Badge label={details.category} />
              </View>
              <Text className="text-base ml-3 mr-3">{details.description}</Text>
              <View className="flex-row ml-3 mr-3 items-center">
                <View className="flex-row items-center">
                  {details &&
                    stars[details.condition].map((star, index) => {
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
                <Text className="text-gray-500 ml-3 text-base">
                  ({details.condition})
                </Text>
              </View>

              <View className="flex-row items-center justify-evenly">
                {details.status === "AVAILABLE" ? (
                  <View className="py-2 px-3 border justify-center items-center rounded-lg border-gray-500">
                    <Text>AVAILABLE</Text>
                  </View>
                ) : (
                  <Text>AVAILABLE</Text>
                )}

                <MaterialIcons name="horizontal-rule" size={24} color="black" />
                {details.status === "RESERVED" ? (
                  <View className="py-2 px-3 border justify-center items-center rounded-lg border-gray-500">
                    <Text>RESERVED</Text>
                  </View>
                ) : (
                  <Text>RESERVED</Text>
                )}
                <MaterialIcons name="horizontal-rule" size={24} color="black" />
                {details.status === "DONATED" ? (
                  <View className="py-2 px-3 border justify-center items-center rounded-lg border-gray-500">
                    <Text>DONATED</Text>
                  </View>
                ) : (
                  <Text>DONATED</Text>
                )}
              </View>

              <View className="justify-around items-center flex-row">
                <Text className="text-lg ml-3 mr-3">Donated by {username}</Text>
                <Text className="text-base ml-3 mr-3">{details.date}</Text>
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
        </>
      )}
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
