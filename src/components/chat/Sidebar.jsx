import { useSelector, useDispatch } from "react-redux";
import styles from "./../../../public/styles/Sidebar.module.css";
import { setSelectedUser } from "../../../redux/ContextRedux";
import { useRef, useState } from "react";
import "./../../../public/styles/chatsection.css";
import "./../../../public/styles/SearchUsers.css";
import SearchUsers from "./SearchUsers";
import { RxCross1 } from "react-icons/rx";
import LINK from "../../../helpers/image-link";
// import { getAllFriends } from "../../../services/api.service";

const Sidebar = ({
  setFocus,
  sideBarRef,
  userSelectedOnSmallScreen,
  searchForUser,
  searchedUsers,
}) => {
  // reference for searchUser component
  // whenever user select the search bar then friends list got out of the display
  // and this component will display the search result
  const searchUser = useRef();
  // for locally specefiying what the user currently  selected
  // search or friendList
  // users for Friend List and search for search component
  const [localFocus, setLocalFocus] = useState("users");
  const dispatch = useDispatch();

  // whenever user selects a friend this function invoked
  const userClicked = (user) => {
    //sets the focus
    setFocus("USER");
    // sets the selected user state
    dispatch(setSelectedUser(user));
    // getting the data from localstorage
    const selected = sessionStorage.getItem("selectedUser"); //, `span-${user.og_id}`);

    if (selected === null) {
      // hide the unread star if visible
      document.getElementById(`span-${user.og_id}`).style.visibility = "hidden";
      // set the custom id to the session storage so it can be used later for hidding or displaying the unread star
      sessionStorage.setItem("selectedUser", `span-${user.og_id}`);
      // check if the user select within the small screen
      userSelectedOnSmallScreen();
    } else {
      // hide the unread star if visible and if selected is not null
      document.getElementById(`span-${user.og_id}`).style.visibility = "hidden";
      // remove the current item
      sessionStorage.removeItem("selectedUser");
      // sets the currently selected user
      sessionStorage.setItem("selectedUser", `span-${user.og_id}`);
      // check if the user select within the small screen
      userSelectedOnSmallScreen();
    }

    console.log(user);
  };
  // lightmode
  const lightMode = useSelector((state) => state.userReducer.lightMode);
  // list of friends
  const friends = useSelector((state) => state.userReducer.friends);
  // prevent user from typing words other than number and alphabets
  const searchUserFunction = (e) => {
    if (/^[A-Za-z0-9]*$/.test(e.target.value)) {
      searchForUser(e.target.value);
    }
  };

  // useEffect(() => {
  //   console.log("HEEEEELOOOOO");

  // }, [friends]);

  // const userdeatils = useSelector((state) => state.userReducer.userdeatils);

  // setting image

  return (
    <aside
      id="sidebar"
      ref={sideBarRef}
      className={`rounded-4 sidebar overflow-auto ${
        lightMode === "DARK"
          ? `${styles.bgDark} text-white`
          : `${styles.bgLight} text-black`
      } ${styles.height} ${styles.hideScrollbar}`}
    >
      <ul
        className={`w-100 list-unstyled p-2 mb-0 overflow-auto ${styles.hideScrollbar} `}
      >
        <li
          style={{ height: "40px" }}
          className={`text-center my-auto d-flex gap-4 justify-content-center align-items-center gap-1 ${
            styles.contact
          } 
              ${
                lightMode === "DARK"
                  ? `${styles.hoverDark} border-bottom border-dark `
                  : `${styles.hoverLight} border-bottom`
              }`}
        >
          <div className="w-75 position-relative">
            <input
              ref={searchUser}
              onFocus={() => {
                setLocalFocus("search");
              }}
              onChange={searchUserFunction}
              className="rounded-2 ps-2 w-100"
              type="search"
              placeholder="Enter name to search"
            />
            <RxCross1
              className="cross"
              onClick={() => {
                setLocalFocus("users");
                searchUser.current.value = "";
                searchForUser(""); // empty the search result
              }}
            />
          </div>
        </li>
        {localFocus === "search" && (
          <SearchUsers searchedUsers={searchedUsers} />
        )}
        {localFocus === "users" &&
          friends.map((user) => {
            console.log(user);
            const imageURL =
              user.image === "" ? "/images/nodp.png" : `${LINK + user.image}`;
            return (
              <li
                key={user.og_id}
                style={{ height: "40px" }}
                className={`text-center my-auto d-flex gap-4 justify-content-center align-items-center  gap-1 ${
                  styles.contact
                } 
              ${
                lightMode === "DARK"
                  ? `${styles.hoverDark} border-bottom border-dark `
                  : `${styles.hoverLight} border-bottom`
              }`}
                id={`user-list-${user.og_id}`}
                onClick={() => userClicked(user)}
              >
                <img
                  src={imageURL}
                  className={`${styles.dp}`}
                  alt="not availble"
                />
                <p className="my-auto">{user.name}</p>
                <span
                  id={`span-${user.og_id}`}
                  style={{ fontSize: "xx-large", visibility: "hidden" }}
                >
                  *
                </span>
              </li>
            );
          })}
      </ul>
    </aside>
  );
};

export default Sidebar;
