import { Navigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // const decoded = jwtDecode(token);

  if (!token) {
    // Not logged in → redirect to homepage
    return <Navigate to="/Admin" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.role !== "admin") {
      // Logged in but not admin → block access
      return <Navigate to="/" replace />;
    }

    return children; // ✅ Admin allowed
  } catch (err) {
    return <Navigate to="/Admin" replace />;
  }
};

export default ProtectedRoute;
