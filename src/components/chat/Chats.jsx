import { memo, useEffect, useState } from "react";
import style from "../../../public/styles/Chats.module.css";
import { useSelector } from "react-redux";
import { getChats } from "../../../services/api.service";

const Chats = () => {
  const [objectsArray, setobjectsArray] = useState([]);
  const selectedUser = useSelector((state) => state.userReducer.selectedUser);
  const userdeatils = useSelector((state) => state.userReducer.userdeatils);
  useEffect(() => {
    getChats(userdeatils.userId, selectedUser.og_id)
      .then((data) => {
        setobjectsArray(data);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      const elements = document.getElementsByClassName("remove");
      // Convert HTMLCollection to an array and iterate through each element to remove it
      Array.from(elements).forEach((element) => {
        element.remove();
      });
    };
  }, [selectedUser, userdeatils.userId]);

  console.log("Rendering chats");
  return (
    <>
      {objectsArray.map((chat) => {
        return (
          <li
            key={chat.id}
            className={`chats-li position-relative ${
              chat.sentBy === userdeatils.userId
                ? "align-self-end"
                : "align-self-start"
            }  d-flex flex-column my-2 ${style.chatsLI} 
            ${chat.sentBy === userdeatils.userId ? style.senderColor : ""}
            `}
          >
            <p className="m-0 p-0">{chat.message}</p>
            <span style={{ fontSize: "10px" }} className="">
              {chat.date}
            </span>
            {/* <MdOutlineDeleteOutline
              style={{ bottom: "-6px", right: "0px" }}
              className="position-absolute"
            /> */}
          </li>
        );
      })}
    </>
  );
};

export default memo(Chats);
