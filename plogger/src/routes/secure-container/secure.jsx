import { Navigate } from "react-router-dom";
import { UserAuth } from "../../context/auth.context";

const Secure = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default Secure;
