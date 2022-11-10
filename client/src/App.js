import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import UploadPage from "./pages/UploadPage/UploadPage";
import BookDetails from "./pages/BookDetails/BookDetails";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
