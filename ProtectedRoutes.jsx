import { useOktaAuth } from '@okta/okta-react'
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoutes({ children }) {

    const { authState } = useOktaAuth();
    const location = useLocation();

    if (!authState || authState.isPending) {
        return <div>Loading...</div>;
    }

    if (authState.isAuthenticated) {
        // Redirect to login page, preserve the route they tried to access
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoutes