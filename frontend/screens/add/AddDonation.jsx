import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import { Picker } from "@react-native-picker/picker";

const AddDonation = () => {
  const navigation = useNavigation();
  const [imageArray, setImageArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCondition, setSelectedCondition] = useState();
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
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
        <View className="w-11/12 justify-around h-64">
          <Text className="text-lg">Images</Text>
          <View className="flex-wrap flex-row items-center gap-x-2 gap-y-2">
            <TouchableOpacity
              className="border border-gray-500 w-24 h-24 justify-center items-center border-dashed"
              onPress={() => navigation.navigate("CameraView")}
            >
              <Text className="text-base text-gray-400">+ Add an image</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-500 w-24 h-24 justify-center items-center border-dashed">
              <Text className="text-base text-gray-400">+ Add an image</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-500 w-24 h-24 justify-center items-center border-dashed">
              <Text className="text-base text-gray-400">+ Add an image</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-500 w-24 h-24 justify-center items-center border-dashed">
              <Text className="text-base text-gray-400">+ Add an image</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-11/12">
          <Text className="text-lg mb-2">Title</Text>
          <Input placeholder={"Your object title"} />
        </View>
        <View className="w-11/12">
          <Text className="text-lg mb-2">Description</Text>
          <Input
            multiline={true}
            numberOfLines={4}
            placeholder={"Your object description"}
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
