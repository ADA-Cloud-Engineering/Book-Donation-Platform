import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";
import { allBooks } from "../../Utils/data";
import styles from "./styles.module.css";
import UserContext from "../../Contexts/UserContext";

const Navbar = ({ noSearch, auth }) => {
  const navigate = useNavigate();
  const { isLogged } = useContext(UserContext);
  const handleBookLoad = (id) => {
    navigate("/book-details", { state: { id: id } });
  };
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
              data={allBooks}
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
