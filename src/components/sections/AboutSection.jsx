import React, { useEffect, useState, useRef } from 'react';
import { BookOpen, Code, Cpu, Brain, Trophy, Users } from 'lucide-react';
import './AboutSection.css';

// Custom Counter Hook or Helper component
function Counter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function AboutSection() {
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

  const corePillars = [
    {
      icon: <BookOpen className="pillar-icon" />,
      title: "Computer Engineering Student",
      desc: "Specializing in software engineering, embedded systems, hardware-software integration, and neural architectures."
    },
    {
      icon: <Code className="pillar-icon" />,
      title: "Full Stack Development",
      desc: "Designing responsive frontend layouts and robust microservice backends using modern languages and design systems."
    },
    {
      icon: <Cpu className="pillar-icon" />,
      title: "IoT Development",
      desc: "Interfacing microcontrollers (ESP32, Arduino) with cloud engines to build real-time smart hardware frameworks."
    },
    {
      icon: <Brain className="pillar-icon" />,
      title: "Problem Solving",
      desc: "Formulating algorithms, analyzing computational complexity, and resolving data structures problems under time limits."
    },
    {
      icon: <Trophy className="pillar-icon" />,
      title: "Hackathons",
      desc: "Collaborating in high-pressure 48-hour sprints, prototyping software/hardware innovations, and pitching to industry panels."
    },
    {
      icon: <Users className="pillar-icon" />,
      title: "Leadership & Events",
      desc: "Coordinating technical symposia, steering engineering student committees, and hosting coding workshops."
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="section-container about-section">
      <div className="glow-bg about-glow" style={{ top: '20%', left: '10%', width: '300px', height: '300px', backgroundColor: 'var(--accent-blue)' }} />
      <div className="glow-bg about-glow" style={{ bottom: '10%', right: '5%', width: '250px', height: '250px', backgroundColor: 'var(--accent-purple)' }} />

      <h2 className="section-title">About Me</h2>

      <div className={`about-grid ${isVisible ? 'visible' : ''}`}>
        {/* Intro Text */}
        <div className="about-intro-card glass-panel">
          <h3>Architecting the Future</h3>
          <p>
            I am a passionate Computer Engineering student driven by a mission to build scalable, intelligent, and highly optimized hardware-software systems.
          </p>
          <p>
            Bridging the gap between code and physical computing, I leverage modern full-stack development methodologies along with IoT architecture to create solutions that address real-world challenges. My approach is characterized by clean modular designs, rigorous performance checks, and continuous learning.
          </p>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-num"><Counter end={12} suffix="+" /></span>
              <span className="stat-lbl">Projects Done</span>
            </div>
            <div className="stat-item">
              <span className="stat-num"><Counter end={5} suffix="+" /></span>
              <span className="stat-lbl">Hackathons</span>
            </div>
            <div className="stat-item">
              <span className="stat-num"><Counter end={1500} suffix="+" /></span>
              <span className="stat-lbl">Hours Coding</span>
            </div>
          </div>
        </div>

        {/* Dynamic Pillars */}
        <div className="pillars-container">
          {corePillars.map((pillar, idx) => (
            <div key={pillar.title} className="pillar-card glass-panel" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="pillar-header">
                {pillar.icon}
                <h4>{pillar.title}</h4>
              </div>
              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
