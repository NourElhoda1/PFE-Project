import React, { useEffect, useState, useRef } from "react";
import { addMessage, getMessages } from "../../../api/MessageRequests";
import { getAdherent } from "../../../api/AdherentRequests";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji';

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [receiverData, setReceiverData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const { data } = await getAdherent(userId);
        return data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    if (chat && currentUser) {
      const receiverId = chat.members.find((id) => id !== currentUser);
  
      fetchUserData(currentUser).then(setUserData);
      fetchUserData(receiverId).then(setReceiverData);
    }
  }, [chat, currentUser]);
  

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (chat) fetchMessages();
  }, [chat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
  
    setSendMessage({ ...message, receiverId });
  
    try {
      const { data } = await addMessage({ ...message, receiverId });
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  useEffect(() => {
    if (receivedMessage && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);
  

  const scroll = useRef();
  return (
    <div className="bg-white rounded-lg grid grid-rows-[14vh_60vh_13vh]">
      {chat ? (
        <>
         <div className="p-4 flex flex-col border-b">
          <div className="flex items-center">
            <div className="ml-4">
              <span className="text-sm font-medium">
                Chat with {receiverData?.firstname} {receiverData?.lastname}
              </span>
            </div>
          </div>
         </div>

          <div className="flex flex-col gap-2 p-6 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message._id}
                ref={scroll}
                className={`${
                  message.senderId === currentUser ? "self-end bg-green-200" : "bg-gray-200"
                } text-dark p-3 rounded-lg max-w-xs w-fit flex flex-col gap-2`}
              >
                <span>{message.text}</span>
                <span className="text-xs text-gray-500 self-end">{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <div className="bg-white flex justify-between items-center gap-4 p-4 rounded-lg shadow-lg">
            <InputEmoji value={newMessage} onChange={handleChange} />
            <button
              className="bg-green-500 text-white p-2 rounded-lg"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <span className="flex justify-center items-center text-4xl h-full text-gray-400">
          Tap on a chat to start conversation...
        </span>
      )}
    </div>
  );
};

export default ChatBox;
