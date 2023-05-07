import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useState, useEffect, useRef } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CameraView = () => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      requestPermission();
    })();
  }, []);
  // if (!permission) ...

  // if (!permission.granted) ...

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const toggleFlashMode = () => {
    setFlash((current) =>
      current === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const dataImage = await cameraRef.current.takePictureAsync();
        console.log(dataImage);
        setImage(dataImage.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {image ? (
        <>
          <Image
            source={{ uri: image }}
            style={{ flex: 1 }}
            className="relative"
          />
          <View className="absolute h-20 w-full bg-trasparent bottom-4 items-center flex-row justify-between px-6">
            <TouchableOpacity onPress={takePicture} className="items-center">
              <Ionicons name="checkmark" size={30} color="honeydew" />
              <Text className="text-lg text-white">Add Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setImage(null)}
              className="items-center"
            >
              <Ionicons name="reload" size={30} color="honeydew" />
              <Text className="text-lg text-white">Re-take</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Camera
            type={type}
            flashMode={flash}
            ref={cameraRef}
            style={{ flex: 1 }}
            ratio="16:9"
            className="relative"
          />
          <View className="absolute h-20 w-full bg-trasparent bottom-4 items-center flex-row justify-between px-6">
            {flash === Camera.Constants.FlashMode.off ? (
              <TouchableOpacity onPress={toggleFlashMode}>
                <Ionicons name="flash" size={30} color="honeydew" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={toggleFlashMode}>
                <Ionicons name="flash-off-sharp" size={30} color="honeydew" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={takePicture}>
              <Ionicons name="gift-outline" size={60} color="#F9AC67" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraType}>
              <Ionicons name="md-camera-reverse" size={30} color="honeydew" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CameraView;
