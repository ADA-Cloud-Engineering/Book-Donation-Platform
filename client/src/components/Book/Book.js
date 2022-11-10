import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Book = ({ book }) => {
  return (
    <div className={styles.book}>
      <Link to="/book-details" state={{ id: book.id }}>
        <div className={styles.book_img}>
          <img src={book.img} />
        </div>
        <div className={styles.book_details}>
          <p>
            <span>Title : </span>
            <span>{book.title}</span>
          </p>
          <p>
            <span>Author : </span>
            <span>{book.author}</span>
          </p>
          <p>
            <span>Donated By : </span>
            <span>{book.donated_by}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Book;
