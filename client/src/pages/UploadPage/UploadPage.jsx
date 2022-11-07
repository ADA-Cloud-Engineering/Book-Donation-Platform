import {
  TransparentDropDown,
  TransparentInput,
} from "../../components/Inputs/Input";
import Banner from "../../components/Header/Banner";
import Navbar from "../../components/Header/Navbar";
import Button from "../../components/Button/Button";
import styles from "./styles.module.css";
const UploadPage = () => {
  const handleUpload = () => {};
  return (
    <div>
      <Navbar />
      <Banner />
      <h3 className={styles.book_upload_h3}>Book Information</h3>
      <div className={styles.book_upload_container}>
        <TransparentInput placeholder="Book Title" />
        <TransparentInput placeholder="Reference Number" />
        <TransparentDropDown
          placeholder="Format"
          data={["Paperback", "Hard Cover"]}
        />
        <TransparentDropDown
          placeholder="Language"
          data={["English", "Swahili", "French", "Arabic"]}
        />
        <TransparentInput placeholder="ISBN 13" />
        <TransparentInput placeholder="Release Date" />
        <TransparentInput placeholder="Publisher" />
        <TransparentInput placeholder="Weight" />
      </div>
      <div className={styles.upload_page_container}>
        <Button text="Upload" onClick={handleUpload} />
      </div>
    </div>
  );
};

export default UploadPage;
