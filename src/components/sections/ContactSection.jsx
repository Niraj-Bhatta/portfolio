import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Send, Loader, CheckCircle, AlertTriangle, X } from 'lucide-react';
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

      <rect width="1000" height="480" fill="none" />

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

      {/* Engineer Location: Lalitpur/Kathmandu, Nepal */}
      <g transform="translate(720, 180)">
        <circle cx="0" cy="0" r="18" fill="url(#ping-glow)">
          <animate attributeName="r" values="5;24;5" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="10" fill="none" stroke="#00d4ff" strokeWidth="1.5">
          <animate attributeName="r" values="2;12;2" dur="2s" repeatCount="indefinite" />
        </circle>
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
  const [submitError, setSubmitError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' }); // type: 'success' | 'error'

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

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

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => {
        if (prev.message === message) {
          return { show: false, message: '', type: '' };
        }
        return prev;
      });
    }, 5000);
  };

  const handleSubmit = async (e) => {
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
      showToast("Validation failed. Please correct form errors.", "error");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const emailjsLib = window.emailjs;
      if (!emailjsLib) {
        throw new Error("EmailJS library failed to load via CDN. Check your internet connection.");
      }

      // Initialize EmailJS with a Public Key placeholder
      // --- REPLACE "YOUR_PUBLIC_KEY" with your actual EmailJS Public Key ---
      emailjsLib.init("XFjDLQJnQ7DW9MxOf");

      // On form submit, send form data using sendForm
      // --- REPLACE "YOUR_SERVICE_ID" and "YOUR_TEMPLATE_ID" with your actual EmailJS IDs ---
try {
  const emailjsLib = window.emailjs;

  emailjsLib.init("XFjDLQJnQ7DW9MxOf");

  // 1. Send notification email to yourself
  await emailjsLib.sendForm(
    "service_1jxj0nu",
    "template_j77djos",
    e.target
  );

  // 2. Send auto-reply email to the visitor
  await emailjsLib.sendForm(
    "service_1jxj0nu",
    "template_w818ap9",
    e.target
  );

  setIsSubmitting(false);
  setSubmitSuccess(true);
  setFormData({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  showToast("Message sent successfully! Thank you.", "success");

  setTimeout(() => setSubmitSuccess(false), 6000);

} catch (err) {
  setIsSubmitting(false);

  const errMsg =
    err?.text ||
    err?.message ||
    "Failed to send message via EmailJS.";

  setSubmitError(errMsg);
  showToast(`Error: ${errMsg}`, "error");
}
    } catch (err) {
      setIsSubmitting(false);
      const errMsg = err?.message || 'A critical error occurred while submitting the form.';
      setSubmitError(errMsg);
      showToast(`Uncaught Error: ${errMsg}`, "error");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`section-container contact-section scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className="glow-bg contact-glow" style={{ bottom: '15%', left: '10%', width: '380px', height: '380px', backgroundColor: 'var(--accent-purple)' }} />

      <h2 className="section-title">Get In Touch</h2>

      {/* Floating Toast Notification System */}
      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-icon-wrapper">
            {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
          </div>
          <span className="toast-message">{toast.message}</span>
          <button
            className="toast-close"
            onClick={() => setToast({ show: false, message: '', type: '' })}
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

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
                <a href="mailto:bhattaniraj559@gmail.com" className="val">bhattaniraj559@gmail.com</a>
              </div>
            </div>
            <div className="info-item">
              <Linkedin className="info-icon" />
              <div className="info-details">
                <span className="label">LinkedIn</span>
                <a href="https://www.linkedin.com/in/nirajbhatta559/" target="_blank" rel="noopener noreferrer" className="val">linkedin.com/in/nirajbhatta559</a>
              </div>
            </div>
            <div className="info-item">
              <Github className="info-icon" />
              <div className="info-details">
                <span className="label">GitHub</span>
                <a href="https://github.com/Niraj-Bhatta" target="_blank" rel="noopener noreferrer" className="val">github.com/Niraj-Bhatta</a>
              </div>
            </div>
            <div className="info-item">
              <MapPin className="info-icon" />
              <div className="info-details">
                <span className="label">Location</span>
                <span className="val">Lolang,Kathmandu,Nepal</span>
              </div>
            </div>
          </div>

          <div className="map-wrapper">
            <iframe
              title="Location Map"
              src="https://maps.google.com/maps?q=Lolang,%20Kathmandu,%20Nepal&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="map-fallback-container">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Lolang,Kathmandu,Nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="map-fallback-link"
            >
              Open in Google Maps
            </a>
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

              {submitError && (
                <div className="form-error-message animate-fade-in" style={{ color: '#ef4444', marginBottom: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={16} /> {submitError}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={isSubmitting}
                style={{ minHeight: '44px' }} /* Enforce min 44px touch target height */
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
