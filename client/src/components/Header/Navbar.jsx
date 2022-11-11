import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";
import { allBooks } from "../../Utils/data";
import styles from "./styles.module.css";
import UserContext from "../../Contexts/UserContext";
import { getAllBooks } from "../../Services/Book";

const Navbar = ({ noSearch, auth }) => {
  const navigate = useNavigate();
  const { isLogged } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const handleBookLoad = (id) => {
    navigate("/book-details", { state: { id: id } });
  };

  const fetchBooks = async () => {
    let response = await getAllBooks();
    let data = response.data.data;
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className={styles.header_navbar}>
      <Link to="/" className={styles.header_logo}>
        Help out together
      </Link>
      <div className={styles.header_others}>
        {!isLogged && auth && (
          <div className={styles.header_auth_btns}>
            <Link to="/register" className={styles.header_auth_btns_reg}>
              Register
            </Link>
            <Link to="/login" className={styles.header_auth_btns_log}>
              Login
            </Link>
          </div>
        )}
        {!noSearch && (
          <div className={styles.header_profile}>
            <SearchBar
              data={books}
              placeholder="Enter book name"
              searchParam="title"
              onClick={(id) => handleBookLoad(id)}
            />
            {isLogged && (
              <Link to="/profile">
                <FaUserCircle size="30px" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
