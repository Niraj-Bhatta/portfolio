import React, { useEffect, useState, useRef } from 'react';
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const skillCategories = [
    {
      category: "Frontend",
      emoji: "🎨",
      skills: [
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
      ]
    },
    {
      category: "Backend",
      emoji: "⚙️",
      skills: [
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "REST APIs", logo: "https://img.icons8.com/nolan/96/api-settings.png" },
      ]
    },
    {
      category: "Database",
      emoji: "🗄️",
      skills: [
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
      ]
    },
    {
      category: "Tools & DevOps",
      emoji: "🛠️",
      skills: [
        { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
        { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      ]
    },
    {
      category: "Languages",
      emoji: "💻",
      skills: [
        { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
        { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      ]
    },
    {
      category: "AI / ML Basics",
      emoji: "🧠",
      skills: [
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
        { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
        { name: "NLP (spaCy)", logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/SpaCy_logo.svg" },
        { name: "Jupyter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
        { name: "Matplotlib", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
      ]
    },
  ];

  const learningPhase = [
    {
      name: "Python for AI/ML",
      description: "NumPy, Pandas & Data Processing",
      icon: "🐍",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Machine Learning",
      description: "Scikit-learn, Supervised & Unsupervised Learning",
      icon: "🧠",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    },
    {
      name: "RAG Pipelines",
      description: "Retrieval-Augmented Generation",
      icon: "🔗",
      logo: null,
    },
    {
      name: "Agentic AI",
      description: "Autonomous AI Agents & Tool Use",
      icon: "🤖",
      logo: null,
    },
    {
      name: "Large Language Models",
      description: "Prompt Engineering & Fine-tuning",
      icon: "🧬",
      logo: null,
    },
    {
      name: "Deep Learning",
      description: "Neural Networks, PyTorch Basics",
      icon: "⚡",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    },
  ];

  return (
    <section ref={sectionRef} id="skills" className="section-container skills-section">
      <div className="glow-bg skills-glow" style={{ top: '30%', right: '10%', width: '400px', height: '400px', backgroundColor: 'var(--accent-purple)' }} />
      <div className="glow-bg skills-glow" style={{ bottom: '20%', left: '5%', width: '300px', height: '300px', backgroundColor: 'var(--accent-blue)' }} />

      <h2 className="section-title">Tech Arsenal</h2>
      <p className="skills-subtitle">Full-Stack MERN developer with a passion for building modern web applications</p>

      {/* Core Skills Grid */}
      <div className={`skills-grid ${isVisible ? 'visible' : ''}`}>
        {skillCategories.map((cat, catIdx) => (
          <div
            key={cat.category}
            className="skill-card glass-panel"
            style={{ transitionDelay: `${catIdx * 80}ms` }}
          >
            <div className="skill-card-header">
              <span className="skill-card-emoji">{cat.emoji}</span>
              <h3>{cat.category}</h3>
            </div>
            <div className="skill-logos-grid">
              {cat.skills.map((skill, idx) => (
                <div
                  key={skill.name}
                  className="skill-logo-item"
                  style={{ animationDelay: `${catIdx * 80 + idx * 60}ms` }}
                >
                  <div className="skill-logo-wrapper">
                    <img src={skill.logo} alt={skill.name} loading="lazy" />
                  </div>
                  <span className="skill-logo-label">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Learning Phase Section */}
      <div className={`learning-phase-section ${isVisible ? 'visible' : ''}`}>
        <div className="learning-phase-header">
          <div className="learning-badge">
            <span className="badge-dot" />
            <span>Currently Learning</span>
          </div>
          <h3 className="learning-phase-title">AI / ML Journey</h3>
          <p className="learning-phase-desc">
            Exploring the world of Artificial Intelligence & Machine Learning — building foundations and diving into cutting-edge concepts.
          </p>
        </div>

        <div className="learning-cards-grid">
          {learningPhase.map((item, idx) => (
            <div
              key={item.name}
              className="learning-card"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <div className="learning-card-glow" />
              {item.logo ? (
                <div className="learning-card-logo">
                  <img src={item.logo} alt={item.name} loading="lazy" />
                </div>
              ) : (
                <span className="learning-card-icon">{item.icon}</span>
              )}
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <div className="learning-pulse-bar">
                <div className="learning-pulse-fill" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
