import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";
import "./Navbar.css";

const Navbar = () => {
  
  const location = useLocation();

  return (
    <Box className="nav">
      <Box className="nav-container">
        <Link to="/" className="nav-logo">
          Doggo
        </Link>
        <Flex className="nav-content">
          <Link
            to="/list"
            className={`nav-list ${
              location.pathname === "/list" ? "selected" : ""
            }`}
          >
            List
          </Link>
          <Link
            to="/track"
            className={`nav-track ${
              location.pathname === "/track" ? "selected" : ""
            }`}
          >
            Track
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navbar;
