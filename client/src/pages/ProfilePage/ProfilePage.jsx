import React, { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import Banner from "../../components/Header/Banner";
import Navbar from "../../components/Header/Navbar";
import UserContext from "../../Contexts/UserContext";
import styles from "./styles.module.css";
const ProfilePage = () => {
  const { user_books } = useContext(UserContext);

  return (
    <div>
      <Navbar />
      <Banner />
      <div className={styles.profile_section}>
        <h2>My Profile</h2>
        <div className={`${styles.section} ${styles.profile_details}`}>
          <div className={styles.profile_avatar}>
            <FaUserCircle />
          </div>
          <div className={styles.profile_info}>
            <h3>Welcome, Jane Doe</h3>
          </div>
        </div>
        <div className={`${styles.section} ${styles.books_section}`}>
          <h3>My Donated Books</h3>
          <ul>
            {user_books.map((book, index) => (
              <li key={book._id}>
                {index + 1} - {book.title}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.section} ${styles.books_section}`}>
          <h3>My Downloaded Books</h3>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
