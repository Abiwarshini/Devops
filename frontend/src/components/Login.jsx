import React, { useState } from "react";
import up3 from '../assets/up3.gif';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id); // Store userId separately
        console.log("Login successful with user:", data.user); // Debug log
        alert("Login successful 🎉");
        window.location.href = "/dashboard"; 
      } else {
        console.error("Login failed:", data.message); 
        alert(data.message || "Login failed ");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };
  
  return (
    
    <div className="login-page" aria-live="polite">
        <div className="login-card" role="dialog" aria-labelledby="login-title">
          <div className="auth-split">
            <div className="split-media">
              <img src={up3} alt="Event illustration" className="split-img" />
            </div>

            <div className="split-form">
              <h2 id="login-title" className="visually-hidden">Sign in</h2>
              <form className="card-form" onSubmit={handleSubmit}>
                <input 
                  id="login-email" 
                  className="form-input" 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  aria-label="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
                <input 
                  id="login-password" 
                  className="form-input" 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  aria-label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
                <button className="btn-primary btn-full" type="submit">Sign in</button>
              </form>

              <div className="login-footer">
                New here? <a href="/signup" className="login-link">Create an account</a>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Login;
