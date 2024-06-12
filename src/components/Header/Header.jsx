import React from "react";
import { Container, Logo } from "../index";
import { NavLink  } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import Hamburger from "./Hamburger";


function Header() {
  

  return (
    <header className="sticky top-0 z-50 shadow-2xl bg-gray-900">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <NavLink to="/">
              <Logo width="100px" />
            </NavLink>
          </div>
          {/* <ul className="flex ml-auto gap-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="text-white">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `inline-block py-2 px-6 duration-500 rounded-full hover:bg-[#52c7d9] hover:text-black ${
                        isActive ? "text-[#eaa79c] " : "white"
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
          </ul> */}

          <DesktopNav />
          <Hamburger />
        </nav>
      </Container>
    </header>
  );
}
export default Header;
