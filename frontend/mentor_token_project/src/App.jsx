import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login"
import Register from "./pages/Register"
import RegisterStartup from "./pages/Register-Startup";
import RegisterMentor from "./pages/Register-Mentor";


function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* <Switch> */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/register-startup" element={<RegisterStartup/>} />
        <Route path="/register-mentor" element={<RegisterMentor/>} />
        {/* </Switch> */}
      </Routes>
      
    </>
  );
}

export default App;
