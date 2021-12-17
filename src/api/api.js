import * as axios from "axios";

//===================================== configs

let axiosConfig = {
  baseURL: "http://domer.tech:9999/",
  headers: {
    "Content-Type": "application/json",
  },
};

// ======================== Users ========================

export const usersAPI = {
  getUsers() {
    return axios.get(`/users/`, axiosConfig);
  },

  addUser(form) {
    return axios.post(`/users/`, JSON.stringify(form), axiosConfig);
  },
};

// ======================== Tweets ========================

export const tweetsAPI = {
  getTweets() {
    return axios.get(`/tweets/`, axiosConfig);
  },

  addTweet(form) {
    return axios.post(`/tweets/`, JSON.stringify(form), axiosConfig);
  },
};
