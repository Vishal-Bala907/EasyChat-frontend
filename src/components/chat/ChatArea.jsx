import { useEffect, useRef, useState } from "react";
import ChatSection from "./ChatSection";
import Sidebar from "./Sidebar";
// import SearchUsers from "./SearchUsers";
import ChatSectionZERO from "./ChatSectionZERO";
import "./../../../public/styles/chatsection.css";
import { useSelector } from "react-redux";
// import searchedUserDummy from "../../../helpers/DummySearch";
import { searchedUserList } from "../../../services/api.service";
import { useAuth } from "../../../config/AuthContext";
// import { useChatContext } from "../../../config/ChatContext";

const ChatArea = () => {
  const { kc } = useAuth();
  console.log(kc);

  // CHAT-SECTION if user selected a friend
  // SEARCH whenever user searches a user
  // CHAT-SECTION-ZERO when no friend selected (default)
  const [focus, setFocus] = useState("CHAT-SECTION-ZERO"); // specifying what user currently doing
  // reference for sidebar
  const sideBarRef = useRef();
  // reference for chat area
  const chatsection = useRef();
  // currently selected user
  const selectedUser = useSelector((state) => state.userReducer.selectedUser);
  const [userSearched, setUserSearched] = useState(""); // username that is searched
  const [searchedUsers, setSearchedUser] = useState(""); // search result

  // Chat Area responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (sideBarRef.current && chatsection.current) {
        if (window.innerWidth < 600) {
          sideBarRef.current.style.width = "100%";
          chatsection.current.style.width = "100%";
          sideBarRef.current.classList.add("d-flex");
          sideBarRef.current.classList.remove("d-none");
          chatsection.current.classList.add("d-none");
          chatsection.current.classList.remove("d-flex");
        } else if (window.innerWidth >= 600 && window.innerWidth < 768) {
          sideBarRef.current.style.width = "45%";
          chatsection.current.style.width = "55%";

          sideBarRef.current.classList.remove("d-none");
          sideBarRef.current.classList.add("d-flex");
          chatsection.current.classList.remove("d-none");
          chatsection.current.classList.add("d-flex");
        } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
          sideBarRef.current.style.width = "35%";
          chatsection.current.style.width = "65%";
          sideBarRef.current.classList.remove("d-none");
          sideBarRef.current.classList.add("d-flex");
          chatsection.current.classList.remove("d-none");
          chatsection.current.classList.add("d-flex");
        } else {
          sideBarRef.current.style.width = "25%";
          chatsection.current.style.width = "75%";
          sideBarRef.current.classList.remove("d-none");
          sideBarRef.current.classList.add("d-flex");
          chatsection.current.classList.remove("d-none");
          chatsection.current.classList.add("d-flex");
        }
      }
    };

    // Set initial widths
    handleResize();

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [sideBarRef, chatsection]);

  // only for small screens
  // to properly update UI in small screen devices
  const userSelectedOnSmallScreen = () => {
    if (window.innerWidth < 600) {
      sideBarRef.current.classList.remove("d-flex");
      sideBarRef.current.classList.add("d-none");
      chatsection.current.classList.remove("d-none");
      chatsection.current.classList.add("d-flex");
    }
  };
  // search for the user
  // debouncing
  useEffect(() => {
    const id = setTimeout(() => {
      // preventing the API firing in case of empty input
      if (userSearched === "") {
        setSearchedUser([]);
        return;
      }
      // fetchin the users
      searchedUserList(userSearched)
        .then((data) => {
          if (data) {
            // updating the search result
            setSearchedUser(data);
          } else {
            setSearchedUser([]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }, 500);

    return () => {
      clearInterval(id);
    };
  }, [userSearched]);

  const searchForUser = (username) => {
    setUserSearched(username);
  };

  return (
    <main className="chatAreaWrapperComp ">
      <Sidebar
        setFocus={setFocus}
        userSelectedOnSmallScreen={userSelectedOnSmallScreen}
        searchForUser={searchForUser}
        searchedUsers={searchedUsers}
        sideBarRef={sideBarRef}
      />
      {focus === "USER" && <ChatSection chatsection={chatsection} />}
      {focus === "CHAT-SECTION-ZERO" && (
        <ChatSectionZERO chatsection={chatsection} />
      )}
    </main>
  );
};

export default ChatArea;
