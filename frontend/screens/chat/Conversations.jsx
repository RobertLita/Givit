import { View, Text, SafeAreaView, FlatList } from "react-native";
import { useAuth } from "../../context/AuthContext";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Chatter from "../../components/Chatter";
import ListHeader from "../../components/ListHeader";

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const { authState } = useAuth();
  //   console.log(conversations);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/chat/chatters/${jwtDecode(authState.token).sub}`
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
      {conversations === [] ? (
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
                myId={jwtDecode(authState.token).sub}
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
