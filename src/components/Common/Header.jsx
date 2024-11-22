import { useSelector, useDispatch } from "react-redux";
import { setLightMode } from "../../../redux/ContextRedux";
import { useAuth } from "../../../config/AuthContext";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import Request from "./Request";
import styles from "../../../public/styles/Header.module.css";
import Profile from "./Profile";
import UpdateProfileImage from "./UpdateProfileImage";
import LINK from "../../../helpers/image-link";

const Header = () => {
  // dynamic changing the light mode
  const lightMode = useSelector((state) => state.userReducer.lightMode);
  // updating state variables
  const dispatch = useDispatch();
  // keycloak authorization object {kc} and authentication status {isAuthenticated}
  const { kc, isAuthenticated } = useAuth();
  // reference to back button which is only be visible on small screen devices
  // whenever user selects an user to chat
  // this button will redirect user back to list friends lists
  const backButtonRef = useRef();
  // this ref hides/display profile
  const profile = useRef();
  const [updateImage, setUpdateImage] = useState(false);

  const userdeatils = useSelector((state) => state.userReducer.userdeatils);

  // setting image
  const imageURL =
    userdeatils.image === ""
      ? "/images/nodp.png"
      : `${LINK + userdeatils.image}`;

  // whenver the screen size reaches the max width of 600px this hook displays the back button
  useEffect(() => {
    const handleBackButton = () => {
      if (window.innerWidth < 600) {
        sessionStorage.removeItem("selectedUser");
        backButtonRef.current.style.display = "block";
      } else {
        backButtonRef.current.style.display = "none";
      }
    };

    handleBackButton();
    // sets the rezie event on initial render
    window.addEventListener("resize", handleBackButton);
    return () => {
      window.removeEventListener("resize", handleBackButton);
    };
  }, []);

  useEffect(() => {
    // this function swithces between selected users and friend list
    // whenever user selects a friend, then friends list component got removed from the display
    // and the chat section displayed so on...
    const handleBackButtonClick = () => {
      sessionStorage.removeItem("selectedUser");
      const sidebar = document.getElementById("sidebar");
      const chatsection = document.getElementById("chatsection");
      sidebar.classList.remove("d-none");
      sidebar.classList.add("d-flex");
      chatsection.classList.remove("d-flex");
      chatsection.classList.add("d-none");
    };

    // sets the event listener to back button whenver its available (small screen)
    if (backButtonRef.current) {
      backButtonRef.current.addEventListener("click", handleBackButtonClick);
    }

    return () => {
      if (backButtonRef.current) {
        backButtonRef.current.removeEventListener(
          "click",
          handleBackButtonClick
        );
      }
    };
  }, []);

  return (
    <header
      className={`rounded-3 container-fluid p-3 d-flex flex-row gap-4 justify-content-between align-items-center ${
        lightMode === "LIGHT"
          ? `${styles.headerLight} text-dark`
          : `${styles.headerDark} text-white`
      }`}
    >
      <span ref={backButtonRef}>
        <IoIosArrowBack
          className={`${lightMode === "DARK" ? "text-white" : "text-black"}`}
          style={{ cursor: "pointer" }}
        />
      </span>
      <p className="m-0 align-content-lg-start ">Easy Chat</p>
      <nav className="align-self-lg-end pb-0">
        <ul className="d-flex pb-0 flex-row m-0 list-unstyled gap-4">
          <li className={`position-relative cursor-pointer`}>
            {isAuthenticated && <Request />}
          </li>
          <li>
            {isAuthenticated && (
              <div>
                <img
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "90%",
                    border: "2px solid white",
                    cursor: "pointer",
                  }}
                  src={imageURL}
                  onClick={() => {
                    profile.current.style.display = "flex";
                  }}
                />
                <Profile profile={profile} setUpdateImage={setUpdateImage} />
                {updateImage && (
                  <UpdateProfileImage setUpdateImage={setUpdateImage} />
                )}
              </div>
            )}
          </li>
          <li className="d-flex justify-content-center align-content-center gap-3">
            <p className="m-0">Mode</p>
            <div className="form-check form-switch ">
              <input
                accessKey="L"
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={() => {
                  dispatch(setLightMode());
                }}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                {lightMode}
              </label>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
