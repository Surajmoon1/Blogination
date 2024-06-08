import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authServices from "../../appwriteServices/authService";
import { useNavigate } from "react-router-dom";
// import Loading from "../Loading";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

    // const [loading, setLoading] = useState(false);


  const handleLogout = () => {
    // setLoading(true)
    authServices.logout().then(() => {
      dispatch(logout());
      navigate('/login')
      // setLoading(false)
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
