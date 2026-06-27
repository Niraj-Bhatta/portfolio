import React, { useState, useEffect, useRef } from 'react';
import { Award, Calendar, CheckCircle, ExternalLink, X, Eye } from 'lucide-react';
import './CertificatesSection.css';

// SVG Certificate Vector Mockup Component (used as lightbox preview and fallback)
function CertificateVector({ title, issuer, date, credId, accentColor }) {
  return (
    <svg viewBox="0 0 800 500" width="100%" height="100%" className="certificate-svg" xmlns="http://www.w3.org/2000/svg">
      {/* Background Grid */}
      <rect width="800" height="500" rx="16" fill="#0A0F1D" stroke="rgba(255,255,255,0.06)" strokeWidth="2"/>
      <defs>
        <radialGradient id={`glow-${credId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0A0F1D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`border-${credId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      
      {/* Decorative Glow */}
      <circle cx="400" cy="250" r="300" fill={`url(#glow-${credId})`} />
      
      {/* Inner border */}
      <rect x="25" y="25" width="750" height="450" rx="12" fill="none" stroke={`url(#border-${credId})`} strokeWidth="1.5" strokeOpacity="0.4" />
      
      {/* Technical Hexagons/Decors */}
      <path d="M 40 40 L 70 40 L 55 60 Z" fill={accentColor} opacity="0.4" />
      <path d="M 760 40 L 730 40 L 745 60 Z" fill={accentColor} opacity="0.4" />
      <path d="M 40 460 L 70 460 L 55 440 Z" fill={accentColor} opacity="0.4" />
      <path d="M 760 460 L 730 460 L 745 440 Z" fill={accentColor} opacity="0.4" />

      {/* Grid Lines */}
      <line x1="100" y1="50" x2="700" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="5 5" />
      <line x1="100" y1="450" x2="700" y2="450" stroke="rgba(255,255,255,0.05)" strokeDasharray="5 5" />

      {/* Header */}
      <text x="400" y="80" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="12" letterSpacing="6" fontFamily="monospace">CERTIFICATE OF ACHIEVEMENT</text>
      
      {/* Badge Icon */}
      <g transform="translate(376, 110)">
        <path d="M24 0L48 14V42L24 56L0 42V14L24 0Z" fill="none" stroke={accentColor} strokeWidth="2" />
        <circle cx="24" cy="28" r="12" fill="none" stroke={accentColor} strokeWidth="1.5" />
        <path d="M20 28 L23 31 L28 25" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Certification details */}
      <text x="400" y="210" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="bold" fontFamily="sans-serif">NIRAJ BHATTA</text>
      <text x="400" y="240" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="14" fontFamily="sans-serif">has successfully completed the coursework for</text>
      <text x="400" y="280" textAnchor="middle" fill={accentColor} fontSize="22" fontWeight="800" fontFamily="sans-serif">{title}</text>
      
      {/* Divider */}
      <line x1="300" y1="315" x2="500" y2="315" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* Footer Info */}
      <text x="150" y="370" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="sans-serif">ISSUER</text>
      <text x="150" y="395" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold" fontFamily="sans-serif">{issuer}</text>

      <text x="400" y="370" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="sans-serif">DATE</text>
      <text x="400" y="395" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold" fontFamily="sans-serif">{date}</text>

      <text x="650" y="370" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="sans-serif">CREDENTIAL ID</text>
      <text x="650" y="395" textAnchor="middle" fill="#00D4FF" fontSize="13" fontFamily="monospace">{credId}</text>

      {/* Border Lines bottom decoration */}
      <path d="M 350 450 L 450 450" stroke={accentColor} strokeWidth="3" />
    </svg>
  );
}

