import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileItem from "../../components/ProfileItem";

const Profile = () => {
  const settingsItems = [
    {
      name: "Donations",
      icon: "gift",
      linkTo: "UserDonations",
    },
    {
      name: "Reviews",
      icon: "sticky-note-o",
      linkTo: "UserReviews",
    },
    {
      name: "Rewards",
      icon: "trophy",
      linkTo: "UserRewards",
    },
  ];
  // fetch details from current user
  const username = "lita.robert";
  const type = "donor";
  const donationCount = 10;
  const rating = 4.7;
  const reviewCount = 14;
  const rewards = [];

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <View className="justify-between w-screen items-center flex-row">
        <View className="justify-center items-center">
          <Text className="font-bold text-3xl text-black ml-3">{username}</Text>
          <View className="bg-gray-300 w-12 h-6 items-center justify-around rounded-md flex-row">
            <FontAwesome name="star" size={16} color="black" />
            <Text className="text-md">{rating}</Text>
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
          />
        ))}
      </View>

      <View className="justify-center w-full items-center" style={{ flex: 1 }}>
        <TouchableOpacity
          className="px-12 py-3 bg-red-400 rounded-md flex-row w-1/2"
          style={styles.shadow}
          // onPress={() => navigation.navigate("Sign up")}
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
