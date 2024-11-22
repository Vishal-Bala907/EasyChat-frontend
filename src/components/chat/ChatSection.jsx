import { useDispatch, useSelector } from "react-redux";
import styles from "/public/styles/ChatSection.module.css";
import style from "/public/styles/Chats.module.css";

import { useCallback, useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import "./../../../public/styles/chatsection.css";
import Chats from "./Chats";
import { useChatContext } from "../../../config/ChatContext";
import LINK from "../../../helpers/image-link";
import { FaChevronDown, FaImage } from "react-icons/fa";
// import {  } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { deleteChats } from "../../../helpers/ConfirmAlert";
import { getAllFriends } from "../../../services/api.service";
import { setFriends } from "../../../redux/ContextRedux";
// import SendImage from "./SendImage";
// import { deleteChats } from "../../../services/api.service";

const ChatSection = ({ chatsection }) => {
  // Register the ScrollToPlugin
  gsap.registerPlugin(ScrollToPlugin);
  // message typed by the user to send to the selected user
  const message = useRef(null);

  // ul that contails all the messages
  const msgContainer = useRef(null);

  // container that <section></section>
  const msgContainerRef = useRef(null);
  const scrollToBottom = useRef(null);

  // selected user
  const selectedUser = useSelector((state) => state.userReducer.selectedUser);

  // loggedin user details
  const userdeatils = useSelector((state) => state.userReducer.userdeatils);
  // light mode
  const lightMode = useSelector((state) => state.userReducer.lightMode);

  console.log("Re-rendering chat section");
  // const [sendImage, setsendImage] = useState(false);
  // const sendingImages = useCallback(
  //   (file) => {
  //     setsendImage((state) => !state);
  //     if (file) {
  //       // sending file
  //       // console.log(userdeatils);
  //       // console.log(selectedUser);
  //       // message object
  //       const chatMessage = {
  //         senderId: userdeatils.userId, // e.g., "user123"
  //         recipientId: selectedUser.og_id, // e.g., "user456"
  //         message: message.current.value, // e.g., "Hello!"
  //         sentBy: userdeatils.userId, // e.g., "sender" or "receiver"
  //         viewer1: userdeatils.userId,
  //         viewer2: selectedUser.og_id,
  //         file: file,
  //         type: "IMAGE",
  //       };

  //       if (client && client.connected) {
  //         client.send(`/app/send/image`, {}, JSON.stringify(chatMessage));
  //       }
  //     }
  //     console.log(file);
  //   },
  //   [selectedUser]
  // );

  // client connected to websocket
  // used to send message
  const { client } = useChatContext();
  useEffect(() => {
    // wait for 300 ms for the continer to complete rendering
    setTimeout(() => {
      let scrollTimeOut;

      // display the button which will lead the user to the latest chats(bottom of the chats)
      function showBottomButton() {
        clearTimeout(scrollTimeOut);

        gsap.to("#scrollToBottom", {
          opacity: 1,
          duration: 1,
          ease: "power1",
        });

        // hides the button
        scrollTimeOut = setTimeout(() => {
          // user stopped scrolling
          hideBottomButton();
        }, 5000);
      }
      function hideBottomButton() {
        gsap.to("#scrollToBottom", {
          opacity: 0,
          duration: 1,
          ease: "power1",
        });
      }
      function goToBottom() {
        // msgContainerRef.current.scrollTop =
        //   msgContainerRef.current.scrollHeight;
        gsap.to(msgContainerRef.current, {
          duration: 2,
          scrollTo: {
            y: msgContainerRef.current.scrollHeight,
            // offsetY: msgContainerRef.current.scrollTop,
            autoKill: true, // scroll down from the current position
          },
        });
        hideBottomButton();
      }

      // call it initially
      hideBottomButton();
      goToBottom();

      msgContainerRef.current.addEventListener("scroll", showBottomButton);
      msgContainerRef.current.addEventListener("click", goToBottom);

      return () => {
        msgContainerRef.current.removeEventListener("scroll", showBottomButton);
        msgContainerRef.current.removeEventListener("click", goToBottom);
      };
    }, 300);
  }, [selectedUser]);

  useGSAP(() => {
    setTimeout(() => {
      gsap.to("#scrollToBottom", {
        opacity: 0,
        duration: 1,
        ease: "circ",
      });
    }, 1000);
  });

  // function goToBottom() {
  //   msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
  // }

  // sends message to the user
  function sendMessage() {
    // console.log(userdeatils);
    // console.log(selectedUser);
    // message object
    const chatMessage = {
      senderId: userdeatils.userId, // e.g., "user123"
      recipientId: selectedUser.og_id, // e.g., "user456"
      message: message.current.value, // e.g., "Hello!"
      sentBy: userdeatils.userId, // e.g., "sender" or "receiver"
      viewer1: userdeatils.userId,
      viewer2: selectedUser.og_id,
      type: "TEXT",
    };
    if (client && client.connected) {
      client.send(`/app/send`, {}, JSON.stringify(chatMessage));

      // after send create and appen message
      const msg = document.createElement("li");

      // Set attributes and classes
      msg.className = `chats-li remove align-self-end d-flex flex-column my-2 ${style.senderColor} ${style.chatsLI}`;
      msg.setAttribute("key", Math.floor(Math.random * Math.pow(10, 10)));

      // Create the message text
      const messageText = document.createElement("p");
      messageText.className = "m-0 p-0";
      messageText.textContent = message.current.value;

      // Create the timestamp
      const timestamp = document.createElement("span");
      timestamp.style.fontSize = "10px";
      timestamp.textContent = new Date().toLocaleDateString();

      // Append message and timestamp to the list item
      msg.appendChild(messageText);
      msg.appendChild(timestamp);

      // Append the list item to the message container
      msgContainer.current.appendChild(msg);

      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
      message.current.value = "";
    } else {
      console.error("CLIENT NOT CONNECTED");
    }
  }

  function keyDown(event) {
    // alert("Enter");
    if (event.key === "Enter") {
      // alert("Enter");
      sendMessage();
    }
  }

  const dispatch = useDispatch();
  const removeFriend = async (loggedInUSer, selectedUser) => {
    await client.send(
      `/app/unfriend`,
      {},
      JSON.stringify({ loggedInUSer, selectedUser })
    );
    getAllFriends()
      .then((friends) => {
        console.log(friends);
        dispatch(setFriends(friends));
      })
      .catch((err) => {
        console.error(err);
      });
    location.reload();
  };

  const unfriendUser = (loggedInUSer, selectedUser) => {
    confirmAlert({
      title: "Unfriend",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            removeFriend(loggedInUSer, selectedUser);
          },
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const imageURL =
    selectedUser.image === ""
      ? "/images/nodp.png"
      : `${LINK + selectedUser.image}`;
  return (
    <section
      id="chatsection"
      ref={chatsection}
      style={{ height: "92vh" }}
      className="chatArea d-flex flex-column"
    >
      <div
        className={`rounded-3 d-flex justify-content-start align-items-center gap-4 px-4 ${
          lightMode === "DARK" ? `${styles.barDark}` : `${styles.barLight}`
        } ${styles.recieverBar} `}
      >
        <img src={imageURL} className={`${styles.recieverDP}`} alt="" />
        <p
          className={`p-0 m-0 ${
            lightMode === "DARK" ? `text-white ` : "text-dark"
          }`}
        >
          {selectedUser.name}
        </p>
        <button
          style={{ fontSize: "clamp(.6em, 1.2vw, 1em)" }}
          className="btn btn-warning"
          onClick={() => {
            unfriendUser(userdeatils.userId, selectedUser.og_id);
          }}
        >
          Remove Friend
        </button>
        <button
          style={{ fontSize: "clamp(.6em, 1.2vw, 1em)" }}
          className="btn btn-warning"
          onClick={() => {
            deleteChats(userdeatils.userId, selectedUser.og_id);
          }}
        >
          Remove Chats
        </button>
      </div>
      <section
        id="msgContainerRef"
        ref={msgContainerRef}
        className={` overflow-auto ${styles.chatTexts} ${
          styles.hideScrollbar
        }  ${lightMode === "DARK" ? "bg-warning-subtle" : "bg-light-subtle"}`}
      >
        <ul
          id="msgContainer"
          ref={msgContainer}
          className="p-3 d-flex flex-column"
        >
          <Chats />
        </ul>
        <FaChevronDown
          id="scrollToBottom"
          ref={scrollToBottom}
          className={`${styles.bottomButton}`}
        />
      </section>
      <div
        className={`rounded-3 d-flex justify-content-center gap-4 p-2 align-items-center flex-row ${
          styles.sendMessage
        }
        ${lightMode === "DARK" ? `${styles.barDark} ` : `${styles.barLight}`}
        `}
      >
        <div className={"w-75 position-relative"}>
          <input
            id="message"
            className={`w-100 rounded-3 p-2`}
            type="text"
            ref={message}
            onKeyDown={keyDown}
          />
          <RxCross1
            // style={{ color: "bal" }}
            className={`${styles.cross} `}
            onClick={() => {
              message.current.value = "";
            }}
          />
        </div>
        {/* {sendImage ? (
          <SendImage sendImage={sendImage} sendingImages={sendingImages} />
        ) : (
          <FaImage
            onClick={sendingImages}
            style={{ height: "2em", width: "2em", color: "blue" }}
          />
        )} */}
        {/* <button className={`p-2 rounded-2`}>Send</button> */}
        <IoSend
          style={{ height: "2em", width: "2em", color: "white" }}
          onClick={() => {
            sendMessage();
          }}
        />
      </div>
    </section>
  );
};

export default ChatSection;
