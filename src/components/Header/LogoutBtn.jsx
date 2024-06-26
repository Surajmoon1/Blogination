import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authServices from "../../appwriteServices/authService";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    authServices.logout().then(() => {
      dispatch(logout());
      navigate("/login");
      setLoading(false);
    });
  };
  return loading ? (
    <Loading />
  ) : (
    <button
      onClick={handleLogout}
      className="inline-block py-3 w-1/2 px-6 text-2xl bg-blue-600  duration-500 text-black font-bold rounded-full hover:bg-blue-800 hover:text-white"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
