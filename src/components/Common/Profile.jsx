import style from "../../../public/styles/Profile.module.css";
import { useAuth } from "../../../config/AuthContext";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { GrUpdate } from "react-icons/gr";
import LINK from "../../../helpers/image-link";

const Profile = ({ profile, setUpdateImage }) => {
  const { kc } = useAuth();
  const userName = kc.tokenParsed.name;
  const email = kc.tokenParsed.email;
  const lightMode = useSelector((state) => state.userReducer.lightMode);
  const userdeatils = useSelector((state) => state.userReducer.userdeatils);

  // setting image
  const imageURL =
    userdeatils.image === ""
      ? "/images/nodp.png"
      : `${LINK + userdeatils.image}`;

  return (
    <span
      style={{ zIndex: 2 }}
      ref={profile}
      className={`position-absolute ${
        lightMode === "DARK"
          ? "bg-dark text-white"
          : "bg-primary-subtle text-dark"
      } px-4 py-3 rounded-3 gap-3 ${style.profileBG}`}
    >
      <div className="position-relative">
        <img
          className={`rounded-5`}
          style={{ height: "100px", width: "100px", border: "2px solid white" }}
          src={imageURL}
          alt=""
        />

        <GrUpdate
          className={`${style.updateImageIcon} ${
            lightMode === "DARK" ? "text-white" : "text-dark"
          }`}
          onClick={() => {
            setUpdateImage(true);
          }}
        />
        {/* <UpdateProfileImage /> */}
      </div>
      <h4>{userName}</h4>
      <p>{email}</p>
      <button
        className={`btn py-0 ${
          lightMode === "LIGHT" ? "btn-dark" : "btn-light"
        }`}
      >
        Reset Password
      </button>
      <button
        className={`btn py-0 ${
          lightMode === "LIGHT" ? "btn-dark" : "btn-light"
        }`}
        onClick={() => {
          kc.logout();
        }}
      >
        Logout
      </button>
      <RxCross1
        className={`${style.profileCross} ${
          lightMode === "DARK" ? "text-white" : "text-black"
        }`}
        onClick={() => {
          profile.current.style.display = "none";
        }}
      />
    </span>
  );
};

export default Profile;
