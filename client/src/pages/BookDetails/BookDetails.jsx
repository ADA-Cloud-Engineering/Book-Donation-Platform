import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Banner from "../../components/Header/Banner";
import Navbar from "../../components/Header/Navbar";
import styles from "./styles.module.css";
import { allBooks } from "../../Utils/data";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const BookDetails = () => {
  const location = useLocation();
  const [book, setBook] = useState({});

  useEffect(() => {
    let res = allBooks.find((b) => b.id === location.state.id);
    setBook(location.state.id);
  }, [location.state.id]);
  return (
    <div>
      <Navbar auth />
      <Banner />
      <div className={styles.book_container}>
        <div
          className={styles.book_container_img}
          style={{ backgroundImage: `url(${book.imageUrl})` }}
        >
          <img src={book.imageUrl} alt="book cover" style={{ width: "100%" }} />
        </div>
        <div className={styles.book_details_container}>
          <h3>{book.title}</h3>
          <p>
            <span>Book By:</span>
            <span>{book.author}</span>
          </p>
          <a href={book.downloadurl} target="_blank">
            <Button text="Download" />
          </a>

          <h1>Book Overview</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit illum
            accusamus nulla inventore voluptatum sequi ratione illo facere ipsum
            eveniet laborum aliquid porro, expedita itaque quidem veniam rem
            recusandae rerum.
          </p>

          <div className={styles.book_details_details}>
            <div className={styles.book_details_header}>Edition Details</div>
            <div className={styles.book_details_details_info}>
              <p>
                <span>Format</span>
                <span>{book.format}</span>
              </p>
              <p>
                <span>Language</span>
                <span>{book.language}</span>
              </p>
              <p>
                <span>ISBN</span>
                <span>{book.isbn3}</span>
              </p>

              <p>
                <span>Release Date</span>
                <span style={{ whiteSpace: "nowrap" }}>
                  {new Date(book.releasedate).toDateString()}
                </span>
              </p>
              <p>
                <span>Publisher</span>
                <span>{book.publisher}</span>
              </p>
              <p>
                <span>Weight</span>
                <span>{book.weight}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
