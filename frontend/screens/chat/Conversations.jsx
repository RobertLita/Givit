import { View, Text, SafeAreaView, FlatList } from "react-native";
import { useAuth } from "../../context/AuthContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Chatter from "../../components/Chatter";
import ListHeader from "../../components/ListHeader";

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const { authState } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` https://83a9-80-96-21-160.ngrok-free.app/chat/chatters/${authState.userId}`
        );
        setConversations(response.data);
      } catch (e) {
        console.log(e.request);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      {conversations.length === 0 ? (
        <View className="justify-center items-center">
          <Text className="text-xl">No conversations!</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{
            alignItems: "center",
          }}
          data={conversations}
          renderItem={({ item, index }) => {
            return (
              <Chatter
                key={index}
                name={item[1]}
                myId={authState.userId}
                otherId={item[0]}
              />
            );
          }}
          ListHeaderComponent={<ListHeader title="My chats" />}
        />
      )}
    </SafeAreaView>
  );
};

export default Conversations;
