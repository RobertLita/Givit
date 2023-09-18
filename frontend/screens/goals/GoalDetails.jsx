import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import Requirement from "../../components/Requirement";
import ListHeader from "../../components/ListHeader";
import { useAuth } from "../../context/AuthContext";
import AddGoalModal from "../../components/AddGoalModal";
import axios from "axios";

const GoalDetails = () => {
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { authState } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const params = route.params;
      try {
        if (params !== undefined && params.id !== undefined) {
          setId(params.id);
          setTitle(params.title);
          const response = await axios.get(
            ` https://83a9-80-96-21-160.ngrok-free.app/requirements/?goalId=${params.id}&skip=0&limit=100`
          );
          setRequirements(response.data);
        }
      } catch (e) {
        console.log(e.request);
      }
    };
    fetchData();
  }, [route, refresh]);

  return (
    <SafeAreaView className="bg-white items-center " style={{ flex: 1 }}>
      <AddGoalModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        type={"Requirement"}
        refresh={refresh}
        setRefresh={setRefresh}
        id={id}
      />
      <FlatList
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flexGrow: 1,
          width: 350,
          alignItems: "center",
        }}
        data={requirements}
        renderItem={({ item, index }) => (
          <Requirement
            key={index}
            name={item.name}
            description={item.description}
            objectId={item.objectId}
            reqId={item.id}
          />
        )}
        ListHeaderComponent={<ListHeader title={title} />}
      />
      {authState.userType === "organization" && (
        <TouchableOpacity
          className="absolute bottom-3 right-3"
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Ionicons name={"add-circle"} size={60} color={"#F9AC67"} />
        </TouchableOpacity>
      )}
      {requirements.length === 0 && (
        <View className="justify-center items-center absolute top-80 left-0 right-0">
          <Text className="text-xl">No requirements found!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default GoalDetails;