export default function CertificatesSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);
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

  const certificates = [
    {
      id: "cert-iot",
      title: "Introduction to IoT & Embedded Systems",
      issuer: "Coursera / UC Irvine",
      date: "September 2025",
      category: "IoT",
      credId: "UC-IOT-9481A",
      verifyLink: "https://coursera.org/verify",
      accentColor: "#00d4ff",
      imgName: "iot.jpg",
      desc: "Comprehensive coursework on embedded firmware design, sensor-hardware integration, protocol stacks (MQTT, HTTP), and serial interfaces."
    },
    {
      id: "cert-gcp",
      title: "Associate Cloud Engineer",
      issuer: "Google Cloud",
      date: "December 2025",
      category: "Cloud",
      credId: "GCP-ACE-7721X",
      verifyLink: "https://google.com/cloud",
      accentColor: "#7c3aed",
      imgName: "gcp.jpg",
      desc: "Rigorous certification covering virtual machine provision configurations, Kubernetes clusters, IAM access controls, and database operations."
    },
    {
      id: "cert-aws",
      title: "Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      date: "February 2026",
      category: "Cloud",
      credId: "AWS-SAA-8822B",
      verifyLink: "https://aws.amazon.com",
      accentColor: "#00d4ff",
      imgName: "aws.jpg",
      desc: "Validation of expertise in designing highly available, cost-efficient, fault-tolerant, and scalable AWS cloud infrastructure architectures."
    },
    {
      id: "cert-fs",
      title: "Meta Full-Stack Developer",
      issuer: "Meta / Coursera",
      date: "October 2025",
      category: "Software",
      credId: "META-FS-2098D",
      verifyLink: "https://coursera.org/verify",
      accentColor: "#7c3aed",
      imgName: "meta.jpg",
      desc: "A 9-course professional specialization program focusing on React development, Django server APIs, database queries, and deployment architectures."
    },
    {
      id: "cert-mongo",
      title: "Developer Associate",
      issuer: "MongoDB University",
      date: "January 2026",
      category: "Databases",
      credId: "MONGO-DEV-5541L",
      verifyLink: "https://mongodb.com",
      accentColor: "#00d4ff",
      imgName: "mongodb.jpg",
      desc: "Validation of expertise in schema mapping configurations, indexing algorithms, aggregation pipeline designs, and data modeling best practices."
    }
  ];

  const categories = ['All', 'IoT', 'Cloud', 'Software', 'Databases'];

  const filteredCerts = activeFilter === 'All'
    ? certificates
    : certificates.filter(c => c.category === activeFilter);

  const handleImageError = (certId) => {
    setImageErrors(prev => ({ ...prev, [certId]: true }));
  };

  return (
    <section 
      ref={sectionRef} 
      id="certificates" 
      className={`section-container certificates-section scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className="glow-bg certificates-glow" style={{ bottom: '10%', right: '5%', width: '320px', height: '320px', backgroundColor: 'var(--accent-purple)' }} />

      <h2 className="section-title">Certifications</h2>

      {/* Filter Options */}
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

      {/* Certification Cards Grid */}
      <div className="certs-grid">
        {filteredCerts.map((cert) => (
          <div key={cert.id} className="cert-card glass-panel">
            <div className="cert-badge-icon" style={{ backgroundColor: `${cert.accentColor}1A`, color: cert.accentColor }}>
              <Award size={20} />
            </div>
            
            {/* Thumbnail: Sourced or Fallback Vector mockup */}
            <div className="cert-thumbnail" onClick={() => setSelectedCert(cert)}>
              {imageErrors[cert.id] ? (
                <div className="vector-thumbnail-wrapper">
                  <CertificateVector 
                    title={cert.title} 
                    issuer={cert.issuer} 
                    date={cert.date} 
                    credId={cert.credId} 
                    accentColor={cert.accentColor} 
                  />
                </div>
              ) : (
                <img
                  src={`/assets/certificates/${cert.imgName}`}
                  alt={cert.title}
                  className="cert-img"
                  onError={() => handleImageError(cert.id)}
                />
              )}
              <div className="thumbnail-overlay">
                <span className="expand-text">
                  <Eye size={18} /> Preview Certificate
                </span>
              </div>
            </div>

            <div className="cert-info">
              <span className="cert-issuer">{cert.issuer}</span>
              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-meta">
                <Calendar size={14} className="meta-icon" />
                <span>{cert.date}</span>
              </div>
              <button className="btn btn-secondary view-details-btn" onClick={() => setSelectedCert(cert)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div className="lightbox-overlay" onClick={() => setSelectedCert(null)}>
          <div className="lightbox-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedCert(null)}>
              <X size={24} />
            </button>

            <div className="lightbox-body">
              {/* Left: Certificate Visual Vector */}
              <div className="lightbox-visual">
                <CertificateVector 
                  title={selectedCert.title} 
                  issuer={selectedCert.issuer} 
                  date={selectedCert.date} 
                  credId={selectedCert.credId} 
                  accentColor={selectedCert.accentColor} 
                />
              </div>

              {/* Right: Text Details */}
              <div className="lightbox-details">
                <div className="lightbox-header">
                  <span className="badge-issuer" style={{ color: selectedCert.accentColor }}>{selectedCert.issuer}</span>
                  <h2>{selectedCert.title}</h2>
                </div>

                <p className="lightbox-desc">{selectedCert.desc}</p>

                <div className="lightbox-meta-list">
                  <div className="meta-list-item">
                    <span className="label">Date Earned:</span>
                    <span className="val">{selectedCert.date}</span>
                  </div>
                  <div className="meta-list-item">
                    <span className="label">Credential ID:</span>
                    <span className="val monospace">{selectedCert.credId}</span>
                  </div>
                  <div className="meta-list-item">
                    <span className="label">Status:</span>
                    <span className="val status-valid">
                      <CheckCircle size={14} /> Active / Verified
                    </span>
                  </div>
                </div>

                <div className="lightbox-actions">
                  <a
                    href={selectedCert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary verify-btn"
                  >
                    Verify Credential <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
