// import { useSelector } from "react-redux";
import styles from "./../../../public/styles/Hero.module.css";
import "./../../../public/styles/App.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAuth } from "../../../config/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../../redux/ContextRedux";
// import { useState } from "react";
const Hero = () => {
  const heroCardFirst = useRef();
  const heroCardSecond = useRef();
  const timeline = gsap.timeline();
  const { kc } = useAuth();

  useGSAP(() => {
    timeline.from(heroCardFirst.current, {
      opacity: 0,
      x: window.innerWidth,
      duration: 1,
      ease: "back.inOut",
    });
    timeline.from(heroCardSecond.current, {
      opacity: 0,
      x: window.innerWidth,
      duration: 1,
    });
  });

  const lightMode = useSelector((state) => state.userReducer.lightMode);
  const dispatch = useDispatch();

  return (
    <>
      <section
        className={`container-xl text-white d-flex flex-column flex-lg-row flex-xl-row flex-xxl-row  justify-content-center align-items-center rounded-3 px-4  gap-5 ${
          styles.mainHero
        }
        ${lightMode === "LIGHT" ? "bg-white text-dark" : "bg-dark text-light"}
        `}
        style={
          lightMode === "DARK"
            ? {
                backgroundImage: "url('public/images/hero-bg.jpg')",
              }
            : { backgroundImage: "url('public/images/hero-bg-white.jpg')" }
        }
      >
        <div
          ref={heroCardFirst}
          className={`d-flex flex-column my-3 justify-content-center align-items-center hero-cards px-3 
            ${
              lightMode === "DARK"
                ? "text-light hero-cards-dark"
                : "text-dark hero-cards-light"
            }
            `}
        >
          <h2 className="mb-5 text-center">Login or Regiter</h2>
          <div className="d-flex flex-row justify-content-center align-items-center gap-4">
            <button
              className="btn btn-light"
              onClick={async () => {
                kc.login();
              }}
            >
              Login
            </button>
            or
            <button
              className="btn btn-light"
              onClick={() => {
                kc.register();
                dispatch(setSelectedUser(null));
              }}
            >
              Register
            </button>
          </div>
        </div>
        <div
          ref={heroCardSecond}
          className={`d-flex flex-column my-3 justify-content-center align-items-center hero-cards px-3 
            ${
              lightMode === "DARK"
                ? "text-light hero-cards-dark"
                : "text-dark hero-cards-light"
            }
            `}
        >
          <h2 className="mb-5 text-center">
            Stay Connected, Anytime, Anywhere
          </h2>
          <div className="d-flex flex-row justify-content-center align-items-center gap-4">
            <p>
              Chat with friends, family, and colleagues effortlessly. Our app
              keeps you connected and up-to-date with instant messaging, easy
              file sharing, and customizable chat options - all in one secure
              platform
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
