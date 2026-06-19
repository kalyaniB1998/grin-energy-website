import React from "react";

import Header from "./Header";
import Footer from "./Footer";
export default function AboutUsPage() {
  return (
    <div className="about-page">
       
     <Header/>
      <section className="about-section"  >
    <h1 className="section-title"><u>About Us</u></h1>
    <div className="para">
        <p className="about-text">
          Founded in <strong>2021</strong>, <strong className='grin'> GRIN ENERGY</strong> is on a mission to redefine the future of mobility by accelerating the adoption of electric vehicles in India and beyond.
        </p>
        <p className="about-text">
          We provide <strong>high-efficiency electric drivetrain systems</strong> and <strong>intelligent EV charging solutions</strong>, helping manufacturers, fleet operators, and infrastructure developers bring clean transportation to life.
        </p>
        <p className="about-text">
          But what truly sets us apart is our unwavering commitment to <strong>customer experience</strong> and <strong>technical excellence</strong>. We work not just as a supplier, but as a <strong>technology partner</strong>, ensuring smooth implementation, fast support, and long-term success.
        </p>
        </div>
      </section>

    
      <div style={{backgroundColor:'#F3F4F6'}}>
      <section className="vision-mission-section">
        <div className="vision-box">
          <h2 className="section-subtitle"><strong>Our Vision</strong></h2>
          <p className="about-para">To power a sustainable future through electric mobility innovations.</p>
        </div>
        <div className="mission-box">
          <h2 className="section-subtitle"><strong>Our Mission</strong></h2>
          <p className="about-para">To deliver high-performance EV drivetrain and charging solutions backed by quality, service, and trust.</p>
        </div>
       
      </section>
      

   
    
      <section className="vision-mission-section" >
        <div className="corevalue-box" >
         <h2 className="section-subtitle"><strong>Core Values</strong></h2>
        <ul className="values-list">
          <li><strong>Sustainability</strong> – We believe in protecting the planet through clean technologies.</li>
          <li><strong>Innovation</strong> – We embrace cutting-edge solutions to stay ahead.</li>
          <li><strong>Reliability</strong> – Our products and services are built for consistency and performance.</li>
          <li><strong>Customer-First</strong> – Your goals are our priority.</li>
          <li><strong>Collaboration</strong> – We grow together, with every client and every project.</li>
        </ul>
        </div>
       </section>
      </div>

    
     <Footer/>
    </div>
  );
}
