import React, { useState } from "react";
import { Home, Mail, Calendar, PlusCircle, LogIn, Ticket } from "lucide-react";
import ProfileMenu from './ProfileMenu';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <header className="navbar-header">
      <nav className="navbar">
        {/* Brand */}
        <div className="brand">
          <Ticket size={24} className="brand-icon" />
          <span className="brand-primary">Ents24</span>
        </div>

        {/* Hamburger menu (mobile) */}
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        {/* Nav links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/"><Home size={18}/> Home</Link>
          </li>
          <li>
            <Link to="/contact"><Mail size={18}/> Contact</Link>
          </li>
          <li>
            <Link to="/events"><Calendar size={18}/> Events</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/create-event">
                <PlusCircle size={18}/> Create Event
              </Link>
            </li>
          )}
        </ul>

        {/* Login button or Profile Menu */}
        <div className="nav-cta">
          {isLoggedIn ? (
            <ProfileMenu />
          ) : (
            <Link to="/login" className="btn btn-primary"><LogIn size={18}/> Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
