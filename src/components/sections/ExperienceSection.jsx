import React, { useEffect, useRef, useState } from 'react';
import './ExperienceSection.css';

const milestones = [
  {
    icon: '🤖',
    title: 'Agentic AI Systems',
    desc: 'Architecting autonomous AI agents capable of multi-step reasoning, tool use, and self-reflection using LLM backbones.',
    status: 'In Progress',
    color: 'var(--accent-blue)',
    progress: 65,
  },
  {
    icon: '🧠',
    title: 'Deep Learning Research',
    desc: 'Exploring neural network architectures — transformers, CNNs, and diffusion models — applied to vision and language tasks.',
    status: 'Learning',
    color: 'var(--accent-purple)',
    progress: 45,
  },
  {
    icon: '🔗',
    title: 'RAG Pipelines',
    desc: 'Building retrieval-augmented generation pipelines with vector databases for intelligent document Q&A and knowledge systems.',
    status: 'Building',
    color: '#00e5ff',
    progress: 55,
  },
  {
    icon: '⚡',
    title: 'Full-Stack Intelligence',
    desc: 'Integrating AI-powered features into MERN applications — smart search, recommendation engines, and dynamic content generation.',
    status: 'Active',
    color: '#a78bfa',
    progress: 78,
  },
  {
    icon: '🛰️',
    title: 'IoT + AI Convergence',
    desc: 'Deploying lightweight ML inference on embedded systems (ESP32) for edge-based environmental intelligence and automation.',
    status: 'Exploring',
    color: '#34d399',
    progress: 38,
  },
  {
    icon: '🌐',
    title: 'Open Source Impact',
    desc: 'Contributing modules, fixing bugs, and co-creating tools for the global developer community through collaborative projects.',
    status: 'Ongoing',
    color: '#fb923c',
    progress: 60,
  },
];

function MilestoneCard({ item, index, isVisible }) {
  return (
    <div
      className={`milestone-card glass-panel ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="milestone-glow" style={{ background: item.color }} />
      <div className="milestone-top">
        <span className="milestone-icon">{item.icon}</span>
        <span
          className="milestone-status"
          style={{
            color: item.color,
            backgroundColor: `${item.color}15`,
            border: `1px solid ${item.color}40`,
          }}
        >
          {item.status}
        </span>
      </div>
      <h3 className="milestone-title">{item.title}</h3>
      <p className="milestone-desc">{item.desc}</p>
      <div className="milestone-progress-track">
        <div
          className="milestone-progress-fill"
          style={{
            width: isVisible ? `${item.progress}%` : '0%',
            background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
            transitionDelay: `${index * 100 + 400}ms`,
          }}
        />
      </div>
      <span className="milestone-pct" style={{ color: item.color }}>
        {item.progress}% explored
      </span>
    </div>
  );
}

export default function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-container exp-journey-section">
      {/* Ambient glows */}
      <div className="glow-bg" style={{ top: '10%', left: '0%', width: '500px', height: '500px', backgroundColor: 'var(--accent-blue)', opacity: 0.07 }} />
      <div className="glow-bg" style={{ bottom: '5%', right: '0%', width: '400px', height: '400px', backgroundColor: 'var(--accent-purple)', opacity: 0.07 }} />

      {/* Floating particles */}
      <div className="exp-particles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="exp-particle" style={{ '--i': i }} />
        ))}
      </div>

      {/* Header */}
      <div className={`exp-header ${isVisible ? 'visible' : ''}`}>
        <div className="exp-badge">
          <span className="exp-badge-dot" />
          <span>Journey in Progress</span>
        </div>
        <h2 className="section-title exp-section-title">
          Gaining{' '}
          <span className="gradient-text-blue">Experiences</span>
          <br />
          &amp; Building{' '}
          <span className="gradient-text-purple">Intelligent Systems</span>
        </h2>
        <p className="exp-subtitle">
          Every line of code, every model trained, every system deployed — is a step forward in crafting the future of intelligent technology.
        </p>
      </div>

      {/* Milestone cards */}
      <div className="milestones-grid">
        {milestones.map((item, idx) => (
          <MilestoneCard key={item.title} item={item} index={idx} isVisible={isVisible} />
        ))}
      </div>

      {/* Bottom quote strip */}
      <div className={`exp-quote-strip ${isVisible ? 'visible' : ''}`}>
        <div className="exp-quote-inner">
          <span className="exp-quote-icon">✦</span>
          <p className="exp-quote-text">
            "The best way to predict the future is to invent it."
          </p>
          <span className="exp-quote-attr">— Alan Kay</span>
          <span className="exp-quote-icon">✦</span>
        </div>
      </div>
    </section>
  );
}
