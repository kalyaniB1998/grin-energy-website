
import {useNavigate} from 'react-router-dom';
import React from "react";
import { useState } from 'react';
import axios from '../axios';
import Footer from './Footer';
export default function HomePage() {
  let navigate= useNavigate();
const [showForm, setShowForm] = useState(false);
const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [status, setStatus] = useState("");

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
     <section className="hero-section" 

>
         <div className="logo-container"  >
        <img src='./GRIN ENERGY.png'alt="logo" className="site-logo" />
       <button className="menu-button" >☰</button>
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
        <button className="cta-button primary"  onClick={()=>{
          navigate('/product')}}>Explore Our Products</button>
          <button className="cta-button secondary" onClick={()=>{
          navigate('/Contactus')}} >Contact Us</button>
        </div>
        </div>
      </section>

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
        <div  style={{margin:'50px'}}>
          <a href='/product'>Explore Our Products →</a>
        </div>
      </section>

       
     
      <section className="why-choose-section">
        <h2>Why Choose <strong className='grin'> GRIN ENERGY</strong>?</h2>

         <ul>
          <li>✅ Technology-Driven EV Solutions</li>
          <li>✅ Proven Reliability & Performance</li>
          <li>✅ Fast, Friendly Technical Support</li>
          <li>✅ Scalable for Startups to Large OEMs</li>
          <li>✅ Focused on Clean Energy & Long-Term Sustainability</li>
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
        {success && <p style={{ color: "green",textAlign:'center' }}>Message sent successfully!</p>}
    </form>
  )}
</section>
      <div className='aboutusdiv' >
        <a href='/Contactus'
         style={{fontSize:'2rem'}}><strong>Join Us</strong></a>
        <p >Be part of the electric revolution. Partner with<strong style={{color:'#049b0b'}}> GRIN ENERGY</strong> and drive the world forward — sustainably.</p>
      </div>

      <section className="home-section">
        <h2>Ready to Electrify Your Project?</h2>
        <p>Whether you're an OEM, a startup, or a fleet operator — we're here to help.</p>
        <p>📞 Call Us: +91-8788449561</p>
        <p>📧 Email: info@grinenergy.in</p>
       
      </section>
      
      <Footer/>
    </div>
  );
}
