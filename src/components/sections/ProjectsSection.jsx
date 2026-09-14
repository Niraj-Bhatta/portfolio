import React, { useRef, useState, useEffect } from 'react';
import { ExternalLink, Cpu, Shield, User, Globe, Calculator, Newspaper, Play } from 'lucide-react';
import { Github } from '../ui/SocialIcons';
import './ProjectsSection.css';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [imageErrors, setImageErrors] = useState({});
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

  const projects = [
    {
      id: "parking",
      title: "Smart Parking System",
      filterCategory: "Other",
      description: "An automated real-time IoT solution using ESP32, IR sensors, and ultrasonic modules to detect stall occupancy. Synchronizes data with Firebase Realtime Database for live web app parking status and reservation mapping.",
      tags: ["ESP32", "Firebase", "C++ / Arduino", "React"],
      liveLink: "https://niraj-bhatta.github.io/Smart_parking_system/",
      gitLink: "https://github.com/Niraj-Bhatta/Smart_parking_system",
      imgName: "parking.jpg",
      glowColor: "0, 212, 255", // Blue
      previewIcon: <Cpu className="preview-icon glow-blue" size={48} />
    },
    {
      id: "student",
      title: "Student Info Management System",
      filterCategory: "Web",
      description: "A database-centric administration platform featuring automated student registry tracking, grading schemas, analytical reports, roles/permissions levels, and academic charting panels.",
      tags: ["React", "Express", "PostgreSQL", "Tailwind"],
      liveLink: "https://niraj-bhatta.github.io/student-information-system/",
      gitLink: "https://github.com/Niraj-Bhatta/student_info_sys",
      imgName: "student.png",
      glowColor: "0, 212, 255", // Blue
      previewIcon: <User className="preview-icon glow-blue" size={48} />
    },
    {
      id: "deltaversity",
      title: "Deltaversity",
      filterCategory: "Web",
      description: "An interactive educational environment providing online courses, visual lesson maps, peer discussion forums, testing portals, and instructor course construction suites.",
      tags: ["MERN Stack", "Firebase", "Socket.io", "Vite"],
      liveLink: "https://deltaversity.vercel.app",
      gitLink: "https://github.com/Niraj-Bhatta/deltaversity",
      imgName: "deltaversity.png",
      glowColor: "124, 58, 237", // Purple
      previewIcon: <Globe className="preview-icon glow-purple" size={48} />
    },
    {
      id: "banking",
      title: "Banking System",
      filterCategory: "Web",
      description: "A modern banking application that allows users to perform various banking operations like deposits, withdrawals, and transfers.",
      tags: ["Django", "HTML", "CSS", "SQLite"],
      liveLink: "https://banking-system-tfsd.onrender.com/",
      gitLink: "https://github.com/Niraj-Bhatta/Banking_System",
      imgName: "bankings.png",
      glowColor: "124, 58, 237", // Purple
      previewIcon: <Globe className="preview-icon glow-purple" size={48} />
    },
    {
      id: "calculator",
      title: "Calculator",
      filterCategory: "Other",
      description: "A high-performance calculator app featuring clean layouts, historical calculation memories, modular equations parsing, scientific operational triggers, and visual grid transitions.",
      tags: ["HTML5", "CSS3 Modules", "Vanilla JS"],
      liveLink: "https://niraj-bhatta.github.io/Calculator/",
      gitLink: "https://github.com/Niraj-Bhatta/Calculator",
      imgName: "calculator.png",
      glowColor: "0, 212, 255", // Blue
      previewIcon: <Calculator className="preview-icon glow-blue" size={48} />
    },
    {
      id: "news",
      title: "News Portal",
      filterCategory: "Web",
      description: "A comprehensive media publication engine fetching international stories, incorporating customized categorization panels, reader review threads, bookmarks collection, and article caching layers.",
      tags: ["React", "Node.js", "MongoDB", "NewsAPI"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com/Niraj-Bhatta/react-project/tree/main/my-project/newsapp",
      imgName: "news.png",
      glowColor: "124, 58, 237", // Purple
      previewIcon: <Newspaper className="preview-icon glow-purple" size={48} />
    },
    {
      id: "news",
      title: "News Portal",
      filterCategory: "Web",
      description: "A comprehensive media publication engine fetching international stories, incorporating customized categorization panels, reader review threads, bookmarks collection, and article caching layers.",
      tags: ["React", "Node.js", "MongoDB", "NewsAPI"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com/Niraj-Bhatta/react-project/tree/main/my-project/newsapp",
      imgName: "news.png",
      glowColor: "124, 58, 237", // Purple
      previewIcon: <Newspaper className="preview-icon glow-purple" size={48} />
    },
    {
      id: "weather-api",
      title: "Weather API App",
      filterCategory: "Web",
      description: "A responsive weather application built with HTML, CSS, and JavaScript, featuring real-time weather data fetched through a weather API, city-based search, current temperature and conditions, humidity, wind speed, weather icons, and a clean responsive interface",
      tags: ["HTML", "CSS", "JavaScript", "Weather API"],
      liveLink: "https://niraj-bhatta.github.io/weather-app/",
      gitLink: "https://github.com/Niraj-Bhatta/weather-app",
      imgName: "weather.png",
      glowColor: "0, 212, 255", // Blue
      previewIcon: <Play className="preview-icon glow-blue" size={48} />
    },
    {
      id: "gov",
      title: "Government Document Verification System",
      filterCategory: "Web",
      description: "A secure digital portal utilizing cryptographic hashing and authorization nodes to verify state certificates and identity credentials, minimizing forgery and administrative overhead.",
      tags: ["Node.js", "Express", "React", "MongoDB", "Crypto"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com",
      imgName: "verification.jpg",
      glowColor: "124, 58, 237", // Purple
      previewIcon: <Shield className="preview-icon glow-purple" size={48} />
    }
  ];

  const categories = ['All', 'Web', 'Other'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.filterCategory === activeFilter);

  const handleImageError = (projectId) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`section-container projects-section scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className="glow-bg projects-glow" style={{ top: '30%', left: '5%', width: '380px', height: '380px', backgroundColor: 'var(--accent-blue)' }} />

      <h2 className="section-title">Projects</h2>

      {/* Categories Filter Panel */}
      <div className="filter-container">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid Layout */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card glass-panel">
            {/* Top window styling decor */}
            <div className="card-top-bar">
              <span className="window-dots">
                <span></span><span></span><span></span>
              </span>
              <span className="card-category">{project.filterCategory}</span>
            </div>

            {/* Cover Image Wrapper */}
            <div className="project-image-wrapper">
              {imageErrors[project.id] ? (
                <div className="project-placeholder" style={{ background: `radial-gradient(circle at center, rgba(${project.glowColor}, 0.15) 0%, transparent 70%)` }}>
                  {project.previewIcon}
                  <div className="placeholder-text">Placeholder Preview</div>
                  <div className="placeholder-scanline" />
                </div>
              ) : (
                <img
                  src={`/assets/projects/${project.imgName}`}
                  alt={project.title}
                  className="project-cover-image"
                  loading="lazy"
                  width="380"
                  height="214"
                  onError={() => handleImageError(project.id)}
                />
              )}
            </div>

            {/* Project Details */}
            <div className="project-details">
              <h3 className="project-title">{project.title}</h3>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-badge">{tag}</span>
                ))}
              </div>

              <p className="project-desc">{project.description}</p>


              {/* Actions */}
              <div className="project-actions">
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary action-btn">
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a href={project.gitLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary action-btn">
                  <Github size={16} /> GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
