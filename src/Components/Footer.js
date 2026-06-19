import React from 'react'
import styled from 'styled-components'

function Footer() {
  return (
    <Nav>
        <p  className="hero-subtitle">© 2025 <strong className='grin'> GRIN ENERGY</strong>. All rights reserved.</p>
        <div>
          <a href="/Aboutus" 
        >About Us</a>
          <a href="/product">Products</a>
          <a href="/Contactus">Contacts</a>
         <a href="/TandC">Terms & Conditions</a>
          <a href="/Privacypolicy">Privacy Policy</a>
        </div>
      </Nav>
  )
}
const Nav = styled.nav`
text-align: center;
  padding: 1rem;
  background: #48474d ;
  color: white;
  color: white;
font-size: 1rem;
    width: 100%;
  margin-bottom: 1rem;
  text-align: center;
  position: static;
  a {
  color: #93c5fd;
  margin: 0 0.5rem;
  text-decoration: none;
  }

  a:hover {
  text-decoration: underline;
}
    @media only screen and (max-width: 700px){
    a{
    font-size:0.8rem;
    }
    }
`;

export default Footer