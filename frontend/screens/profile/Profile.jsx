import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileItem from "../../components/ProfileItem";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { logout } = useAuth();
  const [userDetails, setUserDetails] = useState({});

  const settingsItems = [
    {
      name: "Donations",
      icon: "gift",
      linkTo: "UserDonations",
      count: userDetails.donationCount,
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
      count: userDetails.reviewCount,
    },
  ];
  const onSignOut = async () => {
    return await logout();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/users/me");
        setUserDetails(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
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
        <View className="bg-gray-400 w-20 h-20 mx-3 rounded-full items-center justify-center" />
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
        {settingsItems.map((item, index) => (
          <ProfileItem
            key={index}
            title={item.name}
            iconName={item.icon}
            linkTo={item.linkTo}
            count={item.count}
          />
        ))}
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
