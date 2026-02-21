import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PermissionRoute = ({ children, moduleKey }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (!user?.permissions?.[moduleKey]) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PermissionRoute;