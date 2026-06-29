import React, { useEffect, useState, useRef } from 'react';
import { Calendar, Award, Star, Flame, Trophy, Heart } from 'lucide-react';
import './AchievementsSection.css';

export default function AchievementsSection() {
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

  const achievements = [
    {
      title: "IEEE Program Coordinator",
      organization: "IEEE Student Branch",
      date: "2026 - Present",
      description: "Led and organized technical workshops, coding bootcamps, and networking panels. Collaborated with professional engineers to deliver educational content to 200+ active student members.",
      icon: <Star size={20} />,
      color: "var(--accent-blue)"
    },
    {
      title: "IoT Competition Winner",
      organization: "NCIT College",
      date: "Febrary 2026",
      description: "Secured 1st Place out of 22 teams for constructing Smart Parking System. Built on ESP32 microcontrollers communicating via MQTT protocols to stream real-time availability.",
      icon: <Trophy size={20} />,
      color: "var(--accent-purple)"
    },
    {
      title: "NCIT TechFest Organizer",
      organization: "NCIT Technical Committee",
      date: "June 2026",
      description: "Co-managed operations, scheduling, and judge panels for the annual college tech festival hosting 1000+ attendees. Handled venue coordination, budget allocation, and technical hardware tracks.",
      icon: <Award size={20} />,
      color: "var(--accent-blue)"
    },
    {
      title: "Hackathon Participation",
      organization: "Locohacks / HackFest",
      date: "2024 - 2025",
      description: "Participated in multiple competitive hackathons, prototyping full-stack software and IoT models. Refined agile development, quick problem-solving, and API orchestration capabilities.",
      icon: <Flame size={20} />,
      color: "var(--accent-purple)"
    },
    {
      title: "Technical Events Leadership",
      organization: "NCIT College Computer Club (CITC)",
      date: "2024 - Present",
      description: "Mentored first-year engineering students in circuit designing, basic C++ firmware scripting, and git version tracking. Promoted peer learning and collaboration cultures.",
      icon: <Star size={20} />,
      color: "var(--accent-blue)"
    },
    {
      title: "NCIT Football Winner",
      organization: "Inter-College Sports League",
      date: "May 2026",
      description: "Led the engineering team to victory in the inter-departmental soccer championships. Emphasized endurance, speed, communication, strategizing under pressure, and trust dynamics.",
      icon: <Heart size={20} />,
      color: "var(--accent-purple)"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="achievements" 
      className={`section-container achievements-section scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className="glow-bg achievements-glow" style={{ top: '20%', right: '5%', width: '300px', height: '300px', backgroundColor: 'var(--accent-purple)' }} />

      <h2 className="section-title">Achievements</h2>

      <div className={`achievements-grid ${isVisible ? 'visible' : ''}`}>
        {achievements.map((item, idx) => (
          <div 
            key={item.title} 
            className="achievement-card glass-panel"
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <div className="achievement-icon-wrapper" style={{ color: item.color, border: `1.5px solid ${item.color}33`, backgroundColor: `${item.color}0D` }}>
              {item.icon}
            </div>

            <div className="achievement-info">
              <div className="achievement-meta">
                <span className="org">{item.organization}</span>
                <span className="date">
                  <Calendar size={12} className="date-icon" /> {item.date}
                </span>
              </div>
              
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
