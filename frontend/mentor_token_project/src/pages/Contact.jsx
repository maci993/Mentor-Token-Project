import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const hadleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({ name: "", email: "", message: "" });
  };
  return (
    <div className="contact-section">
      <div className="contact-container">
        <h1>Let's Talk!</h1>
        <p>
          We're thrilled to connect with you! Whether you have a question, need
          assistance, or want to discuss a potential project, we're<br /> here to
          listen and help. At Mentor Token, we believe in the power of
          collaboration and are committed to providing you with the best<br /> support
          and solutions. Fill out the form below, and one of our team members
          will get back to you as soon as possible.
          <br />
          <strong>Let's create something amazing together!</strong>
        </p>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="text"
              onChange={hadleInputChange}
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              onChange={hadleInputChange}
              placeholder="Email address"
              required
            />
          </div>
          <textarea placeholder="Your message" required></textarea>
          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
