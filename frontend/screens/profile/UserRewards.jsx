import { Text, SafeAreaView, FlatList, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Reward from "../../components/Reward";
import ListHeader from "../../components/ListHeader";

const UserRewards = () => {
  const [rewards, setRewards] = useState([]);
  const route = useRoute();

  useEffect(() => {
    const params = route.params;
    if (params !== undefined && params.data !== null) {
      setRewards(params.data);
    }
  }, [route]);

  console.log(rewards);
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      {rewards !== undefined && rewards.length == 0 ? (
        <View className="justify-center items-center">
          <Text className="text-xl">No rewards!</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            alignItems: "center",
          }}
          data={rewards}
          renderItem={({ item, index }) => (
            <Reward
              key={index}
              title={item.reward.name}
              description={item.reward.description}
              amount={item.reward.requiredDonations}
            />
          )}
          ListHeaderComponent={<ListHeader title="My rewards" />}
        />
      )}
    </SafeAreaView>
  );
};

export default UserRewards;
