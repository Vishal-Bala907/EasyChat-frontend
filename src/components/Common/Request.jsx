import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { ImCross, ImCheckmark } from "react-icons/im";
import req from "../../../public/styles/Request.module.css";
import { useEffect, useState } from "react";
import { useChatContext } from "../../../config/ChatContext";
import { setRequest } from "../../../redux/ContextRedux";

const Request = () => {
  const lightMode = useSelector((state) => state.userReducer.lightMode);
  const userdeatils = useSelector((state) => state.userReducer.userdeatils);
  const requests = useSelector((state) => state.userReducer.requests);
  const friends = useSelector((state) => state.userReducer.friends);
  const [requestCount, setRequestCount] = useState(0);
  // console.log(requests);
  // just for changing the state vari, so it can re-render this componet to for displaying all the request
  const dispatch = useDispatch();
  useEffect(() => {
    setRequestCount(requests.length);
  }, [requests, friends]);
  const { client } = useChatContext();

  const acceptOrRejectRequest = async (user) => {
    // console.log(user, userdeatils);
    if (client && client.connected) {
      const userObject = {
        s_userName: user.name,
        s_userId: user.og_id,
        r_userName: userdeatils.username,
        r_userId: userdeatils.userId,
        status: true,
      };
      client.send(`/app/acc-rej`, {}, JSON.stringify(userObject));
      // remove that user from requestList
      const newReq = requests.filter((req) => {
        return req.og_id != user.og_id;
      });
      // update  the request count
      if (requestCount > 0) {
        setRequestCount(requestCount - 1);
      }
      dispatch(setRequest(newReq));
    } else {
      console.error("CLIENT IS NOT CONNECTED");
    }
  };

  return (
    <span className="dropdown">
      <FaRegUser
        className="dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="true"
      />
      <ul
        className={`dropdown-menu ${
          lightMode === "DARK"
            ? "bg-secondary text-white"
            : "bg-white text-black"
        }`}
      >
        {requests.map((user) => {
          // console.log(user);
          return (
            <li
              key={user.og_id}
              className={`text-white d-flex flex-row gap-4 justify-content-center align-items-center px-4 py-1 `}
            >
              <img
                style={{ width: "20px", height: "20px", borderRadius: "90%" }}
                src="/images/nodp.png"
                alt=""
              />
              <p
                className={`p-0 m-0 ${
                  lightMode === "DARK" ? "text-white" : "text-black"
                }`}
              >
                {user.name}
              </p>
              <button
                className={`${req.checkHover}  ${
                  lightMode === "DARK" ? "text-white" : "text-black"
                } d-flex justify-content-center align-items-center`}
                onClick={() => {
                  acceptOrRejectRequest(user);
                }}
              >
                <ImCheckmark id="req" className={` `} />
              </button>
              <button
                className={`${req.crossHover}  d-flex justify-content-center align-items-center`}
              >
                <ImCross
                  className={`${
                    lightMode === "DARK" ? "text-white" : "text-black"
                  } `}
                />
              </button>
            </li>
          );
        })}
      </ul>
      <p className={`m-0 p-0 ${req.reqCount}`}>{requestCount}</p>
    </span>
  );
};

export default Request;
