import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";

const Goal = ({ title, description, id }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` https://83a9-80-96-21-160.ngrok-free.app/goals/status/${id}`
        );
        setStatus(response.data);
      } catch (e) {
        console.log(e.request);
      }
    };
    fetchData();
  }, [isFocused]);
  return (
    <View className="w-screen justify-center items-center">
      <TouchableOpacity
        className="w-10/12 bg-gray-100 max-h-96 justify-around rounded-lg items-center py-4 mb-6"
        onPress={() => navigation.navigate("GoalDetails", { id, title })}
        style={styles.shadow}
      >
        <View className="mx-2">
          <Text className="text-2xl mb-3">{title}</Text>
          <Text className="text-base">{description}</Text>
        </View>
        {status === true ? (
          <View className="mt-6 bg-green-200 rounded px-10">
            <Text className="text-base">Completed</Text>
          </View>
        ) : (
          <View className="mt-6 bg-red-200 rounded px-10">
            <Text className="text-base">Uncompleted</Text>
          </View>
        )}
      </TouchableOpacity>
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

export default Goal;
