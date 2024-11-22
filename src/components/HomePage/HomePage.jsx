import { useSelector } from "react-redux";
import { useAuth } from "../../../config/AuthContext";
import Hero from "./Hero";

const HomePage = () => {
  const { kc } = useAuth();
  const lightMode = useSelector((state) => state.userReducer.lightMode);
  // console.log(lightMode);

  return (
    <div
      className={`container-fluid py-4 ${
        lightMode === "LIGHT" ? "bg-white" : "bg-black"
      }`}
    >
      <Hero />
      <button
        onClick={() => {
          kc.login();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default HomePage;
