import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Background change on scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Blog', href: '#blog' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div className="navbar-content">
        {/* Logo */}
        <a href="#hero" className="navbar-logo" onClick={(e) => handleLinkClick(e, '#hero')}>
          <div className="logo-badge">NB</div>
          <span className="logo-text">Niraj<span className="dot">.Bhatta</span></span>
        </a>

        {/* Desktop Links */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="nav-link"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="./assets/resume/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-resume nav-cta"
          >
            View Resume
          </a>
          <a 
            href="#contact" 
            className="btn btn-primary nav-cta"
            onClick={(e) => handleLinkClick(e, '#contact')}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="mobile-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="mobile-link"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="./assets/resume/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-resume mobile-cta"
          >
            View Resume
          </a>
          <a 
            href="#contact" 
            className="btn btn-primary mobile-cta"
            onClick={(e) => handleLinkClick(e, '#contact')}
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
