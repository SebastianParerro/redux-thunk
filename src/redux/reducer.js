import { SET_TWEETS, SET_USERS } from "./actions";

const initialState = {
  users: [],
  tweets: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload.data };

    case SET_TWEETS:
      return { ...state, tweets: action.payload.data };

    default:
      return state;
  }
};
