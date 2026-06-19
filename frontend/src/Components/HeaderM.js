import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
 const [{ basket }] = useStateValue();
  return (
    <Nav>
      <Logo>
        <img src="./GRIN ENERGY.png" alt="Logo" />
      </Logo>

      <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </Hamburger>

      <Menu isOpen={menuOpen}>
        <a href="/">Home</a>
        <a href="/Product">Product</a>
        <a href="/aboutus">About Us</a>
        <a href="/contactus">Contact Us</a>
         {/* ✅ Cart link with basket count */}
        <Link to="/cart">🛒  ({basket?.length})</Link>
      </Menu>
    </Nav>
  );
}

const Nav = styled.nav`
//   background-color: #121212;
//   color: white;
//   padding-top: 12px 24px;
//   display: flex;
   justify-content: space-between;
   align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000; 
 width: 100%;
  height: 70px;
    // background-color:#353535;
     background: #48474d;
    // background: #48474d
    //  background:  #272727ff;
  display: flex;
//   position: sticky;    
//   top: 0;              
//   z-index:auto;

`;

const Logo = styled.div`
  img {
    width: 400px;
    height: auto;
       margin-top:10px;
      @media (max-width: 768px) {
      width: 300px;
      // margin-top:10px;
      //  margin-left:10px;
    }
  }
`;

const Hamburger = styled.div`
  font-size: 2rem;
  color: white;
  cursor: pointer;
  display: none;
 @media (max-width: 768px) {
    display: block;
       margin-right:20px;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 25px;
//   margin-top:25px; 
  margin-right:25px;
a {
    text-decoration: none;
    color: white;
    font-family:serif;
    font-weight: bold;
    font-size: 1.3rem;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      color: #00e8f7;
    }
  }

  @media (max-width: 768px) {
    position: absolute;
    width:100%;
    top: 60px;
    
    // left: 20px;
        background: linear-gradient(to bottom, #121212, #353535, #5c5b5b);
      //  background: #48474d;
    flex-direction: column;
     padding: 10px;
     padding-left:50px;
    border-radius: 5px;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    gap: 8px;
    z-index: 999;
    a{
    // color: #edf0f4ff ;
  font-family:serif;
    }
       
  }
`;


export default Header;
