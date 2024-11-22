import { useCallback, useEffect } from "react";
import { useAuth } from "../config/AuthContext";
import { getAllFriends, registerUser } from "../services/api.service";
import toast, { Toaster } from "react-hot-toast";
import HomePage from "./components/HomePage/HomePage";
import { setUserDetails } from "../redux/ContextRedux";
import { Provider, useDispatch } from "react-redux";
import Header from "./components/Common/Header";
import ChatArea from "./components/chat/ChatArea";
import ChatContext from "../config/ChatContext";
import { setRequest, setFriends } from "../redux/ContextRedux";
import { getAllRequests } from "../services/api.service";
import store from "../redux/ConfigureStore";
import ConfigureStore from "../redux/ConfigureStore";

function App() {
  const { isAuthenticated } = useAuth();
  // const userdeatils = useSelector((state) => state.userReducer.selectedUser);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      registerToBackend();
      // getting all requests
      getAllRequests()
        .then((data) => {
          dispatch(setRequest(data));
        })
        .catch((err) => {
          console.error("ERROR WHILE GETTING ALL THE REQUESTS ", err);
        });
      getAllFriends()
        .then((friends) => {
          dispatch(setFriends(friends));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isAuthenticated]);

  const registerToBackend = useCallback(async () => {
    const data = await registerUser();
    console.log(data);
    dispatch(setUserDetails(data));
  }, [isAuthenticated]);

  return (
    <>
      <Provider store={ConfigureStore}>
        <ChatContext>
          <Header />
        </ChatContext>
        {isAuthenticated ? (
          <ChatContext>
            <div>
              <ChatArea />
            </div>
          </ChatContext>
        ) : (
          <div>
            <HomePage />
            <h1>Login required</h1>
          </div>
        )}

        <Toaster />
      </Provider>
    </>
  );
}

export default App;
