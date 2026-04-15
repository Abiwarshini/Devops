import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Image, Tag, FileText, Users } from 'lucide-react';
import './styles/CreateEvent.css';

const CreateEvent = () => {
  // 🔹 Get logged-in userId from localStorage
  const loggedInUserId = localStorage.getItem("userId");

  const [eventData, setEventData] = useState({
    eventName: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
    tickets: { vip: { price: '', capacity: '' }, normal: { price: '', capacity: '' } },
    eventImage: null,
    imagePreview: null
  });

  // 🔹 Handle text/number input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('tickets.')) {
      const [ticketType, field] = name.split('.')[1].split('_');
      setEventData(prev => ({
        ...prev,
        tickets: {
          ...prev.tickets,
          [ticketType]: { ...prev.tickets[ticketType], [field]: value }
        }
      }));
    } else {
      setEventData(prev => ({ ...prev, [name]: value }));
    }
  };

  // 🔹 Handle file input and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData(prev => ({
        ...prev,
        eventImage: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedInUserId) {
      alert("❌ User not logged in!");
      return;
    }

    const formData = new FormData();
    formData.append("eventName", eventData.eventName);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("location", eventData.location);
    formData.append("description", eventData.description);
    formData.append("category", eventData.category);
    formData.append("vip_price", eventData.tickets.vip.price);
    formData.append("vip_capacity", eventData.tickets.vip.capacity);
    formData.append("normal_price", eventData.tickets.normal.price);
    formData.append("normal_capacity", eventData.tickets.normal.capacity);
    formData.append("userId", loggedInUserId);
    if (eventData.eventImage) formData.append("eventImage", eventData.eventImage);

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        alert("🎉 Event created successfully!");
        console.log("✅ Event saved:", data.event);
        setEventData({  // Reset form
          eventName: '',
          date: '',
          time: '',
          location: '',
          description: '',
          category: '',
          tickets: { vip: { price: '', capacity: '' }, normal: { price: '', capacity: '' } },
          eventImage: null,
          imagePreview: null
        });
      } else {
        alert(data.message || "❌ Failed to create event");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="create-event-container">
      <h1>Create New Event</h1>
      <div className="create-event-layout">
        {/* 🔹 Form Section */}
        <div className="form-container">
          <form onSubmit={handleSubmit} className="create-event-form">

            {/* Event Name */}
            <div className="form-group">
              <label><FileText size={20} /> Event Name</label>
              <input
                type="text"
                name="eventName"
                value={eventData.eventName}
                onChange={handleInputChange}
                placeholder="Enter event name"
                required
              />
            </div>

            {/* Date & Time */}
            <div className="form-row">
              <div className="form-group">
                <label><Calendar size={20} /> Date</label>
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label><Clock size={20} /> Time</label>
                <input
                  type="time"
                  name="time"
                  value={eventData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label><MapPin size={20} /> Location</label>
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label><FileText size={20} /> Description</label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label><Tag size={20} /> Category</label>
              <select
                name="category"
                value={eventData.category}
                onChange={handleInputChange}
                className="select-input"
                required
              >
                <option value="">Select Category</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="concert">Concert</option>
                <option value="sports">Sports</option>
                <option value="exhibition">Exhibition</option>
                <option value="networking">Networking</option>
              </select>
            </div>

            {/* Tickets */}
            <div className="tickets-section">
              <h3>Ticket Types</h3>
              <div className="ticket-types-grid">
                <div className="form-group">
                  <label><Tag size={20} /> VIP Price</label>
                  <input
                    type="number"
                    name="tickets.vip_price"
                    value={eventData.tickets.vip.price}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label><Users size={20} /> VIP Capacity</label>
                  <input
                    type="number"
                    name="tickets.vip_capacity"
                    value={eventData.tickets.vip.capacity}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label><Tag size={20} /> Normal Price</label>
                  <input
                    type="number"
                    name="tickets.normal_price"
                    value={eventData.tickets.normal.price}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label><Users size={20} /> Normal Capacity</label>
                  <input
                    type="number"
                    name="tickets.normal_capacity"
                    value={eventData.tickets.normal.capacity}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Event Image */}
            <div className="form-group">
              <label><Image size={20} /> Event Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                required
              />
              {eventData.imagePreview && (
                <div className="image-preview">
                  <img src={eventData.imagePreview} alt="Event preview" />
                </div>
              )}
            </div>

            {/* Submit */}
            <button type="submit" className="submit-button">Create Event</button>
          </form>
        </div>

        {/* 🔹 Preview Card */}
        <div className="event-preview">
          <h2>Event Preview</h2>
          <div className="preview-card">
            {eventData.imagePreview ? (
              <img src={eventData.imagePreview} alt="Event preview" className="preview-image" />
            ) : (
              <div className="preview-image-placeholder">
                <Image size={40} />
                <p>Upload event image</p>
              </div>
            )}
            <div className="preview-content">
              <h3>{eventData.eventName || 'Event Name'}</h3>
              <p className="preview-location"><MapPin size={16} /> {eventData.location || 'Location'}</p>
              <p className="preview-datetime">
                <Calendar size={16} /> {eventData.date ? new Date(eventData.date).toLocaleDateString() : 'Date'}
                <Clock size={16} /> {eventData.time || 'Time'}
              </p>
              <p className="preview-description">{eventData.description || 'Event description...'}</p>
              <div className="preview-tickets">
                <div className="ticket-row">
                  <span className="ticket-label">VIP:</span>
                  <span className="preview-price"><Tag size={16} /> ${eventData.tickets.vip.price || '0'}</span>
                  <span className="preview-capacity"><Users size={16} /> {eventData.tickets.vip.capacity || '0'}</span>
                </div>
                <div className="ticket-row">
                  <span className="ticket-label">Normal:</span>
                  <span className="preview-price"><Tag size={16} /> ${eventData.tickets.normal.price || '0'}</span>
                  <span className="preview-capacity"><Users size={16} /> {eventData.tickets.normal.capacity || '0'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateEvent;
