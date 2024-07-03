import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout"
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterStartup from "./pages/Register-Startup";
import RegisterMentor from "./pages/Register-Mentor";
import ForgotPassword from "./pages/ForgotPass";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Mentors from "./pages/Mentors";
import Jobs from "./pages/Jobs";
import MyStats from "./pages/MyStats";
import JobFeed from "./pages/JobFeed";
import ErrorPage from "./pages/NotFound";

function App() {
  const userRole = "mentor";

  return (
    <>
      <Routes>
        <Route path="/" element={
           <Layout nav={true} footer={true}>
           <Home />
         </Layout>
        }/>
        <Route path="/about" element={
          <Layout nav={true} footer={true}>
          <About />
        </Layout>
        } />
        <Route path="/contact" element={
          <Layout nav={true} footer={true}>
            <Contact />
          </Layout>} />
        <Route path="/login" element={
          <Layout nav={false} footer={false}>
            <Login />
          </Layout>} />
        <Route path="/register" element={
          <Layout nav={false} footer={false}>
          <Register />
        </Layout>
        } />
        <Route path="/register-startup" element={
          <Layout nav={false} footer={false}>
            <RegisterStartup />
          </Layout>} />
        <Route path="/register-mentor" element={
          <Layout nav={false} footer={false}>
          <RegisterMentor />
        </Layout>
        } />
        <Route Path="/forgot-password" element={
          <Layout nav={false} footer={false}>
          <ForgotPassword />
        </Layout>
        } />

        <Route path="/side-bar" element={<SideBar role={userRole} />} />

        {userRole === "company" && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/jobs" element={<Jobs />} />
          </>
        )}
        {userRole === "mentor" && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/job-feed" element={<JobFeed />} />
            <Route path="/my-stats" element={<MyStats />} />
          </>
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
