import React from "react";
import { Container, Logo } from "../index";
import { NavLink } from "react-router-dom";
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

          <DesktopNav />
          <Hamburger />
        </nav>
      </Container>
    </header>
  );
}
export default Header;
