import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
// import { useAuth } from "./AuthContext";
import { setFriends, setRequest } from "../redux/ContextRedux";
import { useDispatch } from "react-redux";
import { getAllFriends, getAllRequests } from "../services/api.service";
import style from "../public/styles/Chats.module.css";

const chatCTX = createContext({
  subscribe: () => {},
  client: null,
  isConnected: false,
});
const processedMessageIds = new Set(); // Track processed message IDs
const ChatContext = ({ children }) => {
  const userdeatils = useSelector((state) => state.userReducer.userdeatils);
  // const selectedUser = useSelector((state) => state.userReducer.selectedUser);
  // const { kc } = useAuth();
  const socket = useRef();
  const client = useRef();
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();

  function onAddRequest() {
    getAllRequests()
      .then((data) => {
        console.log(data);
        dispatch(setRequest(data));
      })
      .catch((err) => {
        console.log("ERROR WHILE GETTING ALL THE REQUESTS ", err);
      });
  }
  function onReqAcceptedOrRejected(payload) {
    dispatch(setFriends(JSON.parse(payload.body)));
  }

  // Handle unfriend request
  function onUnfriendRequestArrived(payload) {
    // useEffect(() => {
    getAllFriends()
      .then((friends) => {
        dispatch(setFriends(friends));
      })
      .catch((err) => {
        console.error(err);
      });
    // }, [friends]);
  }
  function onMessageReceived(payload) {
    const MESSAGE = JSON.parse(payload.body);
    console.log(MESSAGE);

    if (processedMessageIds.has(MESSAGE.id)) {
      return;
    }
    const selectedUserID = sessionStorage.getItem("selectedUser");
    console.log(selectedUserID);
    console.log(`span-${MESSAGE.senderId}`);
    if (selectedUserID !== `span-${MESSAGE.senderId}`) {
      console.log(document.getElementById(`span-${MESSAGE.senderId}`));
      document.getElementById(`span-${MESSAGE.senderId}`).style.visibility =
        "visible";
      return;
    }
    processedMessageIds.add(MESSAGE.id);

    // after send create and appen message
    const msg = document.createElement("li");

    // Set attributes and classes
    msg.className = `chats-li remove align-self-start d-flex flex-column my-2  ${style.chatsLI}`;
    msg.setAttribute("key", MESSAGE.id);

    // Create the message text
    const messageText = document.createElement("p");
    messageText.className = "m-0 p-0";
    messageText.textContent = MESSAGE.message;

    // Create the timestamp
    const timestamp = document.createElement("span");
    timestamp.style.fontSize = "10px";
    timestamp.textContent = MESSAGE.date;

    // Append message and timestamp to the list item
    msg.appendChild(messageText);
    msg.appendChild(timestamp);

    // Append the list item to the message container
    document.getElementById("msgContainer").appendChild(msg);
    // alert("appended");
    document.getElementById("msgContainerRef").scrollTop =
      document.getElementById("msgContainerRef").scrollHeight;
  }

  useEffect(() => {
    if (userdeatils && userdeatils.userId) {
      const connect = () => {
        if (client.current) {
          console.log("Already connected to WebSocket.");
          return; // Prevent multiple connections
        }
        socket.current = new SockJS("http://localhost:8182/chat");
        client.current = Stomp.over(socket.current);

        client.current.connect(
          {},
          (frame) => {
            console.log("Connected:", frame);
            setIsConnected(true);
            client.current.subscribe(
              `/user/${userdeatils.userId}/add/req`,
              onAddRequest
            );
            client.current.subscribe(
              `/user/${userdeatils.userId}/acc/rej`,
              onReqAcceptedOrRejected
            );
            client.current.subscribe(
              `/user/${userdeatils.userId}/send`,
              onMessageReceived
            );
            client.current.subscribe(
              `/user/${userdeatils.userId}/unfriend`,
              onUnfriendRequestArrived
            );
          },
          (error) => {
            console.error("Connection error:", error);
            setIsConnected(false);
          }
        );
      };
      connect();
      return () => {
        if (client.current) {
          client.current.disconnect(() => {
            console.log("Disconnected on cleanup");
          });
        }
      };
    }
  }, [userdeatils]);

  return (
    // <Provider store={store}>
    <chatCTX.Provider value={{ client: client.current, isConnected }}>
      {children}
    </chatCTX.Provider>
    // </Provider>
  );
};

export default ChatContext;
export const useChatContext = () => {
  return useContext(chatCTX);
};
