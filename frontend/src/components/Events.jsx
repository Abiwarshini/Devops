import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Tag } from 'lucide-react';
import './styles/Events.css';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="events-page">
        <div className="events-loading">
          <div className="loading-spinner"></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="events-page">
        <div className="events-error">
          <p>{error}</p>
          <button onClick={fetchEvents} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Upcoming Events</h1>
        <p>Discover amazing events happening near you</p>
      </div>

      {events.length === 0 ? (
        <div className="no-events">
          <p>No events found. Check back later for upcoming events!</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div 
              key={event._id} 
              className="event-card"
              onClick={() => navigate(`/event/${event._id}`)}
            >
              <div className="event-image">
                <img 
                  src={event.image ? `http://localhost:5000/uploads/${event.image}` : 'https://picsum.photos/800/400'} 
                  alt={event.eventName} 
                />
                <div className="event-category">{event.category}</div>
              </div>
              <div className="event-content">
                <h2>{event.eventName}</h2>
                
                <div className="event-details">
                  <div className="detail">
                    <Calendar size={16} />
                    <span>{formatDate(event.date)} at {event.time}</span>
                  </div>
                  <div className="detail">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="detail">
                    <Tag size={16} />
                    <span>Starting at ${event.tickets.normal.price}</span>
                  </div>
                </div>

                <button className="view-details-btn">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;