import { useEffect, useState } from "react";
import authService from "./appwriteServices/authService";
import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index.js";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? null : (
    <div className="min-h-screen flex flex-wrap justify-center items-center text-white bg-gray-800">
      <div className="w-full block text-center">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default App;
