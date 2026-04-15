import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import UpcomingEvents from './components/UpcomingEvents';
import Sponsors from './components/Sponsors';
import CTA from './components/CTA';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import CreateEvent from './components/CreateEvent';
import EventDetails from './components/EventDetails';
import Events from './components/Events';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import PrivateRoute from './components/PrivateRoute';

// Wrapper to handle conditional Navbar
const Layout = ({ children }) => {
  const location = useLocation();

  // Hide navbar on login and signup
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <UpcomingEvents />
              <Sponsors />
              <CTA />
              <Footer />
            </>
          } />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-event" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
