import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';
import './BlogSection.css';

const categoryMeta = {
  'AI/ML': {
    color: '#a78bfa',
    rgb: '167, 139, 250',
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #1e1b4b, #2d1b69)',
  },
  'IoT': {
    color: '#34d399',
    rgb: '52, 211, 153',
    icon: '📡',
    gradient: 'linear-gradient(135deg, #022c22, #064e3b)',
  },
  'Web': {
    color: '#38bdf8',
    rgb: '56, 189, 248',
    icon: '🌐',
    gradient: 'linear-gradient(135deg, #0c1a2e, #0e3a5c)',
  },
  'Other': {
    color: '#fb923c',
    rgb: '251, 146, 60',
    icon: '✍️',
    gradient: 'linear-gradient(135deg, #1c1007, #431407)',
  },
};

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Machine Learning: A Practical Guide',
    excerpt: 'A beginner-friendly walkthrough of core ML concepts, from linear regression to neural networks, with hands-on Python examples.',
    category: 'AI/ML',
    readTime: '6 min read',
    mediumUrl: 'https://medium.com/@yourusername',
  },
  {
    id: 2,
    title: 'Building IoT Systems with ESP32 and MQTT',
    excerpt: 'Step-by-step guide to connecting ESP32 devices to an MQTT broker for real-time data streaming and remote control.',
    category: 'IoT',
    readTime: '8 min read',
    mediumUrl: 'https://medium.com/@yourusername',
  },
  {
    id: 3,
    title: 'Modern React Patterns Every Developer Should Know',
    excerpt: 'Exploring compound components, render props, custom hooks, and context patterns to write cleaner, scalable React apps.',
    category: 'Web',
    readTime: '5 min read',
    mediumUrl: 'https://medium.com/@yourusername',
  },
  {
    id: 4,
    title: 'Transformer Architecture Explained from Scratch',
    excerpt: 'Breaking down the self-attention mechanism, positional encoding, and encoder-decoder structure that powers modern LLMs.',
    category: 'AI/ML',
    readTime: '10 min read',
    mediumUrl: 'https://medium.com/@yourusername',
  },
  {
    id: 5,
    title: 'Edge Computing with Raspberry Pi and TensorFlow Lite',
    excerpt: 'Running inference at the edge: deploying a lightweight image classification model on Raspberry Pi without cloud dependency.',
    category: 'IoT',
    readTime: '7 min read',
    mediumUrl: 'https://medium.com/@yourusername',
  },
  {
    id: 6,
    title: 'My Journey from Engineering Student to Developer',
    excerpt: 'Lessons learned, mistakes made, and the mindset shifts that helped me grow as a developer during my engineering years.',
    category: 'Other',
    readTime: '4 min read',
    mediumUrl: 'https://medium.com/@yourusername',
  },
];

const CATEGORIES = ['All', 'AI/ML', 'IoT', 'Web', 'Other'];

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className={`section-container blog-section scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className="glow-bg blog-glow" style={{ top: '5%', right: '5%', width: '350px', height: '350px', backgroundColor: 'var(--accent-purple)' }} />
      <div className="glow-bg blog-glow-2" style={{ bottom: '10%', left: '10%', width: '250px', height: '250px', backgroundColor: 'var(--accent-blue)' }} />

      <h2 className="section-title">Blog</h2>
      <p className="blog-subtitle">Thoughts, tutorials, and stories from my journey — published on Medium.</p>

      {/* Category Filter Tabs */}
      <div className="blog-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`blog-tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            style={activeCategory === cat && cat !== 'All' ? {
              '--tab-color': categoryMeta[cat]?.color,
              '--tab-rgb': categoryMeta[cat]?.rgb,
            } : {}}
          >
            {cat !== 'All' && <span className="tab-icon">{categoryMeta[cat]?.icon}</span>}
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="blog-grid">
        {filtered.map((post, index) => {
          const meta = categoryMeta[post.category];
          return (
            <a
              key={post.id}
              href={post.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-card glass-panel"
              style={{
                '--card-accent': meta.color,
                '--card-accent-rgb': meta.rgb,
                animationDelay: `${index * 0.08}s`,
              }}
            >
              {/* Card Top Banner */}
              <div className="blog-card-banner" style={{ background: meta.gradient }}>
                <span className="blog-card-emoji">{meta.icon}</span>
                <div className="blog-card-shine" />
              </div>

              <div className="blog-card-body">
                {/* Category pill */}
                <span className="blog-category-pill">{post.category}</span>

                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>

                <div className="blog-card-footer">
                  <span className="blog-read-time">
                    <Clock size={13} />
                    {post.readTime}
                  </span>
                  <span className="blog-read-link">
                    Read on Medium <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="blog-empty">
          <p>No posts in this category yet. Check back soon!</p>
        </div>
      )}

      {/* CTA to Medium */}
      <div className="blog-cta">
        <a
          href="https://medium.com/@yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary blog-cta-btn"
        >
          View All on Medium <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
