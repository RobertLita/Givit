import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import ModalImage from "../../components/ModalImage";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import jwtDecode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";

const addSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Minimum 3 characters!")
    .max(25, "Maximum 25 characters!")
    .required("Title is required!"),
  description: yup
    .string()
    .min(5, "Minimum 5 characters!")
    .max(100, "Maximum 100 characters!")
    .required("Description is required!"),
});

const AddDonation = () => {
  const navigation = useNavigation();
  const { authState } = useAuth();
  const [id, setId] = useState(0);
  const [imageArray, setImageArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCondition, setSelectedCondition] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const route = useRoute();

  // console.log(imageArray);
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

  const postObject = async (title, description, category, condition) => {
    setLoading(true);
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const response = await axios.post("http://10.0.2.2:8000/objects", {
        name: title,
        description,
        condition,
        category,
        status: "AVAILABLE",
        date: formattedDate,
        donorId: jwtDecode(authState.token).sub,
        organizationId: 0,
      });
      setId(response.data.id);
    } catch (error) {
      console.log(error.request);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      for (const image of imageArray) {
        try {
          const formData = new FormData();
          formData.append("file", {
            uri: image,
            name: "photo.jpg",
            type: "image/jpg",
          });
          const response = await axios.post(
            `http://10.0.2.2:8000/objects/${id}/image`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } catch (e) {
          console.log(e.response);
        }
      }
      if (id !== 0) navigation.navigate("Success");
    };
    fetchData();
  }, [id]);

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
        <Formik
          validationSchema={addSchema}
          initialValues={{ title: "", description: "" }}
          onSubmit={(values) =>
            postObject(
              values.title,
              values.description,
              selectedCategory,
              selectedCondition
            )
          }
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <View className="w-11/12 justify-around">
                <Text className="text-lg">Images</Text>
                <View className="flex-wrap flex-row items-center gap-x-2 gap-y-2 mt-2">
                  {imageArray.map((image, index) => (
                    <View
                      key={index}
                      className="border border-gray-500 w-24 h-24 justify-center items-center border-dashed relative"
                    >
                      <Image
                        source={{ uri: image }}
                        className="w-full h-full"
                      />
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
                      <Text className="text-base text-gray-400">
                        + Add an image
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View className="w-11/12">
                <Input
                  placeholder={"Your object title"}
                  name="title"
                  label="Title*"
                  value={values.title}
                  handleChange={handleChange("title")}
                  error={errors.title && touched.title ? errors.title : ""}
                  handleBlur={handleBlur("title")}
                  style={{ width: "100%" }}
                />
              </View>
              <View className="w-11/12">
                <Input
                  name="description"
                  multiline={true}
                  numberOfLines={4}
                  placeholder={"Your object description"}
                  value={values.description}
                  handleChange={handleChange("description")}
                  handleBlur={handleBlur("description")}
                  label="Description*"
                  error={
                    errors.description && touched.description
                      ? errors.description
                      : ""
                  }
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
                  {!loading ? (
                    <TouchableOpacity
                      className="px-16 py-2 bg-red-400 rounded-md items-center"
                      style={styles.shadow}
                      onPress={handleSubmit}
                      disabled={!isValid}
                    >
                      <Text className="text-white text-base">Create</Text>
                    </TouchableOpacity>
                  ) : (
                    <ActivityIndicator size="large" color="#F9AC67" />
                  )}
                </View>
                {error !== "" && (
                  <View className="bg-red-200 rounded w-3/4 h-8 items-center mt-4 justify-center">
                    <Text className="text-red-900 text-lg">{error}</Text>
                  </View>
                )}
              </View>
            </>
          )}
        </Formik>
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
