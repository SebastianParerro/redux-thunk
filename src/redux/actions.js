import { tweetsAPI, usersAPI } from "../api/api";

export const SET_USERS = "SET_USERS";
export const SET_TWEETS = "SET_TWEETS";

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const requestUsers = () => async (dispatch) => {
  try {
    let response = await usersAPI.getUsers();
    dispatch(setUsers(response.data));
  } catch (e) {
    console.log(e);
  }
};

export const createUser = (form) => {
  return async (dispatch) => {
    try {
      const response = await usersAPI.addUser(form);
      if (response.data.success) {
        alert("Пользователь добавлен");
      }
    } catch (e) {
      console.log(e);
    }
  };
};

// ======================================

export const setTweets = (tweets) => ({
  type: SET_TWEETS,
  payload: tweets,
});

export const requestTweets = () => async (dispatch) => {
  try {
    let response = await tweetsAPI.getTweets();
    dispatch(setTweets(response.data));
  } catch (e) {
    console.log(e);
  }
};

export const createTweet = (form) => {
  return async (dispatch) => {
    try {
      const response = await tweetsAPI.addTweet(form);
      if (response.data.success) {
        alert("Твит добавлен");
      }
    } catch (e) {
      console.log(e);
    }
  };
};
