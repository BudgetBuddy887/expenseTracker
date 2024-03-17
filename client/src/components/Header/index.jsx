// Header.jsx

// eslint-disable-next-line no-unused-vars
import React from "react";
import { Box, Flex, useColorModeValue, Spacer } from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const bgColor = useColorModeValue("white", "#333");
  const color = useColorModeValue("black", "white");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Box bg={bgColor} color={color} px={4} py={2} fontSize="2xl" className="header">
      <Flex className="h_flex">
        {isLoggedIn ? (
          <Box className="h_menu">
            <NavLink to="/dashboard" activeClassName="active" exact>
              Dashboard
            </NavLink>
            <NavLink to="/budget" activeClassName="active" exact>
              Budget
            </NavLink>
            <NavLink to="/expenses" activeClassName="active" exact>
              Expenses
            </NavLink>
            <NavLink to="/categories" activeClassName="active" exact>
              Categories
            </NavLink>
          </Box>
        ) : (
          <Box className="h_menu">
            <NavLink to="/" activeClassName="active" exact>
              Home
            </NavLink>
          </Box>
        )}
        <Spacer className="spacer" />
        {isLoggedIn ? (
          <Box>
            <NavLink to="/" activeClassName="active" exact>
              Logout
            </NavLink>
          </Box>
        ) : (
          <Box>
            <NavLink to="/login" activeClassName="active" exact>
              Login
            </NavLink>
            <NavLink to="/signup" activeClassName="active" exact>
              SignUp
            </NavLink>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
