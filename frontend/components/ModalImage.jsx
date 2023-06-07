import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const ModalImage = ({ modalVisible, setModalVisible, basePage }) => {
  const navigation = useNavigation();
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
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("ImageGallery", { basePage: basePage });
              }}
              className="w-1/2 items-center py-2 rounded my-2 mt-4"
              style={{ backgroundColor: "#F9AC67" }}
            >
              <Text className="text-lg">Choose from library</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("CameraView");
              }}
              className="w-1/2 items-center py-2 rounded my-2"
              style={{ backgroundColor: "#F9AC67" }}
            >
              <Text className="text-lg">Take a photo</Text>
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

export default ModalImage;
