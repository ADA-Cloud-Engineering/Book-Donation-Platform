import {
  TransparentDropDown,
  TransparentInput,
} from "../../components/Inputs/Input";
import Banner from "../../components/Header/Banner";
import Navbar from "../../components/Header/Navbar";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import styles from "./styles.module.css";
import { useState } from "react";
// const UploadPage = () => {
//   const [values, setValues] = useState({
//     title: "",
//     refNo: "",
//     format: "",
//     language: "",
//     isbn3: "",
//     publisher: "",
//     releaseDate: "",
//     weight: "",
//   });
//   const handleUpload = () => {
//     console.log(values);
//   };
//   return (
//     <div>
//       <Navbar />
//       <Banner />
//       <h3 className={styles.book_upload_h3}>Book Information</h3>
//       <div className={styles.book_upload_container}>
//         <TransparentInput
//           width="45%"
//           textAlign="center"
//           type="text"
//           placeholder="Book Title"
//           // ref={(val) => (values.title = val)}
//         />
//         <TransparentInput
//           width="45%"
//           textAlign="center"
//           type="text"
//           placeholder="Reference Number"
//         />
//         <TransparentDropDown
//           width="45%"
//           textAlign="center"
//           placeholder="Format"
//           data={["Paperback", "Hard Cover"]}
//         />
//         <TransparentDropDown
//           width="45%"
//           textAlign="center"
//           type="text"
//           placeholder="Language"
//           data={["English", "Swahili", "French", "Arabic"]}
//         />
//         <TransparentInput
//           width="45%"
//           textAlign="center"
//           type="text"
//           placeholder="ISBN3"
//         />
//         <TransparentInput
//           width="45%"
//           textAlign="center"
//           type="text"
//           placeholder="Release Date"
//         />
//         <TransparentInput
//           width="45%"
//           textAlign="center"
//           type="text"
//           placeholder="Publisher"
//         />
//         <TransparentInput
//           width="45%"
//           textAlign="center"
//           type="text"
//           placeholder="Weight"
//         />
//       </div>
//       <div className={styles.upload_page_container}>
//         <Button
//           text="Upload"
//           onClick={() => {
//             console.log("uploaded");
//             handleUpload();
//           }}
//         />
//       </div>
//     </div>
//   );
// };

import React, { Component } from "react";
import { uploadBook, uploadBookImage } from "../../Services/Book";
import axios from "axios";
import UserContext from "../../Contexts/UserContext";
import { categories } from "../../Utils/data";
import { baseURL, uploadInstance } from "../../Services/https";
import { useNavigate } from "react-router";

const instance = axios.create();

