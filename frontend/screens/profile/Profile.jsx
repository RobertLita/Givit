import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileItem from "../../components/ProfileItem";
import { useAuth } from "../../context/AuthContext";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import ModalImage from "../../components/ModalImage";

const Profile = () => {
  const { logout, authState } = useAuth();
  const route = useRoute();
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [donationCount, setDonationCount] = useState(0);

  const settingsItems = [
    {
      name: "Donations",
      icon: "gift",
      linkTo: "UserDonations",
      count: donationCount,
    },
    {
      name: "Reviews",
      icon: "sticky-note-o",
      linkTo: "UserReviews",
      count: userDetails.reviewCount,
    },
    {
      name: "Rewards",
      icon: "trophy",
      linkTo: "UserRewards",
      count: userDetails.rewardCount,
    },
  ];
  const onSignOut = async () => {
    return await logout();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          " https://83a9-80-96-21-160.ngrok-free.app/users/me"
        );
        const image = await axios.get(
          " https://83a9-80-96-21-160.ngrok-free.app/users/profilepicture"
        );
        setProfileImage(image.data);
        setUserDetails(response.data);
        if (authState.userType === "donor")
          setDonationCount(response.data.donor_donations.length);
        else setDonationCount(response.data.organization_donations.length);
      } catch (e) {
        console.log(e.request);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updatePhoto = async () => {
      const params = route.params;
      if (params !== undefined && params.uri !== null) {
        try {
          const formData = new FormData();
          formData.append("file", {
            uri: params.uri,
            name: "photo.jpg",
            type: "image/jpg",
          });
          const response = await axios.post(
            " https://83a9-80-96-21-160.ngrok-free.app/users/profilepicture",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status === 200) setProfileImage(params.uri);
        } catch (e) {
          console.log(e);
        }
      }
    };
    updatePhoto();
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <ModalImage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        basePage="Profile"
      />
      <View className="justify-between w-screen items-center flex-row">
        <View className="justify-center items-center ml-4">
          <Text className="font-bold text-3xl text-black ">
            {userDetails.username}
          </Text>
          <View className="bg-gray-300 w-12 h-6 items-center justify-around rounded-md flex-row">
            <FontAwesome name="star" size={16} color="black" />
            <Text className="text-md">{userDetails.rating}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Image
            className="w-20 h-20 mx-3 rounded-full items-center justify-center"
            source={{ uri: profileImage }}
          />
        </TouchableOpacity>
      </View>
      <View className="items-center">
        <View
          className="w-11/12 mt-3"
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 2,
          }}
        />
      </View>

      <View className="w-full mt-4 justify-evenly" style={{ flex: 3 }}>
        {settingsItems.map((item, index) => {
          if (item.name === "Donations") {
            if (authState.userType === "donor")
              return (
                <ProfileItem
                  key={index}
                  title={item.name}
                  iconName={item.icon}
                  linkTo={item.linkTo}
                  data={userDetails.donor_donations}
                  count={item.count}
                />
              );
            else
              return (
                <ProfileItem
                  key={index}
                  title={item.name}
                  iconName={item.icon}
                  linkTo={item.linkTo}
                  data={userDetails.organization_donations}
                  count={item.count}
                />
              );
          } else
            return (
              <ProfileItem
                key={index}
                title={item.name}
                iconName={item.icon}
                linkTo={item.linkTo}
                data={userDetails[item.name.toLowerCase()]}
                count={item.count}
              />
            );
        })}
      </View>

      <View className="justify-center w-full items-center" style={{ flex: 1 }}>
        <TouchableOpacity
          className="px-12 py-3 bg-red-400 rounded-md flex-row w-1/2"
          style={styles.shadow}
          onPress={() => onSignOut()}
        >
          <MaterialIcons
            name="exit-to-app"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text className="text-base text-white">Sign out</Text>
        </TouchableOpacity>
      </View>
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

export default Profile;
