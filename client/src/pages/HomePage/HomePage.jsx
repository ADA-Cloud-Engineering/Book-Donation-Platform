import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Book from "../../components/Book/Book";
import Button from "../../components/Button/Button";
import Banner from "../../components/Header/Banner";
import Navbar from "../../components/Header/Navbar";
import banner from "../../assets/images/Banner.png";
import { allBooks, categories, recentBooks } from "../../Utils/data";
import styles from "./styles.module.css";
import { getAllBooks } from "../../Services/Book";

const HomePage = () => {
  const [books, setBooks] = useState(allBooks);
  const getBooksByCategory = (cat) => {
    let filteredBooks = allBooks.filter((b) => {
      return b.category === cat;
    });
    setBooks(filteredBooks);
  };

  const fetchBooks = async () => {
    let response = await getAllBooks();
    console.log(response, "the response");
    // fetch("https://bookcontribution.herokuapp.com/list")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <Navbar auth />
      <Banner />
      <div className={styles.title_headers}>
        <h3>Book Categories</h3>
        <Link to="/upload">
          <Button text="Donate here" />
        </Link>
      </div>
      <div className={styles.sections}>
        <div className={styles.scrolling_row}>
          {categories.map((cat) => (
            <div
              key={cat}
              className={styles.cat_title}
              onClick={() => getBooksByCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        <div className={styles.scrolling_row}>
          {books.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      </div>
      <div className={styles.sections}>
        <div className={styles.title_headers}>
          <h3>Recent Donations</h3>
        </div>
        <div className={styles.scrolling_row}>
          {recentBooks.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      </div>
      <img src={banner} className={styles.homepage_banner} />
    </div>
  );
};

export default HomePage;
