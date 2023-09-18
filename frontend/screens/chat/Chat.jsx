import {
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import Message from "../../components/Message";
import Input from "../../components/Input";
import { useRoute } from "@react-navigation/native";
import ListHeader from "../../components/ListHeader";
import axios from "axios";
import AddReviewModal from "../../components/AddReviewModal";

const Chat = () => {
  const [myId, setMyId] = useState(null);
  const [canReview, setCanReview] = useState(null);
  const [otherId, setOtherId] = useState(null);
  const [name, setName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [websckt, setWebsckt] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const route = useRoute();

  useEffect(() => {
    const params = route.params;

    if (
      params !== undefined &&
      params.myId !== null &&
      params.otherId !== null
    ) {
      setMyId(params.myId);
      setOtherId(params.otherId);
      setName(params.name);
      axios
        .get(
          ` https://83a9-80-96-21-160.ngrok-free.app/reviews/${params.myId}/${params.otherId}`
        )
        .then((response) => {
          setCanReview(!response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [route]);

  useEffect(() => {
    if (myId && otherId) {
      const url = `ws://83a9-80-96-21-160.ngrok-free.app/ws/${myId}/${otherId}`;
      const ws = new WebSocket(url);
      ws.onmessage = (e) => {
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
      <AddReviewModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        reviewerId={myId}
        reviewedId={otherId}
      />
      <FlatList
        style={{ flex: 1 }}
        data={messages}
        renderItem={({ item, index }) => {
          if (item.split(":")[0] == myId)
            return <Message key={index} message={item.split(":")[1]} you />;
          else return <Message key={index} message={item.split(":")[1]} />;
        }}
        ListHeaderComponent={
          <>
            <ListHeader title={name} />
            <TouchableOpacity
              className="absolute right-4 top-0 rounded-full bg-orange-100 w-12 h-12 items-center justify-center"
              style={
                canReview === false && {
                  opacity: 0.6,
                }
              }
              disabled={canReview === false}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Feather name="smile" size={24} color="#F9AC67" />
            </TouchableOpacity>
          </>
        }
      />
      <View className="items-end w-full flex-row justify-center absolute bottom-1 bg-white">
        <View className="w-10/12 ">
          <Input value={message} numberOfLines={3} handleChange={setMessage} />
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
