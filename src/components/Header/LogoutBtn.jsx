import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authServices from "../../appwriteServices/authService";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    authServices.logout().then(() => {
      dispatch(logout());
      navigate('/login')
    });
  };
  return (
    <button
      onClick={handleLogout}
      className="inline-block px-6 py-2 duration-200 ease-in-out hover:bg-blue-100 rounded-full"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
