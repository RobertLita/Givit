import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import ModalImage from "../../components/ModalImage";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const AddDonation = () => {
  const [imageArray, setImageArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCondition, setSelectedCondition] = useState();
  const route = useRoute();

  useEffect(() => {
    const params = route.params;
    if (
      params !== undefined &&
      !imageArray.includes(params.uri) &&
      params.uri !== null
    ) {
      setImageArray((imageArray) => [...imageArray, params.uri]);
    }
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <ModalImage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        basePage="AddDonation"
      />
      <Text className="font-bold text-3xl text-black ml-4 mb-6">
        New donation
      </Text>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          rowGap: 25,
          justifyContent: "center",
        }}
      >
        <View className="w-11/12 justify-around">
          <Text className="text-lg">Images</Text>
          <View className="flex-wrap flex-row items-center gap-x-2 gap-y-2 mt-2">
            {imageArray.map((image, index) => (
              <View
                key={index}
                className="border border-gray-500 w-24 h-24 justify-center items-center border-dashed relative"
              >
                <Image source={{ uri: image }} className="w-full h-full" />
                <Feather
                  name="x"
                  size={20}
                  color="red"
                  style={{ position: "absolute", top: 2, right: 2 }}
                  onPress={() =>
                    setImageArray((imageArray) =>
                      imageArray.filter((item) => item !== image)
                    )
                  }
                />
              </View>
            ))}
            {imageArray.length !== 6 && (
              <TouchableOpacity
                className="border border-gray-500 w-24 h-24 justify-center items-center border-dashed"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className="text-base text-gray-400">+ Add an image</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View className="w-11/12">
          <Input placeholder={"Your object title"} label="Title" />
        </View>
        <View className="w-11/12">
          <Input
            multiline={true}
            numberOfLines={4}
            placeholder={"Your object description"}
            label="Description"
            style={{ width: "100%" }}
          />
        </View>
        <View className="w-11/12">
          <Text className="text-lg mb-2">Category</Text>
          <View className="border border-gray-600 rounded">
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCategory(itemValue)
              }
              style={{
                borderWidth: 4,
                borderColor: "black",
              }}
            >
              <Picker.Item
                label="Select object category"
                value="NOTHING"
                style={{ color: "dimgray" }}
              />
              <Picker.Item label="Clothing" value="CLOTHING" />
              <Picker.Item label="Electronics" value="ELECTRONICS" />
              <Picker.Item label="Household" value="HOUSEHOLD" />
              <Picker.Item label="Toys" value="TOYS" />
              <Picker.Item label="Media" value="MEDIA" />
              <Picker.Item label="Sport" value="SPORT" />
              <Picker.Item label="School" value="SCHOOL" />
              <Picker.Item label="Personal" value="PERSONAL" />
            </Picker>
          </View>
        </View>
        <View className="w-11/12">
          <Text className="text-lg mb-2">Condition</Text>
          <View className="border border-gray-600 rounded">
            <Picker
              selectedValue={selectedCondition}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCondition(itemValue)
              }
              style={{
                borderWidth: 4,
                borderColor: "black",
              }}
            >
              <Picker.Item
                label="Select object condition"
                value="NOTHING"
                style={{ color: "dimgray" }}
              />
              <Picker.Item label="New" value="NEW" />
              <Picker.Item label="Very Good" value="VERY GOOD" />
              <Picker.Item label="Good" value="GOOD" />
              <Picker.Item label="Acceptable" value="ACCEPTABLE" />
            </Picker>
          </View>
          <View className="justify-center items-center my-10">
            <TouchableOpacity
              className="px-16 py-2 bg-red-400 rounded-md items-center"
              style={styles.shadow}
            >
              <Text className="text-white text-base">Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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

export default AddDonation;
