import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Requirement = ({ name, description, objectId, reqId }) => {
  const navigation = useNavigation();
  const [donation, setDonation] = useState(null);
  const { authState } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (reqId !== null && reqId !== undefined) {
          const response = await axios.get(
            ` https://83a9-80-96-21-160.ngrok-free.app/objects/?object_id=${objectId}`
          );
          setDonation(response.data);
        }
      } catch (e) {
        console.log(e.request);
      }
    };
    fetchData();
  }, []);
  return (
    <TouchableOpacity
      className="w-11/12 bg-gray-100 max-h-96 rounded-lg items-center py-4 mb-6"
      style={styles.shadow}
      disabled={objectId === null}
      onPress={() =>
        navigation.navigate("DonationDetails", { id: objectId, isReq: true })
      }
    >
      <View className="flex-row items-center justify-evenly w-full">
        <View className="w-2/3 flex-column justify-between ml-2">
          <Text className="text-xl">{name}</Text>
          <Text className="text-base  mt-4">{description}</Text>
        </View>
        <View className="w-1/3">
          {objectId === null && authState.userType !== "organization" && (
            <TouchableOpacity
              style={[styles.shadow]}
              className="px-6 py-2 bg-red-400 rounded-md items-center mr-2"
              onPress={() =>
                navigation.navigate("AddDonation", {
                  isGoal: true,
                  reqId: reqId,
                })
              }
            >
              <Text className="text-base w-14 items-center">Donate</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {objectId !== null ? (
        <View className="mt-6 bg-green-200 rounded px-10">
          <Text className="text-xl">Donated </Text>
        </View>
      ) : (
        <View className="mt-6 bg-red-200 rounded px-10">
          <Text className="text-xl">Looking for donator...</Text>
        </View>
      )}
    </TouchableOpacity>
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

export default Requirement;
