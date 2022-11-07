import React from "react";
import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import SearchBar from "../SearchBar/SearchBar";
import { allBooks } from "../../Utils/data";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const handleBookLoad = (id) => {
    console.log(id, "from search");
    navigate("/book-details", { state: { id: id } });
  };
  return (
    <div className={styles.header_navbar}>
      <div style={{ flex: 1, textAlign: "left" }}>Help out together</div>
      <SearchBar
        data={allBooks}
        placeholder="Enter book name"
        searchParam="title"
        onClick={(id) => handleBookLoad(id)}
      />
    </div>
  );
};

export default Navbar;
