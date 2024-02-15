import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";

const Header = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <h1>CryptoVerse</h1>
        <FaEthereum color="white" size={"30"} />
        <ul>
          <li>
            <Link className="url" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="url" to="/coins">
              Coins
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
