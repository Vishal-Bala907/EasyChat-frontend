import { IoIosAddCircleOutline } from "react-icons/io";
import "./../../../public/styles/SearchUsers.css";
import { useChatContext } from "../../../config/ChatContext";
import { useSelector } from "react-redux";
const SearchUsers = ({ searchedUsers }) => {
  // console.log(searchedUsers);
  const { client } = useChatContext();
  const userdeatils = useSelector((state) => state.userReducer.userdeatils);
  const addThisUser = (user) => {
    // Ensure client is available and connected
    if (client && client.connected) {
      // Sending a message to the specified destination
      // creating add req
      const userObject = {
        s_userName: userdeatils.username,
        s_userId: userdeatils.userId,
        r_userName: user.name,
        r_userId: user.og_id,
      };

      client.send(`/app/add-req`, {}, JSON.stringify(userObject));
    } else {
      console.error("Client not initialized or not connected");
    }
  };
  return (
    <section className="rounded-4 chatArea d-flex flex-col w-100">
      <ul className="my-4 p-0 d-flex justify-content-center align-items-center flex-column search w-100">
        {searchedUsers.length !== 0 &&
          searchedUsers.map((user) => {
            return (
              <li
                key={user.id}
                id={user.id}
                className="d-flex flex-row justify-content-center align-items-center py-2 rounded-2 gap-3 w-100"
              >
                <img
                  className="icon-H-W my-border-radius"
                  src="/images/nodp.png"
                  alt=""
                />
                <p className="m-0 p-0">{user.name}</p>
                <IoIosAddCircleOutline
                  className="icon-H-W px-0 "
                  onClick={() => {
                    addThisUser(user);
                    // console.log(user);
                  }}
                />
                <hr />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default SearchUsers;
