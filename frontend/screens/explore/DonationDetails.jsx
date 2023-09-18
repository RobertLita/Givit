import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Carousel from "../../components/Carousel";
import Badge from "../../components/Badge";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ModalImage from "../../components/ModalImage";

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
  const route = useRoute();
  const navigation = useNavigation();
  const { authState } = useAuth();
  const [details, setDetails] = useState(null);
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [proof, setProof] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isReq, setIsReq] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (route !== undefined) {
          const response = await axios.get(
            ` https://83a9-80-96-21-160.ngrok-free.app/objects/${route.params.id}`
          );

          const user = await axios.get(
            ` https://83a9-80-96-21-160.ngrok-free.app/objects/${route.params.id}/donor`
          );

          if (response.data.proof !== null) {
            const image = await axios.get(
              ` https://83a9-80-96-21-160.ngrok-free.app/objects/${response.data.id}/proof`
            );
            setProof(image.data);
          }
          if (route.params !== undefined && route.params.uri !== undefined)
            setProof(route.params.uri);
          if (route.params !== undefined && route.params.isReq !== undefined)
            setIsReq(route.params.isReq);
          setDetails(response.data);
          setUsername(user.data.username);
          setRating(user.data.rating);
          setRefresh(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [route, refresh]);

  const deleteDonation = () => {
    try {
      const response = axios.delete(
        ` https://83a9-80-96-21-160.ngrok-free.app/objects/${route.params.id}`
      );
      navigation.navigate("Marketplace", { refresh: true });
    } catch (e) {
      console.log(e.request);
    }
  };

  const changeStatus = async (donationId, newStatus, proof) => {
    try {
      let organizationId = 0;
      if (newStatus === "DONATED" || newStatus === "RESERVED") {
        organizationId = authState.userId;
      } else {
        organizationId = null;
      }
      const response = await axios.patch(
        ` https://83a9-80-96-21-160.ngrok-free.app/objects/${donationId}`,
        {
          name: details.name,
          description: details.description,
          condition: details.condition,
          category: details.category,
          status: newStatus,
          date: details.date,
          proof: details.proof,
          isGoal: details.isGoal,
          donorId: details.donorId,
          organizationId: organizationId,
          id: donationId,
        }
      );
      if (response.status === 200) setRefresh(true);
      if (response.status === 200 && newStatus === "DONATED") {
        const formData = new FormData();
        formData.append("file", {
          uri: proof,
          name: "photo.jpg",
          type: "image/jpg",
        });
        const response = await axios.post(
          ` https://83a9-80-96-21-160.ngrok-free.app/objects/${details.id}/proof`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
    } catch (e) {
      console.log(e);
      console.log(e.request);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="justify-start items-center bg-white z-0"
    >
      <ModalImage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        basePage="DonationDetails"
        id={route.params.id}
      />
      {details !== null && (
        <>
          <ScrollView>
            <View className="h-[360]">
              <Carousel images={details.images} />
            </View>
            <View className="mt-8 w-full bg-gray-100 rounded-2xl justify-evenly h-[560] relative">
              {details.donorId == authState.userId &&
                details.status === "AVAILABLE" &&
                isReq === false && (
                  <>
                    <MaterialIcons
                      name="delete"
                      size={30}
                      color="slategray"
                      style={{ position: "absolute", top: 10, right: 10 }}
                      onPress={() => deleteDonation()}
                    />
                  </>
                )}
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
                <View className="items-center">
                  <Text className="text-lg ml-3 mr-3">
                    Donated by {username}
                  </Text>
                  <View className="bg-gray-300 w-12 h-6 items-center justify-around rounded-md flex-row">
                    <Ionicons name="md-star" size={16} color="black" />
                    <Text className="text-md">{rating}</Text>
                  </View>
                </View>
                <Text className="text-base ml-3 mr-3">{details.date}</Text>
              </View>
              {details.status !== "AVAILABLE" && (
                <View className="w-full items-center mt-3">
                  {proof === null &&
                    authState.userType === "organization" &&
                    isReq === false && (
                      <TouchableOpacity
                        className="border border-gray-500 w-11/12 h-36 justify-center items-center border-dashed"
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text className="text-lg text-gray-400">
                          + Add the proof
                        </Text>
                      </TouchableOpacity>
                    )}
                  {proof !== null && isReq === false && (
                    <View className="border border-gray-500 w-11/12 h-36 justify-center items-center border-dashed relative">
                      <Image
                        source={{ uri: proof }}
                        className="w-full h-full"
                      />
                      {details.proof === null && (
                        <Ionicons
                          name="close"
                          size={40}
                          color={"red"}
                          style={{ position: "absolute", top: 2, right: 2 }}
                          onPress={() => setProof(null)}
                        />
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
          </ScrollView>
          {authState.userType === "organization" && isReq === false && (
            <View className="w-full items-center bottom-2 flex-row justify-between px-4 py-2 bg-white h-14">
              {details.status === "AVAILABLE" ? (
                <TouchableOpacity
                  className="py-2 bg-red-400 rounded-md flex-row justify-center flex-grow"
                  style={styles.shadow}
                  onPress={() => changeStatus(details.id, "RESERVED")}
                >
                  <Text className="text-lg text-white">Reserve donation</Text>
                </TouchableOpacity>
              ) : details.status === "RESERVED" ? (
                <>
                  <TouchableOpacity
                    className="py-2 bg-red-400 rounded-md flex-row justify-center flex-grow mr-2"
                    style={styles.shadow}
                    onPress={() => changeStatus(details.id, "AVAILABLE")}
                  >
                    <Text className="text-base text-white">
                      Unreserve donation
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="py-2 bg-red-400 rounded-md flex-row justify-center flex-grow ml-2"
                    style={[
                      styles.shadow,
                      proof === null && {
                        opacity: 0.6,
                      },
                    ]}
                    disabled={proof === null}
                    onPress={() => changeStatus(details.id, "DONATED", proof)}
                  >
                    <Text className="text-base text-white">
                      Finish donation
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-grow ml-3 justify-center"
                    onPress={() => {
                      navigation.navigate("Chat", {
                        screen: "ChatPage",
                        params: {
                          myId: authState.userId,
                          otherId: details.donorId,
                          name: username,
                        },
                      });
                    }}
                  >
                    <Ionicons name={"chatbox"} size={40} color={"#F9AC67"} />
                  </TouchableOpacity>
                </>
              ) : (
                <></>
              )}
              {details.status === "DONATED" && (
                <View
                  className="py-2  rounded-md flex-row justify-center flex-grow items-center"
                  style={{ backgroundColor: "#F9AC67" }}
                  // onPress={() => navigation.navigate("Sign up")}
                >
                  <Text className="text-lg">
                    You donated this object! Congratulations!
                  </Text>
                </View>
              )}
            </View>
          )}
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
});

export default DonationDetails;
