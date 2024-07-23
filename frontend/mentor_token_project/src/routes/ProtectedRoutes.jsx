import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import  useAuth  from "../hooks/useAuth.jsx"
import PropTypes from "prop-types"


const ProtectedRoutes = ({ children }) => {
    const location = useLocation();
    const isAuth = useAuth();

    return useAuth ? (
        children
    ) : (
        <Navigate to= "/" replace state={{ from: location }} />
    );
  };

  ProtectedRoutes.propTypes = {
    children: PropTypes.node.isRequired,
  };

  export default ProtectedRoutes;
