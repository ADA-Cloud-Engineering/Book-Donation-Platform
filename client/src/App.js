import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import UploadPage from "./pages/UploadPage/UploadPage";
import BookDetails from "./pages/BookDetails/BookDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
