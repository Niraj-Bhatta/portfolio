import React, { useState } from 'react';
import { Mail, MapPin, Send, Loader, CheckCircle } from 'lucide-react';
import { Github, Linkedin } from '../ui/SocialIcons';
import './ContactSection.css';

// SVG Dot Grid Map Component with Pulsing coordinate pin
function WorldMapDotGrid() {
  return (
    <svg viewBox="0 0 1000 480" width="100%" height="100%" className="world-map-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ping-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Dynamic Background Grid Pattern */}
      <rect width="1000" height="480" fill="none" />

      {/* Abstract Grid Map points representing world continents */}
      {/* North America */}
      <circle cx="150" cy="120" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="180" cy="130" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="210" cy="110" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="230" cy="150" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="200" cy="160" r="2" fill="rgba(255,255,255,0.15)" />
      
      {/* South America */}
      <circle cx="280" cy="280" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="310" cy="320" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="320" cy="360" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="340" cy="400" r="2" fill="rgba(255,255,255,0.15)" />

      {/* Europe */}
      <circle cx="480" cy="120" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="510" cy="110" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="530" cy="140" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="500" cy="160" r="2" fill="rgba(255,255,255,0.15)" />

      {/* Africa */}
      <circle cx="520" cy="250" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="550" cy="280" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="580" cy="310" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="560" cy="220" r="2" fill="rgba(255,255,255,0.15)" />

      {/* Asia */}
      <circle cx="680" cy="110" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="720" cy="130" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="760" cy="120" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="800" cy="150" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="660" cy="160" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="700" cy="180" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="740" cy="200" r="2" fill="rgba(255,255,255,0.15)" />
      
      {/* Australia */}
      <circle cx="840" cy="330" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="870" cy="350" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="890" cy="380" r="2" fill="rgba(255,255,255,0.15)" />

      {/* Connection Links */}
      <path d="M 500 160 Q 610 140 720 180" fill="none" stroke="rgba(0, 212, 255, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
      <path d="M 230 150 Q 470 120 720 180" fill="none" stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1" strokeDasharray="4 4" />

      {/* Engineer Location Coordinate: Lalitpur/Kathmandu, Nepal (~720, 180 coordinate area on projection grid) */}
      <g transform="translate(720, 180)">
        {/* Pulsing ring 1 */}
        <circle cx="0" cy="0" r="18" fill="url(#ping-glow)">
          <animate attributeName="r" values="5;24;5" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Pulsing ring 2 */}
        <circle cx="0" cy="0" r="10" fill="none" stroke="#00d4ff" strokeWidth="1.5">
          <animate attributeName="r" values="2;12;2" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Solid center dot */}
        <circle cx="0" cy="0" r="4" fill="#00d4ff" />
      </g>
    </svg>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = (field) => {
    setFocusedField(null);
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let errors = { ...formErrors };
    if (!value.trim()) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    } else {
      delete errors[field];
      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.email = "Please enter a valid email address";
        }
      }
    }
    setFormErrors(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check all validations
    let errors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key].trim()) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate sending email
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Dismiss success screen after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-container contact-section">
      <div className="glow-bg contact-glow" style={{ bottom: '15%', left: '10%', width: '380px', height: '380px', backgroundColor: 'var(--accent-purple)' }} />

      <h2 className="section-title">Get In Touch</h2>

      <div className="contact-grid">
        {/* Left: Contact Info & Map */}
        <div className="contact-info-panel glass-panel">
          <div className="info-header">
            <h3>Let's Build Something Amazing Together</h3>
            <p>Have an interesting project, job offer, or technical inquiry? Reach out and I will get back to you shortly.</p>
          </div>

          <div className="info-list">
            <div className="info-item">
              <Mail className="info-icon" />
              <div className="info-details">
                <span className="label">Email</span>
                <a href="mailto:contact@niraj.io" className="val">contact@niraj.io</a>
              </div>
            </div>
            <div className="info-item">
              <Linkedin className="info-icon" />
              <div className="info-details">
                <span className="label">LinkedIn</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="val">linkedin.com/in/niraj</a>
              </div>
            </div>
            <div className="info-item">
              <Github className="info-icon" />
              <div className="info-details">
                <span className="label">GitHub</span>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="val">github.com/niraj</a>
              </div>
            </div>
            <div className="info-item">
              <MapPin className="info-icon" />
              <div className="info-details">
                <span className="label">Location</span>
                <span className="val">Lalitpur, Nepal</span>
              </div>
            </div>
          </div>

          {/* Interactive World Map background layer */}
          <div className="map-wrapper">
            <WorldMapDotGrid />
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="contact-form-panel glass-panel">
          {submitSuccess ? (
            <div className="form-success-message">
              <CheckCircle size={48} className="success-icon" />
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. Your message has been sent successfully and I will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className={`input-group ${focusedField === 'name' || formData.name ? 'float' : ''} ${formErrors.name ? 'error' : ''}`}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  required
                />
                <label htmlFor="name">Full Name</label>
                {formErrors.name && <span className="error-text">{formErrors.name}</span>}
              </div>

              {/* Email */}
              <div className={`input-group ${focusedField === 'email' || formData.email ? 'float' : ''} ${formErrors.email ? 'error' : ''}`}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  required
                />
                <label htmlFor="email">Email Address</label>
                {formErrors.email && <span className="error-text">{formErrors.email}</span>}
              </div>

              {/* Subject */}
              <div className={`input-group ${focusedField === 'subject' || formData.subject ? 'float' : ''} ${formErrors.subject ? 'error' : ''}`}>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={() => handleBlur('subject')}
                  required
                />
                <label htmlFor="subject">Subject</label>
                {formErrors.subject && <span className="error-text">{formErrors.subject}</span>}
              </div>

              {/* Message */}
              <div className={`input-group textarea-group ${focusedField === 'message' || formData.message ? 'float' : ''} ${formErrors.message ? 'error' : ''}`}>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  required
                />
                <label htmlFor="message">Your Message</label>
                {formErrors.message && <span className="error-text">{formErrors.message}</span>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader size={16} className="spinner" /> Sending Message...
                  </>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
