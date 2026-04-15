import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, Ticket, AlertCircle } from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    numberOfTickets: 1,
    specialRequirements: "",
    agreeToTerms: false
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // First try to fetch from API
        try {
          const res = await fetch(`http://localhost:5000/api/events/${id}`);
          if (res.ok) {
            const data = await res.json();
            setEvent(data);
            return;
          }
        } catch (err) {
          console.log('API not available, using local data');
        }

        // Fallback to local data
        const localEvents = [
          {
            id: 1,
            eventName: 'Graduation ceremony',
            category: 'workshop',
            image: 'https://example.com/graduation.jpg',
            date: '2025-10-30T22:37:00',
            location: 'Chennai',
            ticketPrice: 0,
            capacity: 100,
            description: 'Join us for this special graduation ceremony celebrating our students achievements.'
          },
          {
            id: 2,
            eventName: 'Raga',
            category: 'concert',
            image: 'https://example.com/raga.jpg',
            date: '2025-10-23T04:23:00',
            location: 'Namakkal',
            ticketPrice: 499,
            capacity: 200,
            description: 'Experience the magical evening of classical music with renowned artists.'
          },
          {
            id: 3,
            eventName: 'Xenomorph',
            category: 'exhibition',
            image: 'https://example.com/xenomorph.jpg',
            date: '2025-11-07T21:55:00',
            location: 'IT PARK',
            ticketPrice: 20,
            capacity: 150,
            description: 'A unique exhibition showcasing innovative art and technology installations.'
          }
        ];

        const event = localEvents.find(e => e.id === parseInt(id));
        if (!event) throw new Error("Event not found");
        setEvent(event);
      } catch (err) {
        console.error(err);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegistrationForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTotal = () => {
    if (!event) return 0;
    return event.ticketPrice * registrationForm.numberOfTickets;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the registration data to your backend
    try {
      const response = await fetch('http://localhost:5000/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: id,
          ...registrationForm,
          totalAmount: calculateTotal()
        }),
      });

      if (!response.ok) throw new Error('Registration failed');

      // Handle successful registration
      alert('Registration successful!');
      navigate('/dashboard'); // or wherever you want to redirect
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  if (loading) return <div className="event-loading">Loading event details...</div>;
  if (error) return <div className="event-error">{error}</div>;
  if (!event) return <div className="event-not-found">Event not found</div>;

  return (
    <div className="event-details-page">
      {/* Event Details Section */}
      <div className="event-details-hero">
        <div className="event-image-container">
          <img
            src={event.image ? `http://localhost:5000/uploads/${event.image}` : "https://picsum.photos/800/400"}
            alt={event.eventName}
            className="event-main-image"
          />
        </div>
        <div className="event-info-container">
          <h1 className="event-title">{event.eventName}</h1>
          
          <div className="event-meta">
            <div className="meta-item">
              <Calendar size={20} />
              <span>{new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="meta-item">
              <Clock size={20} />
              <span>{new Date(event.date).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
            <div className="meta-item">
              <MapPin size={20} />
              <span>{event.location}</span>
            </div>
            <div className="meta-item">
              <Ticket size={20} />
              <span>${event.ticketPrice} per ticket</span>
            </div>
            <div className="meta-item">
              <Users size={20} />
              <span>{event.capacity} total capacity</span>
            </div>
          </div>

          <div className="event-description">
            <h2>About This Event</h2>
            <p>{event.description}</p>
          </div>

          <button 
            className="btn btn-primary btn-lg"
            onClick={() => setShowRegistration(true)}
          >
            Register for Event
          </button>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegistration && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Register for {event.eventName}</h2>
            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-input"
                  value={registrationForm.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={registrationForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={registrationForm.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="numberOfTickets">Number of Tickets</label>
                <input
                  type="number"
                  id="numberOfTickets"
                  name="numberOfTickets"
                  className="form-input"
                  value={registrationForm.numberOfTickets}
                  onChange={handleInputChange}
                  min="1"
                  max={event.capacity}
                  required
                />
                <small className="helper-text">Maximum {event.capacity} tickets available</small>
              </div>

              <div className="form-group">
                <label htmlFor="specialRequirements">Special Requirements</label>
                <textarea
                  id="specialRequirements"
                  name="specialRequirements"
                  className="form-input"
                  value={registrationForm.specialRequirements}
                  onChange={handleInputChange}
                  placeholder="Any dietary requirements, accessibility needs, etc."
                  rows="3"
                />
              </div>

              <div className="form-summary">
                <div className="summary-item">
                  <span>Ticket Price:</span>
                  <span>${event.ticketPrice} × {registrationForm.numberOfTickets}</span>
                </div>
                <div className="summary-item total">
                  <span>Total Amount:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>

              <div className="form-group checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={registrationForm.agreeToTerms}
                    onChange={handleInputChange}
                    required
                  />
                  I agree to the terms and conditions
                </label>
              </div>

              {error && (
                <div className="error-message">
                  <AlertCircle size={20} />
                  {error}
                </div>
              )}

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setShowRegistration(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
