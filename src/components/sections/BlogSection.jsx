import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, Clock, ArrowRight, Loader } from 'lucide-react';
import './BlogSection.css';

export default function BlogSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
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

  const blogPosts = [
    {
      id: 1,
      title: "Optimizing Embedded C++ in Resource-Constrained Microcontrollers",
      excerpt: "An in-depth look at memory overhead, static allocations, and custom registry mapping algorithms to squeeze peak efficiency out of ESP32 and ARM Cortex modules.",
      content: "Detailed post content...",
      date: "June 18, 2026",
      readTime: "7 min read",
      category: "IoT",
      imageClass: "blog-img-embedded",
      imgName: "embedded-cpp.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Navigating Full-Stack API Performance: REST vs WebSockets",
      excerpt: "Analyzing packet latency, persistent connection limits, and performance under massive read/write volumes for IoT systems and live chat nodes.",
      date: "May 24, 2026",
      readTime: "5 min read",
      category: "Architecture",
      imageClass: "blog-img-api",
      imgName: "api-websocket.jpg",
      featured: false
    },
    {
      id: 3,
      title: "Introduction to Firebase Firestore Security Rules for Production",
      excerpt: "How to draft fine-grained database access rules utilizing claims and metadata payloads, ensuring your backend is secure without custom auth servers.",
      date: "April 15, 2026",
      readTime: "4 min read",
      category: "Cloud",
      imageClass: "blog-img-security",
      imgName: "firebase-rules.jpg",
      featured: false
    },
    {
      id: 4,
      title: "Demystifying Memory Allocations and Pointers in C & C++",
      excerpt: "Deep diving into stack vs heap allocations, dereferencing behaviors, alignment buffers, and memory leaks troubleshooting with valgrind checkers.",
      date: "March 29, 2026",
      readTime: "8 min read",
      category: "Programming",
      imageClass: "blog-img-pointers",
      imgName: "pointers.jpg",
      featured: false
    },
    {
      id: 5,
      title: "Building a Real-Time Edge Analytics Node with ESP32 & WebSockets",
      excerpt: "Step-by-step firmware layout for sampling analog sensor data, running local averaging, and streaming data over lightweight WebSocket channels.",
      date: "February 12, 2026",
      readTime: "6 min read",
      category: "IoT",
      imageClass: "blog-img-edge",
      imgName: "edge-analytics.jpg",
      featured: false
    },
    {
      id: 6,
      title: "Why I Choose Vanilla CSS Over Utility Frameworks in 2026",
      excerpt: "Exploring CSS custom properties, logical layout rules, utility blending modes, and why keeping your bundle framework-free results in better performance.",
      date: "January 08, 2026",
      readTime: "4 min read",
      category: "Frontend",
      imageClass: "blog-img-css",
      imgName: "vanilla-css.jpg",
      featured: false
    }
  ];

  const categories = ['All', 'IoT', 'Architecture', 'Cloud', 'Programming', 'Frontend'];

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate API fetch delay
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 3, filteredPosts.length));
      setIsLoadingMore(false);
    }, 800);
  };

  // Reset page size when search filters change
  useEffect(() => {
    setVisibleCount(3);
  }, [searchQuery, activeCategory]);

  const featuredPost = filteredPosts.find(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured || (activeCategory !== 'All' && p.featured));

  return (
    <section 
      ref={sectionRef}
      id="blog" 
      className={`section-container blog-section scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className="glow-bg blog-glow" style={{ top: '10%', left: '5%', width: '300px', height: '300px', backgroundColor: 'var(--accent-blue)' }} />

      <h2 className="section-title">Tech Blog</h2>

      {/* Search and Filters */}
      <div className="blog-controls">
        <div className="search-box glass-panel">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="blog-categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`blog-cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Article - only show if search query is empty or matches */}
      {featuredPost && activeCategory === 'All' && !searchQuery && (
        <div className="featured-post-card glass-panel">
          <div className={`featured-image ${featuredPost.imageClass}`}>
            <img 
              src={`/assets/blogs/${featuredPost.imgName}`} 
              alt={featuredPost.title}
              loading="lazy"
              width="720"
              height="380"
              className="blog-cover-image"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="category-pill">{featuredPost.category}</div>
          </div>
          <div className="featured-info">
            <div className="post-meta">
              <span className="meta-item"><Calendar size={14} /> {featuredPost.date}</span>
              <span className="meta-item"><Clock size={14} /> {featuredPost.readTime}</span>
            </div>
            <h2>{featuredPost.title}</h2>
            <p>{featuredPost.excerpt}</p>
            <a href="#blog" className="read-more-link">
              Read Full Article <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="blog-grid">
        {(activeCategory === 'All' && !searchQuery ? regularPosts : filteredPosts)
          .slice(0, visibleCount)
          .map((post) => (
            <div key={post.id} className="blog-card glass-panel">
              <div className={`blog-card-image ${post.imageClass}`}>
                <img 
                  src={`/assets/blogs/${post.imgName}`} 
                  alt={post.title}
                  loading="lazy"
                  width="380"
                  height="180"
                  className="blog-cover-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="category-pill">{post.category}</div>
              </div>
              
              <div className="blog-card-content">
                <div className="post-meta">
                  <span className="meta-item"><Calendar size={12} /> {post.date}</span>
                  <span className="meta-item"><Clock size={12} /> {post.readTime}</span>
                </div>
                
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                
                <a href="#blog" className="read-more-link">
                  Read Article <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
      </div>


      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="blog-empty-state">
          <p>No articles matching your search criteria were found.</p>
        </div>
      )}

      {/* Load More Trigger */}
      {filteredPosts.length > visibleCount && (
        <div className="load-more-container">
          <button 
            className="btn btn-secondary load-more-btn" 
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <Loader size={16} className="spinner" /> Loading Articles...
              </>
            ) : (
              "Load More Posts"
            )}
          </button>
        </div>
      )}
    </section>
  );
}
