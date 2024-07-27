import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../layout/Navbar/Navbar';
import Cookies from 'js-cookie';
import { userChats } from '../../api/ChatRequests';
import Conversation from '../../components/interface/chat/Conversation';
import ChatBox from '../../components/interface/chat/ChatBox';
import { io } from 'socket.io-client';

function ChatApp() {
  const socket = useRef(null);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      try {
        const userData = Cookies.get("currentUser");
        console.log("User data from cookies:", userData);
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);
        } else {
          console.error("User data not found in cookies.");
        }
      } catch (error) {
        console.error("Failed to parse user data from cookies", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const getChats = async () => {
      if (user && user.adherent && user.adherent._id) {
        try {
          const { data } = await userChats(user.adherent._id);
          setChats(data);
        } catch (error) {
          console.error("Error fetching user chats:", error);
        }
      } else {
        console.error("User ID is missing or invalid.");
      }
    };

    getChats();
  }, [user]);

  useEffect(() => {
    if (user && user.adherent && user.adherent._id) {
      socket.current = io("ws://localhost:8800");
      socket.current.emit("new-user-add", user.adherent._id);
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });

      socket.current.on("receive-message", (data) => {
        console.log("Message received: ", data);
        setReceivedMessage(data);
      });

      return () => {
        socket.current.disconnect();
      };
    } else {
      console.error("User ID is missing or invalid.");
    }
  }, [user]);

  useEffect(() => {
    if (sendMessage && socket.current) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user?.adherent?._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  if (!user || !user.adherent || !user.adherent._id) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-[22%,auto] gap-4 p-4">
        <div className="flex flex-col gap-4">
          <input type="text" placeholder="Search" className="w-full p-4 mb-6 border rounded-full" />
          <div className="flex flex-col gap-4 bg-white rounded-lg p-4 h-[80vh] overflow-scroll">
            <h2 className="font-semibold text-2xl">Chats</h2>
            <div className="flex flex-col gap-4">
              {chats.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                  className="conversation rounded-md p-2 hover:bg-gray-200 cursor-pointer"
                >
                  <Conversation
                    data={chat}
                    currentUser={user.adherent._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="self-end flex items-center space-x-2">
            {/* You can add any additional user interaction components here */}
          </div>
          <ChatBox
            chat={currentChat}
            currentUser={user.adherent._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div> 
      </div>
    </div>
  );
}

export default ChatApp;



// import React from 'react';


// function ChatApp() {
//   return (
 


//     <div className=" bg-gray-800 text-white flex w-full">
      
//       <div className=" bg-black rounded-lg overflow-hidden">
//         <div className="bg-black p-4 flex items-center">
//           <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4">
//             {/* Placeholder for Profile Image */}
//             <img src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" alt="Profile" className="rounded-full" />
//           </div>
//           <h2 className="text-lg">Aya Sabri</h2>
//         </div>
//         <div className="bg-white p-4 flex-1 h-96 overflow-y-auto">
//           {/* Messages will go here */}
//         </div>
//         <div className="p-4    flex items-center">
//           <input
//             type="text"
//             className="w-full bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none"
//             placeholder="Send a message..."
//           />
//          <button className='border bg-green-500 text-white px-4 py-2 rounded-lg'>
//                 Save
//             </button>
//         </div>
//       </div>
//     </div>
  
//   );
// }

// export default ChatApp;

