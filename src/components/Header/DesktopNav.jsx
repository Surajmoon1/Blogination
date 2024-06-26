import React from "react";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function DesktopNav() {
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
    {
      name: "My Posts",
      path: "/my-post",
      active: authStatus,
    },
    {
      name: "Profile",
      path: "/profile",
      active: authStatus,
    },
  ];

  return (
    <ul className="md:flex ml-auto gap-2 hidden">
      {navItems.map((item) =>
        item.active ? (
          <li key={`DesktopNav${item.name}`} className="text-white">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `inline-block py-2 px-6 duration-500 rounded-full hover:bg-[#6ee2f5] hover:text-black ${
                  isActive ? "text-[#eaa79c]  border-y-2 scale-110" : "white"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ) : null
      )}

      {/* {authStatus && (
        <li>
          <LogoutBtn />
        </li>
      )} */}
    </ul>
  );
}

export default DesktopNav;
