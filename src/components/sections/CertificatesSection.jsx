import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
      id: "cert-iot-winner",
      title: "IoT Exhibition & Competition Winner",
      issuer: "NCIT / CITC Tech Fest",
      date: "August 2024",
      category: "Achievements",
      credId: "NCIT-IOT-2024",
      verifyLink: "https://ncit.edu.np",
      accentColor: "#00d4ff",
      imgName: "iot_winner.jpg",
      desc: "Awarded first place for demonstrating a working IoT prototype integrating microcontrollers, cloud data logs, and real-time sensor dashboards."
    },
    {
      id: "cert-aws-fundamentals",
      title: "AWS Cloud Practitioner Essentials",
      issuer: "Amazon Web Services",
      date: "November 2025",
      category: "Technical",
      credId: "AWS-CPE-9982L",
      verifyLink: "https://aws.amazon.com",
      accentColor: "#7c3aed",
      imgName: "aws_fundamentals.jpg",
      desc: "Validates foundational knowledge of cloud concepts, security, core services, and architectural designs on AWS."
    },
    {
      id: "cert-prompt-engineering",
      title: "Generative AI & Prompt Engineering",
      issuer: "Vanderbilt University / Coursera",
      date: "July 2025",
      category: "Technical",
      credId: "COURSERA-PE-88421",
      verifyLink: "https://coursera.org/verify",
      accentColor: "#00d4ff",
      imgName: "Prompt_engineering.png",
      desc: "Covers techniques for crafting high-quality prompts, context windows, few-shot prompting, and integrating large language models into software workflows."
    },
    {
      id: "cert-django",
      title: "Django Web Development Specialist",
      issuer: "Meta / Coursera",
      date: "September 2025",
      category: "Technical",
      credId: "META-DJ-77361",
      verifyLink: "https://coursera.org/verify",
      accentColor: "#7c3aed",
      imgName: "django.jpg",
      desc: "Deep dive into model-view-template architecture, database migrations, authentication systems, and API endpoints with Python Django."
    },
    {
      id: "cert-mern-bootcamp",
      title: "Full Stack Web Development (MERN)",
      issuer: "MERN Dev Bootcamp",
      date: "December 2025",
      category: "Technical",
      credId: "MERN-BC-1102A",
      verifyLink: "https://github.com/Niraj-Bhatta",
      accentColor: "#00d4ff",
      imgName: "mern_bootcamp.jpg",
      desc: "Comprehensive certification in frontend & backend engineering using MongoDB, Express.js, React, and Node.js for scalable web applications."
    },
    {
      id: "cert-ieee-cs",
      title: "IEEE Computer Society Membership",
      issuer: "IEEE Computer Society",
      date: "January 2025",
      category: "Community & Leadership",
      credId: "IEEE-CS-8899",
      verifyLink: "https://www.computer.org",
      accentColor: "#7c3aed",
      imgName: "computerSociety_ieee.png",
      desc: "Official certificate of membership, recognizing engagement with the world's leading organization for computer science professionals."
    },
    {
      id: "cert-ieee",
      title: "IEEE Member Certificate",
      issuer: "IEEE (Institute of Electrical and Electronics Engineers)",
      date: "January 2025",
      category: "Community & Leadership",
      credId: "IEEE-MEM-10492",
      verifyLink: "https://www.ieee.org",
      accentColor: "#00d4ff",
      imgName: "ieee.png",
      desc: "Acknowledges professional membership in IEEE, supporting technical innovation, global collaboration, and engineering excellence."
    },
    {
      id: "cert-hardware-ncit",
      title: "Computer Hardware & Microcontroller Training",
      issuer: "NCIT Student Chapter",
      date: "April 2024",
      category: "Technical",
      credId: "NCIT-HW-5542",
      verifyLink: "https://ncit.edu.np",
      accentColor: "#7c3aed",
      imgName: "hardware_ncit.jpg",
      desc: "Practical training on circuit debugging, logic gates, breadboard prototyping, and basic microcontroller programming using C."
    },
    {
      id: "cert-hardware-fellowship",
      title: "NCIT Hardware Fellowship Program",
      issuer: "NCIT Robotics Club",
      date: "June 2024",
      category: "Technical",
      credId: "NCIT-HF-0092",
      verifyLink: "https://ncit.edu.np",
      accentColor: "#00d4ff",
      imgName: "harsware_fellowship.jpg",
      desc: "An intensive fellowship focusing on advanced digital systems, electronic layout designs, and embedded firmware architectures."
    },
    {
      id: "cert-orbit-1",
      title: "Orbit 1.0 National Hackathon",
      issuer: "Orbit Committee",
      date: "May 2024",
      category: "Hackathons & Events",
      credId: "ORB1-PART-38",
      verifyLink: "https://ncit.edu.np",
      accentColor: "#7c3aed",
      imgName: "orbit_1.0.jpg",
      desc: "Recognizes participation and software development during the intensive 36-hour Orbit 1.0 hackathon, building community-driven solutions."
    },
    {
      id: "cert-orbit-2",
      title: "Orbit 2.0 Technology Championship",
      issuer: "Orbit Tech Fest",
      date: "February 2025",
      category: "Hackathons & Events",
      credId: "ORB2-PART-99",
      verifyLink: "https://ncit.edu.np",
      accentColor: "#00d4ff",
      imgName: "orbit2.0.jpg",
      desc: "Awarded for participating in the technical track of Orbit 2.0, showcasing innovative applications and collaborative engineering."
    },
    {
      id: "cert-revah-code",
      title: "Revah Code Sprint & Hackathon",
      issuer: "Revah Team",
      date: "October 2024",
      category: "Hackathons & Events",
      credId: "REV-CS-9912",
      verifyLink: "https://ncit.edu.np",
      accentColor: "#7c3aed",
      imgName: "revah_code.jpg",
      desc: "Completed a high-pressure programming contest focused on competitive algorithms, speed coding, and full-stack prototyping."
    },
    {
      id: "cert-tech-fest",
      title: "National Tech Festival Participant",
      issuer: "CITC Association",
      date: "November 2024",
      category: "Hackathons & Events",
      credId: "TF-CITC-2024",
      verifyLink: "https://ncit.edu.np",
      accentColor: "#00d4ff",
      imgName: "tech_fest.jpg",
      desc: "Recognized for presenting software systems and engaging in multi-disciplinary engineering exhibitions and presentations."
    },
    {
      id: "cert-tedxncit",
      title: "TEDxNCIT Organizing Committee",
      issuer: "TEDxNCIT",
      date: "March 2025",
      category: "Community & Leadership",
      credId: "TEDX-ORG-554",
      verifyLink: "https://ted.com",
      accentColor: "#7c3aed",
      imgName: "tedxncit.jpg",
      desc: "Recognizes dedication as an organizer and volunteer, managing logistics, audience engagement, and audio-visual setups for TEDx talks."
    },
    {
      id: "cert-tedx-participate",
      title: "TEDxNCIT Attendee & Participant",
      issuer: "TEDxNCIT",
      date: "March 2025",
      category: "Community & Leadership",
      credId: "TEDX-PART-119",
      verifyLink: "https://ted.com",
      accentColor: "#00d4ff",
      imgName: "tedx_participate.jpg",
      desc: "Active participant in TEDxNCIT event dialogues, exchanging ideas on social impact, technology, and design."
    },
    {
      id: "cert-leo-certifi",
      title: "Leo Club Outstanding Service & Leadership",
      issuer: "Leo Club International / District 325",
      date: "July 2024",
      category: "Community & Leadership",
      credId: "LEO-SER-883",
      verifyLink: "https://lionsclubs.org",
      accentColor: "#7c3aed",
      imgName: "leo_certifi.png",
      desc: "Awarded for exceptional service to the community, organizing blood donation drives, and demonstrating strong leadership."
    },
    {
      id: "cert-leo-id",
      title: "Official Leo Club Membership Credentials",
      issuer: "Leo Club of NCIT",
      date: "June 2023",
      category: "Community & Leadership",
      credId: "LEO-ID-8831",
      verifyLink: "https://lionsclubs.org",
      accentColor: "#00d4ff",
      imgName: "leo_id.png",
      desc: "Officially certifies active membership status and professional standing within the global Leo Club organization."
    },
    {
      id: "cert-yfc",
      title: "Youth Fellowship Certificate",
      issuer: "Youth Fellowship Club",
      date: "December 2024",
      category: "Community & Leadership",
      credId: "YFC-MEM-445",
      verifyLink: "https://yfc.org",
      accentColor: "#7c3aed",
      imgName: "yfc.jpg",
      desc: "Recognizes dedication to mentoring youth, community engagement, and promoting mental health and leadership workshops."
    },
    {
      id: "cert-photocomp",
      title: "CITC Visual Storytelling & Photography",
      issuer: "CITC Media Wing",
      date: "October 2024",
      category: "Achievements",
      credId: "CITC-PHOTO-09",
      verifyLink: "https://ncit.edu.np",
      accentColor: "#00d4ff",
      imgName: "photocomp_citc.jpg",
      desc: "Recognized for creative excellence and visual composition in capturing technology and human interaction themes."
    },
    {
      id: "cert-engineer-cv",
      title: "Computer Engineering Coursework Excellence",
      issuer: "NCIT / Pokhara University",
      date: "October 2025",
      category: "Achievements",
      credId: "NCIT-ECE-CV",
      verifyLink: "https://ncit.edu.np",
      accentColor: "#7c3aed",
      imgName: "Engineer_cv.png",
      desc: "A certificate verifying stellar performance in advanced academic courses, labs, and engineering design projects."
    }
  ];

  const categories = ['All', 'Technical', 'Hackathons & Events', 'Community & Leadership', 'Achievements'];

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
      {selectedCert && createPortal(
        <div className="lightbox-overlay" onClick={() => setSelectedCert(null)}>
          <div className="lightbox-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedCert(null)}>
              <X size={24} />
            </button>

            <div className="lightbox-body">
              {/* Left: Certificate Visual or Vector */}
              <div className="lightbox-visual">
                {imageErrors[selectedCert.id] ? (
                  <CertificateVector 
                    title={selectedCert.title} 
                    issuer={selectedCert.issuer} 
                    date={selectedCert.date} 
                    credId={selectedCert.credId} 
                    accentColor={selectedCert.accentColor} 
                  />
                ) : (
                  <img
                    src={`/assets/certificates/${selectedCert.imgName}`}
                    alt={selectedCert.title}
                    className="lightbox-img"
                    style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', objectFit: 'contain' }}
                    onError={() => handleImageError(selectedCert.id)}
                  />
                )}
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
        </div>,
        document.body
      )}
    </section>
  );
}
