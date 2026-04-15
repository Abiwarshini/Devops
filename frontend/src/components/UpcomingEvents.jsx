import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Tag } from 'lucide-react';

const EventCard = ({ event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  
  const formattedTime = event.time;
  
  // Get the lowest ticket price between VIP and normal tickets
  const startingPrice = Math.min(
    event.tickets?.vip?.price || Infinity,
    event.tickets?.normal?.price || Infinity
  );

  return (
    <div className="event-card">
      <div className="event-image">
        <img 
          src={event.image ? `http://localhost:5000/uploads/${event.image}` : '/placeholder-event.jpg'} 
          alt={event.eventName}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder-event.jpg';
          }}
        />
        <span className="event-category">{event.category}</span>
      </div>
      <div className="event-content">
        <h3>{event.eventName}</h3>
        <div className="event-info">
          <div className="info-item">
            <Calendar size={16} />
            <span>{formattedDate} at {formattedTime}</span>
          </div>
          <div className="info-item">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
          <div className="info-item">
            <Tag size={16} />
            <span>Starting at ${startingPrice < Infinity ? startingPrice : 'N/A'}</span>
          </div>
        </div>
        <Link to={`/event/${event._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        // Take only the first 3 events
        setEvents(data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <section className="events-section">
      <div className="container">
        <h1>Discover amazing events happening near you</h1>
        <div className="event-grid">
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/events" className="btn btn-primary">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
