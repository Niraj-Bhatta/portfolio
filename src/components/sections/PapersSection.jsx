import React, { useEffect, useState, useRef } from 'react';
import { BookOpen, ExternalLink, MapPin, Calendar, Hash, ChevronDown, ChevronUp } from 'lucide-react';
import './PapersSection.css';

const papers = [
  {
    title: "An IoT-Based Smart Parking Management System with Automatic Number Plate Recognition and Environmental Hazard Monitoring",
    authors: "Niraj Bhatta, Ravi Yadav, Soniya Chand, Amit K. Shrivastava",
    institution: "Nepal College of Information Technology, Pokhara University",
    venue: "Proceedings of International Conference on Innovation in Computing, Science, Engineering and Technology (ICICSET)",
    journalAbbrev: "ICICSET2025",
    issn: "3102-0682",
    volume: "3",
    issue: "1",
    location: "Nepal",
    date: "October 2, 2026",
    doi: "10.65091/icicset.v3i1.95",
    articleUrl: "https://journal.ncit.edu.np/index.php/icicset/article/view/95",
    pdfUrl: "https://journal.ncit.edu.np/index.php/icicset/article/download/95/87",
    status: "Published",
    tags: ["IoT", "ESP32", "Smart Parking", "ANPR", "YOLOv8", "Firebase", "React.js", "Environmental Monitoring", "Nepal"],
    abstract:
      "Parking is a growing problem in urbanizing Nepali cities, where many parking lots still rely on manual occupancy recording, vehicle logging, and cash transactions. Although past IoT applications have looked into parking systems, Nepali ANPR, reservation management, and automatic parking payments have been investigated separately in earlier research, there are very few cases where all these aspects are combined together along with environmental hazard detection into a single, low-cost physical model. This paper presents a connected IoT-based smart parking system using ESP32/Arduino sensors and actuators, a React.js dashboard backed by Firebase RTDB, and a tiered Nepali ANPR pipeline. Plate localization and character detection are performed using YOLOv8s, a fine-tuned 34-class CNN, and geometrical reconstruction to assemble individually detected characters into a full plate string. The object detection framework had 95.44% mAP@0.50 (97.92% & 93.09% for Recall and precision, respectively) after held-out tests on a dataset containing 867 images. Overall, the ANPR Pipeline had a whole-plate detection accuracy of 53.73% on raw 67 entry/exit pictures without cropping (36/67; 95% CI: 41.9–65.1%), using fuzzy whole-plate character matching with an 80% threshold. The occupancy detection component performed at 97.14% accuracy from 70 test samples manually inspected, while reservation, transaction log maintenance, and hazard detection capabilities were also demonstrated on the real-world system. These outcomes demonstrate the feasibility of combining localized ANPR technology with low-cost, IoT-enabled parking infrastructure in Nepal.",
  },
];

function PaperCard({ paper, idx, isVisible }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="paper-card glass-panel"
      style={{ transitionDelay: `${idx * 120}ms` }}
    >
      {/* Header Row */}
      <div className="paper-header">
        <div className="paper-icon-wrap">
          <BookOpen size={20} />
        </div>
        <span className={`paper-status status-${paper.status.toLowerCase().replace(/\s/g, '-')}`}>
          {paper.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="paper-title">{paper.title}</h3>

      {/* Authors */}
      <p className="paper-authors">{paper.authors}</p>

      {/* Institution */}
      {paper.institution && (
        <p className="paper-institution">{paper.institution}</p>
      )}

      {/* Meta row */}
      <div className="paper-meta-grid">
        <div className="paper-meta-item">
          <MapPin size={13} className="meta-icon" />
          <span>{paper.location}</span>
        </div>
        <div className="paper-meta-item">
          <Calendar size={13} className="meta-icon" />
          <span>{paper.date}</span>
        </div>
        {paper.volume && (
          <div className="paper-meta-item">
            <span className="meta-label">Vol.</span>
            <span>{paper.volume}({paper.issue})</span>
          </div>
        )}
        {paper.issn && (
          <div className="paper-meta-item">
            <span className="meta-label">ISSN</span>
            <span>{paper.issn}</span>
          </div>
        )}
        <div className="paper-meta-item doi-item">
          <Hash size={13} className="meta-icon" />
          {paper.doi ? (
            <a
              href={`https://doi.org/${paper.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="doi-link"
            >
              {paper.doi}
              <ExternalLink size={11} />
            </a>
          ) : (
            <span className="doi-pending">{paper.doiLabel}</span>
          )}
        </div>
      </div>

      {/* Venue */}
      <div className="paper-venue">
        <span className="venue-label">Published in</span>
        <span className="venue-name">{paper.venue}</span>
      </div>

      {/* Tags */}
      <div className="paper-tags">
        {paper.tags.map((tag) => (
          <span key={tag} className="paper-tag">{tag}</span>
        ))}
      </div>

      {/* Abstract — collapsible */}
      <div className={`paper-abstract-wrap ${expanded ? 'expanded' : ''}`}>
        <p className="paper-abstract">{paper.abstract}</p>
      </div>

      {/* Actions row */}
      <div className="paper-actions">
        <button
          className="abstract-toggle"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>Hide Abstract <ChevronUp size={14} /></>
          ) : (
            <>Read Abstract <ChevronDown size={14} /></>
          )}
        </button>

        <div className="paper-links">
          {paper.articleUrl && (
            <a
              href={paper.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="paper-link-btn view-btn"
            >
              <ExternalLink size={13} /> View Article
            </a>
          )}
          {paper.pdfUrl && (
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="paper-link-btn pdf-btn"
            >
              ↓ PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PapersSection() {
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

  return (
    <section
      ref={sectionRef}
      id="papers"
      className={`section-container papers-section scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      {/* Ambient glow */}
      <div
        className="glow-bg papers-glow"
        style={{ top: '10%', left: '0%', width: '320px', height: '320px', backgroundColor: 'var(--accent-blue)' }}
      />
      <div
        className="glow-bg papers-glow"
        style={{ bottom: '10%', right: '0%', width: '260px', height: '260px', backgroundColor: 'var(--accent-purple)' }}
      />

      <h2 className="section-title">Research Papers</h2>

      <div className={`papers-grid ${isVisible ? 'visible' : ''}`}>
        {papers.map((paper, idx) => (
          <PaperCard key={paper.title} paper={paper} idx={idx} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}
