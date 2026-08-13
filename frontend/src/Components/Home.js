
import {useNavigate} from 'react-router-dom';
import React from "react";
import { useState,useEffect } from 'react';
import axios from '../axios';
import Footer from './Footer';
// import Header from './Header';
// import Carousel from 'react-bootstrap/Carousel';
import styled from "styled-components";

export default function HomePage() {
  let navigate= useNavigate();
const [showForm, setShowForm] = useState(false);
const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
 const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

 try {
    const res = await axios.post("/enquiry/post", formData);
    if (res.status === 200) {
      setSuccess(true);
      setName("");
      setContact("");
      setEmail("");
      setMessage("");
    }
  } catch (err) {
    console.error("Failed to send enquiry:", err);
    alert("Something went wrong. Please try again.");
  }

  };
   
  return (
    
    <div className="homepage">

    {/* <Header/> */}

     {/* <section className="hero-section" >
         <div className="logo-container"  >
        <img src='./GRIN ENERGY.png'alt="logo" className="site-logo" />
       
        </div>
        <div className="hero-content">
        <h1 className="hero-title">
          Empowering the Future of Electric Mobility
        </h1>
        <p className="hero-subtitle">
          End-to-end EV Drivetrain & Charging Solutions — Engineered for Performance, Built for Sustainability
        </p>
        <div className='homeButton'>
          <button className="cta-button secondary"onClick={()=>{
          navigate('/Aboutus')
        }}>About Us</button>
        <button className="cta-button secondary"  onClick={()=>{
          navigate('/product')}}>Explore Our Products</button>
          <button className="cta-button secondary" onClick={()=>{
          navigate('/Contactus')}} >Contact Us</button>
        </div>
        </div>
      </section> */}

      <StickyLogo>
<img src='./GRIN ENERGY.png' alt="logo"/>

{/* <h2>GRIN ENERGY</h2> */}
</StickyLogo>

<HeroSection>

<HeroTitle>Empowering the Future of Electric Mobility</HeroTitle>
    <EnergyLine />
<p>
End-to-end EV Drivetrain & Charging Solutions — Engineered for
Performance, Built for Sustainability
</p>

<ButtonGroup>

<button onClick={()=>{navigate('/Aboutus')}}>About Us</button>

<button onClick={()=>{
          navigate('/product')
        }}>Explore Our Products</button>

<button onClick={()=>{
          navigate('/Contactus')
        }}>Contact Us</button>

</ButtonGroup>

</HeroSection>

      {/* Welcome Section */}
      <section className="welcome-section" >
        <h2 className="welcome-title">Welcome to<strong className='grin'> GRIN ENERGY</strong></h2>
        <p style={{textAlign:'start'}}>
          Founded in <strong>2021</strong>, <strong className='grin'> GRIN ENERGY</strong> is committed to driving the EV revolution by delivering 
          <strong> high-performance drivetrain systems</strong> and <strong>smart EV charging solutions</strong>. 
          Whether you’re building electric vehicles or powering infrastructure, we bring innovation, reliability, and support to every project.
        </p>
        <div >
          <a href='/Aboutus' 
        >Learn More About Us →</a>
        </div>
   </section>
 
      <section className="offer-section">
           <h1 style={{paddingBottom:'3%'}}>What We Offer</h1>
        <div className="offer-grid">
       
          <div className="offer-box">
            <h3 >🔋 EV Drivetrain Systems</h3>
            <p>
              Efficient, customizable solutions for 2W, 3W, and 4W vehicles — motors, controllers, and integrated powertrains.
            </p>
          </div>
          <div className="offer-box">
            <h3>⚡ EV Charging Solutions</h3>
            <p>
              AC & DC chargers with OCPP support, suited for homes, fleets, and public infrastructure.
            </p>
          </div>
          <div className="offer-box">
            <h3 >🧠 Integration Support</h3>
            <p>
              From product matching to firmware tuning, we help you deploy faster with total confidence.
            </p>
          </div>
        </div>
        <div  style={{marginTop:'50px'}}>
          <a href='/product'>Explore Our Products →</a>
        </div>
      </section>

       
      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <h2>Why Choose <strong className='grin'> GRIN ENERGY</strong>?</h2>

         <ul >
          <li className='li'>✅ Technology-Driven EV Solutions</li>
          <li className='li'>✅ Proven Reliability & Performance</li>
          <li className='li'>✅ Fast, Friendly Technical Support</li>
          <li className='li'>✅ Scalable for Startups to Large OEMs</li>
          <li className='li'>✅ Focused on Clean Energy & Long-Term Sustainability</li>
        </ul>
       <button
    className="cta-button secondary"
    onClick={() => setShowForm(!showForm)}
    style={{ margin: '20px 0' }}
  >
    {showForm ? "Close Enquiry Form" : "Get a Custom Quote"}
  </button>

  {showForm && (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9"
      }}
    >
      <input className='homeinput'
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
     
      <input className='homeinput'
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input className='homeinput'
        type="text"
        name="contact"
        placeholder="Your Contact Number"
        value={formData.contact}
        onChange={handleChange}
        required
      />
      <textarea className='homeinput'
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        rows="4"
        required
      />
      <button type="submit" className="cta-button primary">
        Send Message
      </button>
      {/* {status && <p style={{ color: "green", fontWeight: "bold" }}>{status}</p>} */}
        {success && <p style={{ color: "green",textAlign:'center' }}>Message sent successfully!</p>}
    </form>
  )}



       
       
      </section>
      <div className='aboutusdiv' >
        <a href='/Contactus'
         style={{fontSize:'2rem'}}><strong>Join Us</strong></a>
        <p >Be part of the electric revolution. Partner with<strong style={{color:'#049b0b'}}> GRIN ENERGY</strong> and drive the world forward — sustainably.</p>
      </div>

      {/* Contact CTA Section */}
      <section className="home-section">
        <h2>Ready to Electrify Your Project?</h2>
        <p>Whether you're an OEM, a startup, or a fleet operator — we're here to help.</p>
        <p>📞 Call Us: +91-8788449561</p>
        <p>📧 Email: info@grinenergy.in</p>
      </section>
      
      <Footer></Footer>
    </div>
  );
}
const StickyLogo = styled.div`
 display:flex;
align-items:center;
justify-content:center;
background: linear-gradient(to bottom, #2b2b2c , #353535);

img{

height:auto;
 width: 700px;
 transition: all 0.1s ease;

/* professional glow */
filter:
drop-shadow(0 0 0px #00E8F7)
drop-shadow(0 0 0px #15ff00);
 animation: glow 4s infinite alternate;

@keyframes glow{
from{
filter: drop-shadow(0 0 15px #00E8F7);
}
to{
filter: drop-shadow(0 0 15px #15ff00);
}
}
}

/* Sticky only on mobile */
@media (max-width:768px){
position:sticky;
top:0;
z-index:1000;
img{
 height: auto;
 width: 400px;
}
 
}

@media (min-width:769px){
position:sticky;
top:0;
z-index:1000;

}
`;
const HeroSection = styled.section`
background: linear-gradient(to bottom , #353535, #5c5b5b);
 
 text-align: center;
 position:static;

  h1{
   font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
 color: #00E8F7;
  }
 p{
 color: white;
 font-size: 1.25rem;
  margin-bottom: 1rem;
  text-align: center;
 }
  @media (max-width:768px){
  position:static;


h1{
   font-size:1.4rem;
     width: 95%;
     text-align: center;
     position: static;
     margin-left: 2%;
}
 p{
 font-size: 1rem;
    width: 95%;
    margin-left: 2%;
  margin-bottom: 1rem;
  text-align: center;
  position: static;
     }
}
`;
const ButtonGroup = styled.div`
// display:flex;
// justify-content:center;
// gap:20px;
// margin-top:25px;
 display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin:10px;
  button{
  background-color: #1e3a8a;
  color: white;
   padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  font-weight: 600;
  margin: 0 0.5rem;
  cursor: pointer;
  border: none;
  margin-bottom:2px;
  }

@media (max-width:768px){
flex-direction:row;
align-items:center;
padding-bottom:1rem;
button{
 margin-bottom:1px;
  padding: 0.4rem 1rem;
  border-radius: 1rem;
  font-weight: 400;
  margin: 0 0.1rem;
  cursor: pointer;
  border: none;

}

}
`;
const EnergyLine = styled.div`
width:600px;
height:4px;
margin:15px auto;
margin-top:-10px;

background: linear-gradient(
90deg,
transparent,
#00E8F7,
#15ff00,
#00E8F7,
transparent
);

background-size:200% 100%;

animation: flow 2s linear infinite;

@keyframes flow{
0%{
background-position:0% 0%;
}
100%{
background-position:200% 0%;
}
}

@media(max-width:768px){
width:400px;
}
`;
const HeroTitle = styled.h1`
font-size:3rem;
color:#00E8F7;

text-shadow:0 0 3px #00E8F7;

animation: glow 2s infinite alternate;

@keyframes glow{
from{ text-shadow:0 0 3px #00E8F7; }
to{ text-shadow:0 0 4px #15ff00; }
}

margin-bottom:20px;

@media(max-width:768px){
font-size:1.8rem;
}
`;

