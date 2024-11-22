import React, { useRef } from "react";
import style from "/public/styles/ChatSectionZero.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSelector } from "react-redux";

const ChatSectionZEROCards = () => {
  const card1 = useRef();
  const card2 = useRef();
  const card3 = useRef();
  const card4 = useRef();

  const lightMode = useSelector((state) => state.userReducer.lightMode);
  // const t1 = gsap.timeline();
  useGSAP(() => {
    gsap.from(card1.current, { rotateY: 360, duration: 1.5, ease: "bounce" });
    gsap.from(card2.current, { rotateY: 360, duration: 1.5, ease: "bounce" });
    gsap.from(card3.current, { rotateY: 360, duration: 1.5, ease: "bounce" });
    gsap.from(card4.current, {
      rotateY: 360,
      duration: 1.5,
      ease: "bounce",
    });
  });

  useGSAP(() => {
    // gsap.to(card1.current, {});

    const handleMouseEnter = (event) => {
      const cardHead = event.currentTarget.querySelector(".card-head");
      gsap.to(cardHead, {
        scaleY: 1,
        duration: 0.6,
        translateY: "-90px",
        ease: "power1.in",
        zIndex: 1,
        opacity: 1,
        // duration: 2,
      });
    };
    const handleMouseLeave = (event) => {
      const cardHead = event.currentTarget.querySelector(".card-head");
      gsap.to(cardHead, {
        scaleY: 1,
        duration: 0.6,
        translateY: "0px",
        ease: "power1.in",
        zIndex: -1,
        opacity: 0,
        // duration: 2,
      });
    };

    [card1, card2, card3, card4].forEach((card) => {
      card.current.addEventListener("mouseenter", handleMouseEnter);
      card.current.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      [card1, card2, card3, card4].forEach((card) => {
        card.current.removeEventListener("mouseenter", handleMouseEnter);
        card.current.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  });
  return (
    <>
      <div className=" d-flex flex-row flex-wrap justify-content-center align-content-center gap-5 position-relative">
        <div
          ref={card1}
          className={`${
            style.noChatCard
          } d-flex flex-column justify-content-center align-items-center rounded-4 ${
            style.card
          } ${style.cardBGDARK} ${
            lightMode === "DARK" ? style.cardBGDARK : style.cardBGLIGHT
          }`}
        >
          <h6 id="first-heading" className="card-head text-center">
            Real-Time Messaging
          </h6>
          <img className={`${style.cardImg}`} src="/images/chat.jpg" alt="" />
        </div>

        <div
          ref={card2}
          className={`${
            style.noChatCard
          } d-flex flex-column justify-content-center align-items-center rounded-4 ${
            style.card
          } ${style.cardBGDARK} ${
            lightMode === "DARK" ? style.cardBGDARK : style.cardBGLIGHT
          }`}
        >
          <h6 className="card-head text-center">Seamless User Experience</h6>
          <img className={`${style.cardImg}`} src="/images/ux.jpg" alt="" />
        </div>
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-center align-content-center gap-5 position-relative">
        <div
          ref={card3}
          className={`${
            style.noChatCard
          } d-flex flex-column justify-content-center align-items-center rounded-4 ${
            style.card
          } ${style.cardBGDARK} ${
            lightMode === "DARK" ? style.cardBGDARK : style.cardBGLIGHT
          }`}
        >
          <h6 className="card-head text-center">
            Enhanced Privacy and Security
          </h6>
          <img className={`${style.cardImg}`} src="/images/ps.jpg" alt="" />
        </div>

        <div
          ref={card4}
          className={`${
            style.noChatCard
          } d-flex flex-column justify-content-center align-items-center rounded-4 ${
            style.card
          } ${style.cardBGDARK} ${
            lightMode === "DARK" ? style.cardBGDARK : style.cardBGLIGHT
          }`}
        >
          {/* <div className="position-relative"> */}
          <img className={`${style.cardImg}`} src="/images/ntf.jpg" alt="" />
          {/* </div> */}
          <h6 className="card-head text-center">Customizable Notifications</h6>
        </div>
      </div>
    </>
  );
};

export default ChatSectionZEROCards;