export class UploadPage extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.authorRef = React.createRef();
    this.refNoRef = React.createRef();
    this.formatRef = React.createRef();
    this.languageRef = React.createRef();
    this.isbnRef = React.createRef();
    this.publisherRef = React.createRef();
    this.releaseDateRef = React.createRef();
    this.categoryRef = React.createRef();
    this.weightRef = React.createRef();
    this.fileRef = React.createRef();
    this.imageRef = React.createRef();
    this.state = { showModal: false, error: "", loading: false };
  }

  async uploadCloudinaryFiles() {
    const bookData = new FormData();
    const imageData = new FormData();
    //Images
    imageData.append("file", this.imageRef.current.files[0]);
    imageData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_IMAGE_PRESET
    );
    imageData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    //Files
    bookData.append("file", this.fileRef.current.files[0]);
    bookData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_BOOK_PRESET
    );
    bookData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    const [imageRes, bookRes] = await Promise.all([
      instance.post(process.env.REACT_APP_CLOUDINARY_URL, imageData),
      instance.post(process.env.REACT_APP_CLOUDINARY_URL, bookData),
    ]);
    let response = {
      imageURL: imageRes.data.url,
      fileURL: bookRes.data.url,
    };
    return response;
  }

  async handleUpload() {
    this.setState((state) => ({
      ...state,
      error: "",
    }));
    if (!this.context.isLogged) {
      this.setState((state) => ({
        ...state,
        showModal: true,
      }));
      return;
    }
    if (
      !this.titleRef.current.value ||
      !this.languageRef.current.value ||
      !this.formatRef.current.value ||
      !this.isbnRef.current.value ||
      !this.releaseDateRef.current.value ||
      !this.weightRef.current.value ||
      !this.publisherRef.current.value ||
      !this.refNoRef.current.value ||
      !this.categoryRef.current.value ||
      !this.fileRef.current.files[0]?.name ||
      !this.imageRef.current.files[0]?.name
    ) {
      this.setState({ error: "Please fill out all fields" });
      return;
    } else {
      this.setState((state) => ({
        ...state,
        loading: true,
      }));
      let { imageURL, fileURL } = await this.uploadCloudinaryFiles();

      let body = {
        title: this.titleRef.current.value,
        author: this.authorRef.current.value,
        referencenumber: this.refNoRef.current.value,
        format: this.formatRef.current.value,
        language: this.languageRef.current.value,
        isbn3: `ISBN:${this.isbnRef.current.value}`,
        releasedate: new Date(this.releaseDateRef.current.value).toISOString(),
        publisher: this.publisherRef.current.value,
        weight: this.weightRef.current.value,
        imageUrl: imageURL,
        category: this.categoryRef.current.value,
        fileUrl: fileURL,
      };

      let res = uploadInstance
        .post("/upload", body, {
          headers: { Authorization: `Bearer ${this.context.user_token}` },
        })
        .then((response) => response)
        .then((res) => {
          this.setUserBooks(res.data.data);
          alert("Book uploaded");
          this.props.changeKey();
        });
    }
  }
  setUserBooks(book) {
    let user_books = [...this.context.user_books, book];
    localStorage.setItem("books", JSON.stringify(user_books));
    this.context.dispatch({ type: "SET_USER_BOOKS", payload: user_books });
    this.setState((state) => ({
      ...state,
      loading: false,
    }));
  }

  render() {
    return (
      <div>
        <Navbar />
        <Banner />
        <h3 className={styles.book_upload_h3}>Book Information</h3>
        <div className={styles.book_upload_container}>
          <TransparentInput
            width="45%"
            ref={this.titleRef}
            textAlign="center"
            type="text"
            placeholder="Book Title"
          />
          <TransparentInput
            width="45%"
            ref={this.authorRef}
            textAlign="center"
            type="text"
            placeholder="Author"
          />
          <TransparentInput
            width="45%"
            ref={this.fileRef}
            textAlign="center"
            type="file"
            placeholder="Select File"
            accept="application/pdf, .mp3,audio/*"
          />
          <TransparentInput
            width="45%"
            ref={this.imageRef}
            textAlign="center"
            type="file"
            placeholder="Select Thumbnail"
            accept="image/png, image/gif, image/jpeg"
          />
          <TransparentInput
            width="45%"
            ref={this.refNoRef}
            textAlign="center"
            type="text"
            placeholder="Reference Number"
          />
          <TransparentDropDown
            width="45%"
            ref={this.formatRef}
            textAlign="center"
            placeholder="Format"
            data={["Pdf", "Audio Book(mp3)"]}
          />
          <TransparentDropDown
            width="45%"
            ref={this.languageRef}
            textAlign="center"
            type="text"
            placeholder="Language"
            data={["English", "Swahili", "French", "Arabic"]}
          />
          <TransparentDropDown
            width="45%"
            ref={this.categoryRef}
            textAlign="center"
            type="text"
            placeholder="Category"
            data={categories}
          />
          <TransparentInput
            width="45%"
            ref={this.isbnRef}
            textAlign="center"
            type="text"
            placeholder="ISBN3"
          />
          <TransparentInput
            width="45%"
            ref={this.releaseDateRef}
            textAlign="center"
            type="date"
            placeholder="Release Date"
          />
          <TransparentInput
            width="45%"
            ref={this.publisherRef}
            textAlign="center"
            type="text"
            placeholder="Publisher"
          />
          <TransparentInput
            width="45%"
            ref={this.weightRef}
            textAlign="center"
            type="text"
            placeholder="Weight"
          />
        </div>
        <div className={styles.upload_page_actions}>
          <p className={styles.errorText}>{this.state.error}</p>
          <Button
            text="Upload"
            loading={this.state.loading}
            onClick={() => {
              this.handleUpload();
            }}
          />
        </div>
        {this.state.showModal && (
          <Modal
            handleClose={() => {
              this.setState((state) => ({
                ...state,
                showModal: false,
              }));
            }}
            show={this.state.showModal}
            message="Please login to continue"
            doAction={() => this.props.navigate("/login")}
            doActionMessage="Login"
          />
        )}
      </div>
    );
  }
}

export const UploadPageWithRouter = () => {
  const [key, setKey] = useState(Math.random() * 999);
  const navigate = useNavigate();

  const changeKey = () => {
    setKey(Math.random() * 999);
  };
  return <UploadPage navigate={navigate} key={key} changeKey={changeKey} />;
};
export default UploadPageWithRouter;
