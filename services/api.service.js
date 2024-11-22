import axios, { Axios } from "axios";
import kc from "../config/keycloak";

export const AXIOS = axios.create({
  baseURL: "http://localhost:8182/rest/chat",
});

export const registerUser = async () => {
  // console.log(kc.token);
  const prods = await AXIOS.get("/register-user", {
    headers: {
      Authorization: `Bearer ${kc.token}`,
    },
  });
  return prods.data;
};

export const searchedUserList = async (pattern) => {
  console.log(pattern);
  try {
    const users = await AXIOS.get(`/search/users/${pattern}`, {
      headers: {
        Authorization: `Bearer ${kc.token}`,
      },
    });
    return users.data;
  } catch (err) {
    console.error(err);
    location.reload();
  }
};
export const getAllRequests = async () => {
  try {
    const users = await AXIOS.get(`/get/requests`, {
      headers: {
        Authorization: `Bearer ${kc.token}`,
      },
    });
    return users.data;
  } catch (err) {
    console.error(err);
    location.reload();
  }
};
export const getAllFriends = async () => {
  try {
    const users = await AXIOS.get(`/get/friends`, {
      headers: {
        Authorization: `Bearer ${kc.token}`,
      },
    });
    const data = await users.data;
    return data;
  } catch (err) {
    console.error(err);
    location.reload();
  }
};

export const getChats = async (senderId, receiverId) => {
  try {
    const chats = await AXIOS.get(`/get/chats/${senderId}/${receiverId}`, {
      headers: {
        Authorization: `Bearer ${kc.token}`,
      },
    });
    const data = (await chats).data;
    return data || [];
  } catch (err) {
    console.error(err);
    location.reload();
  }
};

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await AXIOS.post(`/upd-pro-image`, formData, {
      headers: {
        Authorization: `Bearer ${kc.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    const data = await response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};
export const deleteChatsAPI = async (loggedInUSer, selectedUser) => {
  try {
    const response = await AXIOS.get(
      `/delete/chats/${loggedInUSer}/${selectedUser}`,
      {
        headers: {
          Authorization: `Bearer ${kc.token}`,
        },
      }
    );
    console.log(response);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
