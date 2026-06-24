import React, { useEffect, useState, useRef } from 'react';
import { Layout, Server, Database, Cpu, Cloud, BrainCircuit, Layers } from 'lucide-react';
import './SkillsSection.css';

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const skillsData = [
    {
      category: "Frontend Development",
      icon: <Layout className="skill-cat-icon" />,
      skills: [
        { name: "React / Vite", level: 92 },
        { name: "HTML5 / CSS3 / ES6+", level: 95 },
        { name: "Responsive UI (Vanilla CSS)", level: 90 },
        { name: "State Management", level: 85 }
      ]
    },
    {
      category: "Backend Development",
      icon: <Server className="skill-cat-icon" />,
      skills: [
        { name: "Node.js / Express", level: 88 },
        { name: "RESTful APIs", level: 90 },
        { name: "Authentication (JWT, OAuth)", level: 82 },
        { name: "Microservices", level: 78 }
      ]
    },
    {
      category: "Database Systems",
      icon: <Database className="skill-cat-icon" />,
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "SQL (PostgreSQL / MySQL)", level: 82 },
        { name: "Database Optimization", level: 75 },
        { name: "Redis Caching", level: 70 }
      ]
    },
    {
      category: "IoT & Embedded Systems",
      icon: <Cpu className="skill-cat-icon" />,
      skills: [
        { name: "Microcontrollers (ESP32/Arduino)", level: 90 },
        { name: "Hardware Interfacing (I2C/SPI)", level: 85 },
        { name: "Firmware Development (C++)", level: 88 },
        { name: "Sensors & Actuators", level: 92 }
      ]
    },
    {
      category: "Cloud & Firebase",
      icon: <Cloud className="skill-cat-icon" />,
      skills: [
        { name: "Firebase (Auth, Firestore, Hosting)", level: 88 },
        { name: "Google Cloud Platform", level: 72 },
        { name: "Docker / Containerization", level: 75 },
        { name: "CI/CD Pipelines", level: 70 }
      ]
    },
    {
      category: "Problem Solving",
      icon: <BrainCircuit className="skill-cat-icon" />,
      skills: [
        { name: "Data Structures & Algorithms", level: 85 },
        { name: "C / C++ Programming", level: 90 },
        { name: "Python Scripting", level: 80 },
        { name: "Code Optimization", level: 82 }
      ]
    },
    {
      category: "MERN Stack",
      icon: <Layers className="skill-cat-icon" />,
      skills: [
        { name: "MongoDB Integration", level: 86 },
        { name: "Express Server Architecture", level: 88 },
        { name: "React Frontend Systems", level: 92 },
        { name: "Node.js Engine Control", level: 90 }
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="skills" className="section-container skills-section">
      <div className="glow-bg skills-glow" style={{ top: '40%', right: '10%', width: '350px', height: '350px', backgroundColor: 'var(--accent-purple)' }} />
      <div className="glow-bg skills-glow" style={{ bottom: '20%', left: '5%', width: '280px', height: '280px', backgroundColor: 'var(--accent-blue)' }} />

      <h2 className="section-title">My Skills</h2>

      <div className={`skills-container ${isVisible ? 'visible' : ''}`}>
        {skillsData.map((category, catIdx) => (
          <div 
            key={category.category} 
            className="skills-card glass-panel"
            style={{ transitionDelay: `${catIdx * 100}ms` }}
          >
            <div className="skills-card-header">
              {category.icon}
              <h3>{category.category}</h3>
            </div>
            
            <div className="skills-list">
              {category.skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div 
                      className="skill-bar-fill"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${catIdx * 100 + 200}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
