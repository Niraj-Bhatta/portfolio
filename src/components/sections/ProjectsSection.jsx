import React, { useRef, useState, useEffect } from 'react';
import { ExternalLink, Cpu, Shield, User, Globe, Calculator, Newspaper, Play } from 'lucide-react';
import { Github } from '../ui/SocialIcons';
import './ProjectsSection.css';

// 3D Tilt Card Component
function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Mouse coords relative to card bounding box
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Half width & height
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation angle (max 12deg tilt)
    const rotateX = ((centerY - y) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`project-card glass-panel ${isHovered ? 'hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)'
      }}
    >
      {/* Decorative Card Header */}
      <div className="card-top-bar">
        <span className="window-dots">
          <span></span><span></span><span></span>
        </span>
        <span className="card-category">{project.category}</span>
      </div>

      {/* Tech Preview Frame */}
      <div className="project-preview">
        <div className="preview-glow" style={{ background: `radial-gradient(circle at center, rgba(${project.glowColor}, 0.2) 0%, transparent 70%)` }} />
        {project.previewIcon}
        <div className="preview-decorations">
          <div className="scan-line" />
          <div className="grid-decor" />
        </div>
      </div>

      {/* Card Body */}
      <div className="project-details">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-badge">{tag}</span>
          ))}
        </div>

        {/* Buttons */}
        <div className="project-actions">
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary action-btn">
            <ExternalLink size={16} /> Demo
          </a>
          <a href={project.gitLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary action-btn">
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const projects = [
    {
      title: "Smart Parking System",
      category: "IoT / Embedded",
      description: "An automated real-time IoT solution using ESP32, IR sensors, and ultrasonic modules to detect stall occupancy. Synchronizes data with Firebase Realtime Database for live web app parking status and reservation mapping.",
      tags: ["ESP32", "Firebase", "C++ / Arduino", "React"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com",
      glowColor: "0, 212, 255", // Blue
      previewIcon: <Cpu className="preview-icon glow-blue" size={48} />
    },
    {
      title: "Government Document Verification System",
      category: "Full-Stack Security",
      description: "A secure digital portal utilizing cryptographic hashing and authorization nodes to verify state certificates and identity credentials, minimizing forgery and administrative overhead.",
      tags: ["Node.js", "Express", "React", "MongoDB", "Crypto"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com",
      glowColor: "124, 58, 237", // Purple
      previewIcon: <Shield className="preview-icon glow-purple" size={48} />
    },
    {
      title: "Student Info Management System",
      category: "Enterprise Software",
      description: "A database-centric administration platform featuring automated student registry tracking, grading schemas, analytical reports, roles/permissions levels, and academic charting panels.",
      tags: ["React", "Express", "PostgreSQL", "Tailwind"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com",
      glowColor: "0, 212, 255", // Blue
      previewIcon: <User className="preview-icon glow-blue" size={48} />
    },
    {
      title: "Deltaversity",
      category: "EdTech Platform",
      description: "An interactive educational environment providing online courses, visual lesson maps, peer discussion forums, testing portals, and instructor course construction suites.",
      tags: ["MERN Stack", "Firebase", "Socket.io", "Vite"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com",
      glowColor: "124, 58, 237", // Purple
      previewIcon: <Globe className="preview-icon glow-purple" size={48} />
    },
    {
      title: "Calculator",
      category: "Utility Application",
      description: "A high-performance calculator app featuring clean layouts, historical calculation memories, modular equations parsing, scientific operational triggers, and visual grid transitions.",
      tags: ["HTML5", "CSS3 Modules", "Vanilla JS"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com",
      glowColor: "0, 212, 255", // Blue
      previewIcon: <Calculator className="preview-icon glow-blue" size={48} />
    },
    {
      title: "News Portal",
      category: "Full-Stack Web App",
      description: "A comprehensive media publication engine fetching international stories, incorporating customized categorization panels, reader review threads, bookmarks collection, and article caching layers.",
      tags: ["React", "Node.js", "MongoDB", "NewsAPI"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com",
      glowColor: "124, 58, 237", // Purple
      previewIcon: <Newspaper className="preview-icon glow-purple" size={48} />
    },
    {
      title: "Tic Tac Toe Game",
      category: "Interactive Gaming",
      description: "A responsive tic-tac-toe application with custom local matches, score logs, smart AI agent modes using minimax evaluations, visual grid glows, and audio-sfx triggers.",
      tags: ["React", "CSS Grid", "Minimax AI"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com",
      glowColor: "0, 212, 255", // Blue
      previewIcon: <Play className="preview-icon glow-blue" size={48} />
    }
  ];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // Add small buffer to avoid floating-point errors
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // Run once initially
      handleScroll();
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="projects" className="section-container projects-section">
      <div className="glow-bg projects-glow" style={{ top: '30%', left: '5%', width: '380px', height: '380px', backgroundColor: 'var(--accent-blue)' }} />
      
      <h2 className="section-title">Featured Projects</h2>

      {/* Slider Layout wrapper */}
      <div className="projects-slider-wrapper">
        {canScrollLeft && (
          <button className="slider-btn btn-left" onClick={scrollLeft} aria-label="Scroll Left">
            &#8249;
          </button>
        )}
        
        <div 
          ref={scrollContainerRef} 
          className="projects-horizontal-scroll"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {canScrollRight && (
          <button className="slider-btn btn-right" onClick={scrollRight} aria-label="Scroll Right">
            &#8250;
          </button>
        )}
      </div>

      <div className="scroll-hint">
        <span className="hint-line" />
        <span className="hint-text">Shift + Scroll horizontally or drag</span>
        <span className="hint-line" />
      </div>
    </section>
  );
}
