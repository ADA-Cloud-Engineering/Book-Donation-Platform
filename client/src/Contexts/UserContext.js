import React, { useEffect, useReducer } from "react";
import { createContext } from "react";
let token = localStorage.getItem("user_token");
let books = JSON.parse(localStorage.getItem("books"));

const initialState = {
  isLogged: token ? true : false,
  user_token: token,
  user_books: books ? books : [],
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
    case "SET_USER_BOOKS":
      return {
        ...state,
        user_books: payload,
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
        user_books: state.user_books,
        dispatch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
