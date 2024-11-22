import { confirmAlert } from "react-confirm-alert";
import { deleteChatsAPI } from "../services/api.service";
import { useAuth } from "../config/AuthContext";

// confirm dialog box for delete chat
const removeChats = async (loggedInUser, selectedUser) => {
  try {
    const res = await deleteChatsAPI(loggedInUser, selectedUser);
    console.log(res.ok);
    if (!res) {
      throw new Error("UNABLE TO DELETE");
    }

    Array.from(document.getElementsByClassName("chats-li")).forEach((item) => {
      item.remove();
      location.reload();
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteChats = (loggedInUSer, selectedUser) => {
  confirmAlert({
    title: "Delete all the chats",
    message: "Are you sure to do this.",
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          removeChats(loggedInUSer, selectedUser);
        },
      },
      {
        label: "No",
        onClick: () => alert("Click No"),
      },
    ],
  });
};

// const removeFriend = async  (loggedInUSer, selectedUser)=>{

// }

// export const unfriendUser = (loggedInUSer, selectedUser) => {
//   confirmAlert({
//     title: "Unfriend",
//     message: "Are you sure to do this.",
//     buttons: [
//       {
//         label: "Yes",
//         onClick: () => {
//           removeChats(loggedInUSer, selectedUser);
//         },
//       },
//       {
//         label: "No",
//         onClick: () => alert("Click No"),
//       },
//     ],
//   });
// };
