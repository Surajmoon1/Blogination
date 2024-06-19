import React from "react";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function MobileNav() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <ul className="flex flex-col fixed top-24 left-0 right-0 bottom-0 justify-center items-center z-50 bg-slate-800 opacity-90 ml-auto gap-1 md:hidden">
      {navItems.map((item) =>
        item.active ? (
          <li key={`MobileNav${item.name}`} className="text-white">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `inline-block py-2 px-6 duration-500 rounded-full hover:bg-[#52c7d9] hover:text-black ${
                  isActive ? "text-[#eaa79c] border-y-2" : "white"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ) : null
      )}
      {authStatus && (
        <li>
          <LogoutBtn />
        </li>
      )}
    </ul>
  );
}

export default MobileNav;
