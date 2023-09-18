import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const Review = ({ rating, id, message }) => {
  const [reviewerName, setReviewerName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  useEffect(() => {
    axios
      .get(` https://83a9-80-96-21-160.ngrok-free.app/users/${id}`)
      .then((response) => {
        setReviewerName(response.data.username);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(
        ` https://83a9-80-96-21-160.ngrok-free.app/users/${id}/profilepicture`
      )
      .then((response) => {
        setProfilePicture(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <View
      className="w-10/12 bg-gray-100 max-h-96 justify-around rounded-lg items-center py-4 mb-6"
      style={styles.shadow}
    >
      <View className="flex-row justify-between items-center w-full">
        <Image
          className="bg-gray-400 w-20 h-20 mx-3 rounded-full items-center justify-center"
          source={{
            uri: profilePicture,
          }}
        />
        <Text className="text-lg">{reviewerName}</Text>
        <View className="bg-gray-300 w-12 h-6 items-center justify-around rounded-md flex-row mr-5">
          <FontAwesome name="star" size={16} color="black" />
          <Text>{rating}</Text>
        </View>
      </View>
      <Text className="text-base mx-4 mt-6">{message}</Text>
    </View>
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

export default Review;
