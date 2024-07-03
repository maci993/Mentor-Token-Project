import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RegisterStartup from "./pages/Register-Startup.jsx";
import RegisterMentor from "./pages/Register-Mentor.jsx";
import ForgotPassword from "./pages/ForgotPass.jsx";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Mentors from "./pages/Mentors.jsx";
import Jobs from "./pages/Jobs.jsx";
import MyStats from "./pages/MyStats.jsx";
import JobFeed from "./pages/JobFeed.jsx";
import ErrorPage from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Layout nav={true} footer={true}>
            <Home />
          </Layout>
        ),
      },
      {
        path: "about",
        element: (
          <Layout nav={true} footer={true}>
            <About />
          </Layout>
        ),
      },
      {
        path: "contact",
        element: (
          <Layout nav={true} footer={true}>
            <Contact />
          </Layout>
        ),
      },
      {
        path: "login",
        element: (
          <Layout nav={false} footer={false}>
            <Login />
          </Layout>
        ),
      },
      {
        path: "register",
        element: (
          <Layout nav={false} footer={false}>
            <Register />
          </Layout>
        ),
      },
      {
        path: "register-startup",
        element: (
          <Layout nav={false} footer={false}>
            <RegisterStartup />
          </Layout>
        ),
      },
      {
        path: "register-mentor",
        element: (
          <Layout nav={false} footer={false}>
            <RegisterMentor />
          </Layout>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <Layout nav={false} footer={false}>
            <ForgotPassword />
          </Layout>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Layout nav={false} footer={false}>
            <Dashboard />
          </Layout>
        ),
      },
      {
        path: "mentors",
        element: (
          <Layout nav={false} footer={false}>
            <Mentors />
          </Layout>
        ),
      },
      {
        path: "jobs",
        element: (
          <Layout nav={false} footer={false}>
            <Jobs />
          </Layout>
        ),
      },
      {
        path: "my-stats",
        element: (
          <Layout nav={false} footer={false}>
            <MyStats />
          </Layout>
        ),
      },
      {
        path: "job-feed",
        element: (
          <Layout nav={false} footer={false}>
            <JobFeed />
          </Layout>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
