import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth(); // replace this with your actual auth logic
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // or a spinner
    }

    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
};

export default PrivateRoute;