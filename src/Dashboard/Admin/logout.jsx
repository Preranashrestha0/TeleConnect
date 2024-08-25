import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ handleLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, [handleLogout, navigate]);

  return null; // No need to render anything, just redirect
};

export default Logout;
