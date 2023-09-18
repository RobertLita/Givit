import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";

const AddReviewModal = ({
  modalVisible,
  setModalVisible,
  reviewerId,
  reviewedId,
}) => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState(null);
  const [message, setMessage] = useState(null);

  const addReview = async () => {
    try {
      const response = await axios.post(
        " https://83a9-80-96-21-160.ngrok-free.app/reviews",
        {
          reviewerId: reviewerId,
          reviewedId: reviewedId,
          amount: amount,
          message: message,
        }
      );
    } catch (e) {
      console.log(e);
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
              name="message"
              value={message}
              placeholder={"You message review"}
              handleChange={setMessage}
              style={{ width: "90%" }}
            />
            <Picker
              selectedValue={amount}
              onValueChange={(itemValue, itemIndex) => setAmount(itemValue)}
              style={{
                width: "55%",
                borderWidth: 4,
                borderColor: "black",
              }}
            >
              <Picker.Item
                label="Amount for review:"
                value="NOTHING"
                style={{ color: "dimgray" }}
              />
              <Picker.Item label="1" value={1} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
              <Picker.Item label="5" value={5} />
            </Picker>
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
                addReview();
              }}
              className="w-1/2 items-center py-2 rounded my-2"
              style={{ backgroundColor: "#F9AC67" }}
            >
              <Text className="text-lg">Add review</Text>
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

export default AddReviewModal;
