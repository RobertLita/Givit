import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";

const AddGoalModal = ({
  modalVisible,
  setModalVisible,
  type,
  refresh,
  setRefresh,
  id,
}) => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const addEnitity = async () => {
    try {
      let url, body;
      if (type === "Goal") {
        url = " https://83a9-80-96-21-160.ngrok-free.app/goals";
        body = {
          name: name,
          description: description,
        };
      } else {
        url = " https://83a9-80-96-21-160.ngrok-free.app/requirements";
        body = {
          name: name,
          description: description,
          goalId: id,
        };
      }
      const response = await axios.post(url, body);
      if (response.status === 200) {
        setRefresh(!refresh);
        setDescription(null);
        setName(null);
      }
    } catch (e) {
      console.log(e.request);
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          className="absolute bottom-[50] left-0 right-0 bg-gray-100"
          style={styles.shadow}
        >
          <View className="w-full items-center rounded justify-between">
            <Input
              name="title"
              value={name}
              placeholder={`${type} title`}
              handleChange={setName}
              style={{ width: "90%" }}
            />
            <Input
              name="description"
              value={description}
              placeholder={`${type} description`}
              handleChange={setDescription}
              multiline
              numberOfLines={2}
              style={{ width: "90%" }}
            />
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
                addEnitity();
              }}
              className="w-1/2 items-center py-2 rounded my-2"
              style={{ backgroundColor: "#F9AC67" }}
            >
              <Text className="text-lg">Add {type}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              className="bg-red-400 px-10 items-center py-2 rounded mb-4"
            >
              <Text className="text-base">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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

export default AddGoalModal;
