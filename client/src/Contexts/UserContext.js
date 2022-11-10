import React, { useEffect, useReducer } from "react";
import { createContext } from "react";

const initialState = {
  isLogged: false,
  user_token: "",
};

const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "SET_IS_LOGGED":
      return {
        ...state,
        isLogged: payload,
      };
    case "SET_USER_TOKEN":
      return {
        ...state,
        user_token: payload,
      };
    default:
      return state;
  }
};
const UserContext = createContext(initialState);

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider
      value={{
        isLogged: state.isLogged,
        user_token: state.user_token,
        dispatch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
