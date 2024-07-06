import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import App from "./App.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RegisterStartup from "./pages/Register-Startup.jsx";
import RegisterMentor from "./pages/Register-Mentor.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import StartupDashboard from "./pages/StartupDashboard.jsx";
import Mentors from "./pages/Mentors.jsx";
import Jobs from "./pages/Jobs.jsx";
import MyStats from "./pages/MyStats.jsx";
import JobFeed from "./pages/JobFeed.jsx";
import ErrorPage from "./pages/NotFound";
import "./App.css";


const userRole = "company"; // or "company"


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
      ...(userRole === "company" ? [
        {
          path: "dashboard-startup",
          element: (
            <Layout nav={false} footer={false}>
              <StartupDashboard />
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
      ] : []),
      ...(userRole === "mentor" ? [
        {
          path: "dashboard",
          element: (
            <Layout nav={false} footer={false}>
              <Dashboard />
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
        {
          path: "my-stats",
          element: (
            <Layout nav={false} footer={false}>
              <MyStats />
            </Layout>
          ),
        },
      ] : []),
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <UserProvider>
    <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
