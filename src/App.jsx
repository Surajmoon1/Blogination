import { useEffect, useState } from "react";
import authService from "./appwriteServices/authService";
import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header, Footer, Loading } from "./components/index.js";

function App() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="min-h-screen flex flex-wrap justify-center items-center bg-[#14293A] ">
      <div className="w-full block">
        <Header />
        <main className="py-8">
          <Outlet />
        </main>

        <section>
          <Footer />
        </section>
      </div>
    </div>
  );
}

export default App;
