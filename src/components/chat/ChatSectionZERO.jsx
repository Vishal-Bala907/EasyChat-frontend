import "./../../../public/styles/chatsection.css";
import style from "./../../../public/styles/ChatSectionZero.module.css";
import scbar from "./../../../public/styles/Sidebar.module.css";
import { useSelector } from "react-redux";
import ChatSectionZEROCards from "./ChatSectionZEROCards";
const ChatSectionZERO = ({ chatsection }) => {
  // lightmode
  const lightMode = useSelector((state) => state.userReducer.lightMode);
  return (
    <section
      id="chatsection"
      ref={chatsection}
      style={{ height: "92vh" }}
      className={`chatArea d-flex flex-row pt-5 pb-5 ps-4 pe-4 d-flex flex-row gap-5 flex-wrap justify-content-center align-items-center overflow-scroll  ${
        lightMode === "DARK" ? style.bgBlack : style.bgWhite
      } ${scbar.hideScrollbar} `}
    >
      <ChatSectionZEROCards />
    </section>
  );
};

export default ChatSectionZERO;
