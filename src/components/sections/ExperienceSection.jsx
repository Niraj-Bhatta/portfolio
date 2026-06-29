import React, { useEffect, useState, useRef } from 'react';
import { Calendar, Briefcase, GraduationCap, Code } from 'lucide-react';
import './ExperienceSection.css';

// Single Timeline Node component to encapsulate visibility checking
function TimelineNode({ item, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => {
      if (nodeRef.current) observer.unobserve(nodeRef.current);
    };
  }, []);

  return (
    <div 
      ref={nodeRef} 
      className={`timeline-item ${isVisible ? 'active' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Icon Node */}
      <div className="timeline-node" style={{ borderColor: isVisible ? item.color : 'var(--card-border)' }}>
        <div className="node-dot" style={{ backgroundColor: isVisible ? item.color : 'transparent' }} />
      </div>

      {/* Content Card */}
      <div className="timeline-content glass-panel">
        <div className="timeline-header">
          <span className="role">{item.role}</span>
          <span className="company-info">
            <span className="company">{item.company}</span>
            <span className="location">• {item.location}</span>
          </span>
        </div>
        
        <p className="timeline-desc">{item.desc}</p>
        
        <div className="timeline-footer">
          <span className="date-badge">
            <Calendar size={13} className="meta-icon" /> {item.date}
          </span>
          <span className="tag-type" style={{ color: item.color, backgroundColor: `${item.color}0D`, border: `1px solid ${item.color}33` }}>
            {item.typeIcon} {item.type}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
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

  const roadmapItems = [
    {
      role: "Full Stack Developer Intern",
      company: "Educationify pvt. ltd.",
      location: "Kathmandu, NP",
      desc: "Spearheaded frontend dashboard implementations using React and Redux, improving state consistency. Built RESTful API endpoints in Node.js and conducted optimization audits on PostgreSQL indexing structures.",
      date: "Nov 2025 - Feb 2026",
      type: "Internship",
      typeIcon: <Briefcase size={12} />,
      color: "var(--accent-blue)"
    },
    {
      role: "Undergraduate Researcher (IoT)",
      company: "NCIT R&D Hub",
      location: "Lalitpur, NP",
      desc: "Engineered ultra-low-power firmware libraries for ESP32 and Arduino boards, focusing on deep-sleep cycles. Integrated LoRaWAN communication protocols to log climate metrics back to centralized Firebase modules.",
      date: "Jun 2025 - Oct 2025",
      type: "Research",
      typeIcon: <Code size={12} />,
      color: "var(--accent-purple)"
    },
    {
      role: "Open Source Contributor",
      company: "GitHub / Hacktoberfest",
      location: "Remote",
      desc: "Contributed modular tools and utility fixes to community repositories. Optimized CSS custom selectors and implemented responsive mobile layouts for web development frameworks.",
      date: "Oct 2024 - Nov 2024",
      type: "Contribution",
      typeIcon: <Code size={12} />,
      color: "var(--accent-blue)"
    },
    {
      role: "Computer Engineering Student",
      company: "Nepal College of Information Technology (NCIT)",
      location: "Lalitpur, NP",
      desc: "Rigorous coursework focusing on software development structures, data communications, database queries, logic design, and digital microchips. Maintaining top academic evaluations.",
      date: "2023 - Present",
      type: "Education",
      typeIcon: <GraduationCap size={12} />,
      color: "var(--accent-purple)"
    }
  ];

  return (
    <section id="experience" className="section-container experience-section">
      <div className="glow-bg experience-glow" style={{ top: '30%', left: '5%', width: '350px', height: '350px', backgroundColor: 'var(--accent-blue)' }} />

      <h2 className="section-title">Roadmap & Experience</h2>

      <div className="timeline-container">
        {/* Central Vertical Connector Line */}
        <div className="timeline-line" />

        {/* Nodes */}
        {roadmapItems.map((item, idx) => (
          <TimelineNode key={item.role + idx} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
}
