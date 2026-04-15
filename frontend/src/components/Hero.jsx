import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Poster from "../assets/images.jpg"; // replace with your own

export default function Hero() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleCreateEvent = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/create-event');
    }
  };
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        
        {/* LEFT CONTENT */}
        <div className="hero-content">
          <h1 className="hero-title">
            Plan & Host <span className="accent">Elite Events</span> Effortlessly 
          </h1>
          <p className="hero-sub">
            Eventoria brings luxury and simplicity together. Create stylish event
            pages, sell tickets seamlessly, and manage everything — all in one place.
          </p>

          <div className="hero-actions">
            <Link to="/events" className="btn btn-primary btn-lg">Get Started</Link>
            <button onClick={handleCreateEvent} className="btn btn-outline btn-lg">Create Event</button>
          </div>

          <div className="stats">
            <div className="stat">
              <h3>1.2k+</h3>
              <p>Events Hosted</p>
            </div>
            <div className="stat">
              <h3>28k+</h3>
              <p>Tickets Sold</p>
            </div>
            <div className="stat">
              <h3>320</h3>
              <p>Venues</p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT (Poster) */}
        <div className="hero-poster">
          <div className="poster-card">
            <img src={Poster} alt="Event Poster" className="poster-img" />
            <div className="poster-dates">
              <span>FRI 25</span>
              <span>SAT 26</span>
              <span>SUN 27</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
