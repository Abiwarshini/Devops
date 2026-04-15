import React, { useState } from 'react';
import SignupImage from '../assets/Login.gif'; // your left side image

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Update form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Call backend signup API
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: "user" // default
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful 🎉. Now login.");
        window.location.href = "/login"; // redirect to login page
      } else {
        alert(data.message || "Signup failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };
  return (
    <div className="login-page" aria-live="polite">
      <div className="login-card" role="dialog" aria-labelledby="signup-title">
        <div className="auth-split">
          <div className="split-media">
            <img src={SignupImage} alt="Create account" className="split-img" />
          </div>

          <div className="split-form">
            <h2 id="signup-title" className="visually-hidden">Sign up</h2>
            <form className="card-form" onSubmit={handleSubmit}>
              <input id="signup-name" className="form-input" type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required />
              <input id="signup-email" className="form-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input id="signup-password" className="form-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <input id="signup-confirm" className="form-input" type="password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} required />
              <button type="submit" className="btn-primary btn-full">Create account</button>
            </form>

            <p className="login-footer">
              Already registered? <a href="/login" className="login-link">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
