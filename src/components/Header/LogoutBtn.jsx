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
      className="inline-block py-2 px-6 duration-500 text-white rounded-full hover:bg-[#52c7d9] hover:text-black"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
