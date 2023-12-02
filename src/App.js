import { Route, Routes } from "react-router-dom";
import Header from "./Header.js"
import Footer from "./Footer.js";
import FeedbackForm from "./FeedbackForm.js";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <Header />
      <FeedbackForm />
      <Footer />
    </div>
  );
}

export default App;
