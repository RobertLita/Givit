import { SafeAreaView, FlatList, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import Message from "../../components/Message";
import Input from "../../components/Input";
import { useRoute } from "@react-navigation/native";

const Chat = () => {
  const [myId, setMyId] = useState(null);
  const [otherId, setOtherId] = useState(null);
  const [websckt, setWebsckt] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  console.log(messages);
  useEffect(() => {
    const params = route.params;

    if (
      params !== undefined &&
      params.myId !== null &&
      params.otherId !== null
    ) {
      setMyId(params.myId);
      setOtherId(params.otherId);
    }
  }, [route]);

  useEffect(() => {
    if (myId && otherId) {
      console.log("ceva");
      const url = `ws://10.0.2.2:8000/ws/${myId}/${otherId}`;
      const ws = new WebSocket(url);
      ws.onmessage = (e) => {
        console.log(e);
        setMessages((prevState) => [...prevState, e.data]);
      };

      setWebsckt(ws);
      return () => ws.close();
    }
  }, [myId, otherId]);

  const sendMessage = () => {
    if (message !== "" && websckt) {
      websckt.send(message);

      websckt.onmessage = (e) => {
        setMessages((prevState) => [...prevState, e.data]);
      };
      setMessage("");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <FlatList
        data={messages}
        renderItem={({ item, index }) => {
          if (item.split(":")[0] == myId)
            return <Message key={index} message={item.split(":")[1]} you />;
          else return <Message key={index} message={item.split(":")[1]} />;
        }}
      />
      <View className="items-end w-full flex-row justify-center absolute bottom-4">
        <View className="w-10/12 ">
          <Input
            value={message}
            numberOfLines={3}
            handleChange={setMessage}
            className="w-10/12 rounded-lg"
          />
        </View>
        <TouchableOpacity
          onPress={sendMessage}
          className="w-10 h-10 rounded bg-red-400 ml-3 items-center justify-center"
        >
          <Feather name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
