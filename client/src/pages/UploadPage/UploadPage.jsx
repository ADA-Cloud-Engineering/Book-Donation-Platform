import {
  TransparentDropDown,
  TransparentInput,
} from "../../components/Inputs/Input";
import Banner from "../../components/Header/Banner";
import Navbar from "../../components/Header/Navbar";
import Button from "../../components/Button/Button";
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
    this.state = { isLogged: localStorage.getItem("user_token"), error: "" };
  }

  async uploadImage() {
    const formData = new FormData();
    const data = new FormData();
    data.append("file", this.imageRef.current.files[0]);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_IMAGE_PRESET);
    formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    const res = await instance.post(process.env.REACT_APP_CLOUDINARY_URL, data);
    return res.data.url;
  }
  async handleUpload() {
    this.setState({ error: "" });
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
      !this.fileRef.current.files[0].name ||
      !this.imageRef.current.files[0].name
    ) {
      this.setState({ error: "Please fill out all fields" });
      return;
    } else {
      let imageURL = await this.uploadImage();
      let formData = new FormData();
      formData.append("title", this.titleRef.current.value);
      formData.append("author", this.authorRef.current.value);
      formData.append("referencenumber", this.refNoRef.current.value);
      formData.append("format", this.formatRef.current.value);
      formData.append("language", this.languageRef.current.value);
      formData.append("isbn3", this.isbnRef.current.value);
      formData.append(
        "releasedate",
        new Date(this.releaseDateRef.current.value).toISOString()
      );
      formData.append("publisher", this.publisherRef.current.value);
      formData.append("weight", this.weightRef.current.value);
      formData.append("imageUrl", imageURL);
      formData.append("category", this.categoryRef.current.value);
      formData.append("downloadurl", this.fileRef.current.files[0]);
      let res = uploadInstance
        .post("/upload", formData)
        .then((response) => {})
        .then((res) => console.log(res, "the then again"));
    }
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
        <div className={styles.upload_page_container}>
          <p className={styles.errorText}>{this.state.error}</p>
          <Button
            text="Upload"
            onClick={() => {
              this.handleUpload();
            }}
          />
        </div>
      </div>
    );
  }
}

export default UploadPage;
