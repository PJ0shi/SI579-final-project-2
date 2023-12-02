import { Route, Routes } from "react-router-dom";
import Header from "./Header.js"
import Footer from "./Footer.js";
import Note from "./Note.js";
import Form1 from "./Form1.js";
import Problem4 from "./Problem4.js";

function App() {
  return (
    <div>
      <Header />
      {/* <Problem4 /> */}
      <Form1 />
      {/* <Note title="Title" content="content"/> */}
      <Footer />
    </div>
  );
}

export default App;
