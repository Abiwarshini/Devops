import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { BsCheckCircle } from 'react-icons/bs';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventType: '',
    estimatedGuests: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log(formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        eventType: '',
        estimatedGuests: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Contact Information */}
        <div className="contact-info">
          <div className="contact-info-header">
            <h2>Let's Discuss Your Event</h2>
            <p>Get in touch with us to start planning your perfect event. We're here to help turn your vision into reality.</p>
          </div>
          
          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-method-icon">
                <FiMapPin size={20} />
              </div>
              <div className="contact-method-content">
                <h3>Visit Us</h3>
                <p>123 Event Street<br />Melbourne, VIC 3000</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-method-icon">
                <FiPhone size={20} />
              </div>
              <div className="contact-method-content">
                <h3>Call Us</h3>
                <a href="tel:+61398765432">+61 3 9876 5432</a>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-method-icon">
                <FiMail size={20} />
              </div>
              <div className="contact-method-content">
                <h3>Email Us</h3>
                <a href="mailto:info@eventhub.com">info@eventhub.com</a>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-method-icon">
                <FiClock size={20} />
              </div>
              <div className="contact-method-content">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-container">
          <div className="contact-form-header">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you within 24 hours.</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="eventType">Event Type</label>
                <select
                  id="eventType"
                  name="eventType"
                  className="form-input"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Event Type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="conference">Conference</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="estimatedGuests">Estimated Guests</label>
                <input
                  type="number"
                  id="estimatedGuests"
                  name="estimatedGuests"
                  className="form-input"
                  value={formData.estimatedGuests}
                  onChange={handleChange}
                  placeholder="Number of guests"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-input"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your event..."
                required
              ></textarea>
            </div>

            <div className="contact-submit">
              <button type="submit" className="btn btn-primary btn-full">
                Send Message
              </button>
            </div>

            {submitted && (
              <div className="success-message">
                <BsCheckCircle size={20} />
                Thank you! Your message has been sent successfully.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;