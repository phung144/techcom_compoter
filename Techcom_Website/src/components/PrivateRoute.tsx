import { Navigate } from "react-router-dom";
import { ReactNode } from "react"; // Import ReactNode để định nghĩa kiểu cho children

interface PrivateRouteProps {
  children: ReactNode; 
  isAuthenticated: boolean; 
  isAdmin: boolean; 
}



const PrivateRoute = ({ children, isAuthenticated }: PrivateRouteProps) => {
  const userRole = localStorage.getItem("role"); 
  const isAdmin = userRole === "admin"; 

  console.log("User Role:", userRole); 
  console.log("isAuthenticated:", isAuthenticated); 

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/no-permission" />;
  }

  return children;
};


export default PrivateRoute;
