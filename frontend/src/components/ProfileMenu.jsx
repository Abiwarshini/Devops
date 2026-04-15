import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import './styles/ProfileMenu.css';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="profile-menu-container" ref={menuRef}>
      <button 
        className="profile-icon-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User size={24} />
      </button>

      {isOpen && (
        <div className="profile-dropdown">
          <button onClick={handleDashboard} className="dropdown-item">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button onClick={handleLogout} className="dropdown-item">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;