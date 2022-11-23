import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 flex items-center justify-center w-full h-12 bg-indigo-500">
      <Link to="/">
        <h3 className="text-2xl uppercase font-bold">video player</h3>
      </Link>
    </header>
  );
};

export default Header;
