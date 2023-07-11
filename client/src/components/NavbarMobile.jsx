import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { ContactPage, Home, NoteAlt, Search, Shop } from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
const NavbarMobile = () => {
  return (
    <div className=" fixed bg-slate-900 text-gray-100 rounded-lg bg right-0 top-10 h-screen w-1/2 p-10">
      <div className="navbar-center">
        <ul className=" flex items-center flex-col justify-between gap-10 font-YsabeauInfant">
          <li className=" flex items-center gap-1 ">
            <Home />
            <Link to="/">Home</Link>
          </li>
          <li className=" flex items-center gap-1 ">
            <Shop/>
            <Link to="/shop">Shop</Link>
          </li>
          <li className=" flex items-center gap-1 ">
            <NoteAlt/>
            <Link to="/blog">Blog</Link>
          </li>
          <li className=" flex items-center gap-1 ">
            <ContactPage/>
            <Link to="/contacts">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarMobile;
