import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const ImageGallery = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      navigation.navigate(route.params.basePage, { id: route.params.id });
    }
  };

  useEffect(() => {
    (async () => {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status === "granted") {
        await pickImage();
      }
    })();
  }, []);

  useEffect(() => {
    if (image) {
      navigation.navigate(route.params.basePage, {
        id: route.params.id,
        uri: image,
      });
    }
  }, [image]);

  return <></>;
};

export default ImageGallery;
