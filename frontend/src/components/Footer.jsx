import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Brand + About */}
        <div className="footer-section">
          <h3 className="footer-logo">Eventoria</h3>
          <p className="footer-text">
            Your one-stop platform for discovering and managing unforgettable events.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#faq">FAQs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: <a href="mailto:support@eventoria.com">support@eventoria.com</a></p>
          <p>Phone: <a href="tel:+919876543210">+91 98765 43210</a></p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Eventoria. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
