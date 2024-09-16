import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RegisterStartup from "./pages/Register-Startup.jsx";
import RegisterMentor from "./pages/Register-Mentor.jsx";
import StartupDashboard from "./pages/StartupDashboard.jsx";
import MentorDashboard from "./pages/MentorDashboard.jsx";
// import Mentors from "./pages/Mentors.jsx";
// import Jobs from "./pages/Jobs.jsx";
import MyStats from "./pages/MyStats.jsx";
import JobFeed from "./pages/JobFeed.jsx";
// import Jobs from "./pages/Jobs.jsx";
import Mentors from "./pages/Mentors.jsx";
import MentorDetail from "./pages/MentorDetail.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import { jwtDecode } from "jwt-decode";
import "./App.css";

// const type = "company"; // or "mentor"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
        path: "dashboard-startup",
        element: (
          <ProtectedRoutes>
            <Layout nav={false} footer={false}>
              <StartupDashboard />
            </Layout>
          </ProtectedRoutes>
        ),
      },
      {
        path: "mentors",
        element: (
          <ProtectedRoutes>
            <Layout nav={false} footer={false}>
              <Mentors />
            </Layout>
          </ProtectedRoutes>
        ),
      },
      {
        path: "mentors/:id",
        element: (
          <ProtectedRoutes>
            <Layout nav={false} footer={false}>
              <MentorDetail />
            </Layout>
          </ProtectedRoutes>
        ),
      },
      {
        path: "jobs",
        element: (
          <ProtectedRoutes>
            <Layout nav={false} footer={false}>
              <JobFeed />
            </Layout>
          </ProtectedRoutes>
        ),
      },
      {
        path: "dashboard-mentor",
        element: (
          <ProtectedRoutes>
            <Layout nav={false} footer={false}>
              <MentorDashboard />
            </Layout>
          </ProtectedRoutes>
        ),
      },
      {
        path: "job-feed",
        element: (
          <ProtectedRoutes>
            <Layout nav={false} footer={false}>
              <JobFeed />
            </Layout>
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-stats",
        element: (
          <ProtectedRoutes>
            <Layout nav={false} footer={false}>
              <MyStats />
            </Layout>
          </ProtectedRoutes>
        ),
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <ErrorPage />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
