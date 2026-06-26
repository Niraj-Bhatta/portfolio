import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Github, Linkedin, Instagram, Facebook, Youtube, MailIcon } from '../ui/SocialIcons';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Left: Branding */}
        <div className="footer-brand">
          <span className="brand-logo">Niraj<span className="dot">.IO</span></span>
          <p className="brand-tagline">Building the systems of tomorrow, today.</p>
        </div>

        {/* Center: Social Icons */}
        <div className="footer-socials">
          <a href="https://github.com/Niraj-Bhatta" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/nirajbhatta559/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href="https://instagram.com/your_instagram" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
            <Instagram size={18} />
          </a>
          <a href="https://facebook.com/your_facebook" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
            <Facebook size={18} />
          </a>
          <a href="https://youtube.com/your_youtube" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
            <Youtube size={18} />
          </a>
          <a href="mailto:bhattaniraj559@gmail.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Email">
            <MailIcon size={18} />
          </a>
        </div>

        {/* Right: Scroll to Top */}
        <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUp size={18} />
        </button>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} @niraj. All Rights Reserved. Crafted for Innovation.</p>
      </div>
    </footer>
  );
}
