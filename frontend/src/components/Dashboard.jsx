import React, { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Users,  IndianRupee , Edit, Trash2, Eye, BarChart } from "lucide-react";
import "./styles/Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('created');
  const [createdEvents, setCreatedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalRegistrations: 0,
    totalRevenue: 0
  });

  // Get user data from localStorage
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const loggedInUserId = localStorage.getItem("userId");
  
  // Redirect if not logged in
  useEffect(() => {
    if (!loggedInUserId || !user) {
      window.location.href = "/login";
    }
  }, [loggedInUserId, user]);

  // Format date nicely
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Fetch events created by this user
  useEffect(() => {
    if (!loggedInUserId) return;

    const fetchCreatedEvents = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/my-events/${loggedInUserId}`);
        const data = await res.json();
        setCreatedEvents(data);

        // Update stats based on fetched events
        const upcomingCount = data.filter(e => new Date(e.date) > new Date()).length;
        const totalRevenue = data.reduce((acc, event) => {
          const vipRevenue = event.tickets.vip.price * event.tickets.vip.capacity;
          const normalRevenue = event.tickets.normal.price * event.tickets.normal.capacity;
          return acc + vipRevenue + normalRevenue;
        }, 0);

        setStats({
          totalEvents: data.length,
          upcomingEvents: upcomingCount,
          totalRegistrations: 0, // you can calculate if you track registrations
          totalRevenue: totalRevenue
        });
      } catch (err) {
        console.error("Failed to fetch user events:", err);
      }
    };

    fetchCreatedEvents();
  }, [loggedInUserId]);

  const eventsToDisplay = activeTab === "created" ? createdEvents : registeredEvents;

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back!</h1>
          <p>Manage your events and check your registrations</p>
        </div>
        <button 
          className="create-event-btn"
          onClick={() => window.location.href="/create-event"}
        >
          + Create New Event
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple"><Calendar size={24} /></div>
          <div className="stat-content">
            <h3>Total Events</h3>
            <p>{stats.totalEvents}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><BarChart size={24} /></div>
          <div className="stat-content">
            <h3>Upcoming Events</h3>
            <p>{stats.upcomingEvents}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><Users size={24} /></div>
          <div className="stat-content">
            <h3>Total Registrations</h3>
            <p>{stats.totalRegistrations}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">< IndianRupee  size={24} /></div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p>₹{stats.totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="dashboard-tabs">
        <button className={`tab-btn ${activeTab === 'created' ? 'active' : ''}`} onClick={() => setActiveTab('created')}>
          Events Created by You
        </button>
        <button className={`tab-btn ${activeTab === 'registered' ? 'active' : ''}`} onClick={() => setActiveTab('registered')}>
          Events You're Attending
        </button>
      </div>

      {/* Events Grid */}
      <div className="events-grid">
        {eventsToDisplay.length > 0 ? (
          eventsToDisplay.map(event => (
            <div key={event._id} className="event-card">
              <div className="event-image">
                <img src={event.image ? `http://localhost:5000/uploads/${event.image}` : "https://picsum.photos/800/400"} alt={event.eventName} />
                <div className="event-badge">{event.category}</div>
              </div>
              <div className="event-content">
                <h3>{event.eventName}</h3>
                <div className="event-details">
                  <p><Calendar size={16} /> {formatDate(event.date)}</p>
                  <p><Clock size={16} /> {event.time}</p>
                  <p><MapPin size={16} /> {event.location}</p>
                </div>
                <div className="tickets-info">
                  <div><span className="ticket-label">VIP</span><span className="ticket-price">${event.tickets.vip.price}</span></div>
                  <div><span className="ticket-label">Regular</span><span className="ticket-price">${event.tickets.normal.price}</span></div>
                </div>
                <div className="event-actions">
                  <button 
                    className="action-btn view"
                    onClick={() => window.location.href = `/event/${event._id}`}
                  >
                    <Eye size={16} /> View
                  </button>
                  {event.createdBy === loggedInUserId && (
                    <>
                      <button 
                        className="action-btn edit"
                        onClick={() => window.location.href = `/edit-event/${event._id}`}
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to delete this event?')) {
                            try {
                              const res = await fetch(`http://localhost:5000/api/events/${event._id}`, {
                                method: 'DELETE',
                              });
                              if (res.ok) {
                                setCreatedEvents(prev => prev.filter(e => e._id !== event._id));
                                // Update stats
                                setStats(prev => ({
                                  ...prev,
                                  totalEvents: prev.totalEvents - 1,
                                  upcomingEvents: new Date(event.date) > new Date() 
                                    ? prev.upcomingEvents - 1 
                                    : prev.upcomingEvents
                                }));
                              } else {
                                alert('Failed to delete event');
                              }
                            } catch (err) {
                              console.error('Delete failed:', err);
                              alert('Failed to delete event');
                            }
                          }
                        }}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>No events to display.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
