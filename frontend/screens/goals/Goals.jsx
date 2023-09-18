import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Goal from "./Goal";
import ListHeader from "../../components/ListHeader";
import AddGoalModal from "../../components/AddGoalModal";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Goals = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [goals, setGoals] = useState([]);
  const { authState } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` https://83a9-80-96-21-160.ngrok-free.app/goals/?skip=0&limit=100`
        );
        setGoals(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white items-center">
      <AddGoalModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        type="Goal"
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <FlatList
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flexGrow: 1,
          width: 350,
          alignItems: "center",
        }}
        data={goals}
        renderItem={({ item, index }) => (
          <Goal
            key={index}
            title={item.name}
            description={item.description}
            id={item.id}
          />
        )}
        ListHeaderComponent={<ListHeader title="Goals" />}
      />
      {authState.userType === "organization" && (
        <TouchableOpacity
          className="absolute bottom-3 right-3"
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Ionicons name={"add-circle"} size={60} color={"#F9AC67"} />
        </TouchableOpacity>
      )}
      {goals.length === 0 && (
        <View className="justify-center items-center absolute top-80 left-0 right-0">
          <Text className="text-xl">No goals found!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Goals;
