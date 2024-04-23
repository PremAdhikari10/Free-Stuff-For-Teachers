import React from 'react';
import "./css/Footer.css";
import Logo from "../assets/logo.png";
import { MDBIcon } from 'mdb-react-ui-kit'; // Importing MDBReact icons

const Footer = () => {
  return (
    <footer className='footer_wrapper'>
      <div className='footer-container'>
        <div className='footer_col'>
          <img src={Logo} alt='logo'/>
          <p>
          Donors and Teachers Unite for Impact
          </p>
        </div>
        <div className='footer_col'>
          <h3>Contact Us</h3>
          <ul className="contact-list">
            <li>
              <MDBIcon fas icon="phone" size="lg" />  Phone: (972)-799-9044
            </li>
            <li>
              <MDBIcon fas icon="map-marker-alt" size="lg" /> Address: 3940 N Elm St, Denton, TX, United States, 76207
            </li>
          </ul>
        </div>
        <div className='footer_col'>
          <h3>Connect Social Media</h3>
          <ul className="contact-list">
            <li>
              <a href="https://www.facebook.com/your-facebook-account" target="_blank" rel="noopener noreferrer">
                <MDBIcon fab icon="facebook" size="lg" /> Facebook
              </a>
            </li>
            <li>
              <a href="mailto:your-email@gmail.com" target="_blank" rel="noopener noreferrer">
                <MDBIcon far icon="envelope" size="lg" /> emailaddresss@gmail.com
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/your-instagram-account" target="_blank" rel="noopener noreferrer">
                <MDBIcon fab icon="instagram" size="lg" /> Instagram
              </a>
            </li>
          </ul>

        </div>
      </div>
      <div>
        <p></p>
      </div>
    </footer>
  )
}

export default Footer
