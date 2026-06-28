import React, { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Github, Linkedin, Instagram, Facebook, Youtube, MailIcon } from "../ui/SocialIcons";
import "./HeroSection.css";
import heroVideo from "../../assets/niraj-video.mp4";

import profilePhoto from "../../assets/hero.png";

export default function HeroSection({ introState, setIntroState }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [introStep, setIntroStep] = useState('reveal'); // 'reveal' | 'fadeout' | 'done'

  // Video Autoplay and Load handler
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      video.play().catch((err) => console.log("Autoplay error: ", err));
    };

    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.addEventListener("canplay", handleCanPlay);
    }

    return () => {
      if (video) {
        video.removeEventListener("canplay", handleCanPlay);
      }
    };
  }, []);

  // 5s Cinematic Timers
  useEffect(() => {
    // at 3.5s: fade out
    const fadeOutTimer = setTimeout(() => {
      setIntroStep('fadeout');
    }, 3500);

    // at 5s: complete intro and enable scroll
    const finishTimer = setTimeout(() => {
      setIntroStep('done');
      setIntroState('finished');
    }, 5000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finishTimer);
    };
  }, [setIntroState]);

  const handleCtaClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={sectionRef} id="hero" className="hero-container">
      {/* Cinematic Background Video Layer */}
      <div className={`hero-video-wrapper ${isVideoLoaded ? "visible" : ""}`}>
        <video
          ref={videoRef}
          className="hero-video"
          muted
          loop
          playsInline
          src={heroVideo}
        />
        <div className="hero-overlay" />
      </div>

      {/* Cinematic Name Animation Overlay (3 stacked layers) */}
      {introStep !== 'done' && (
        <div className={`intro-name-overlay ${introStep}`}>
          {/* Layer 2: Text "NIRAJ BHATTA" (Middle Layer) */}
          <div className="intro-name-background">
            <div className="intro-name-row">
              {"NIRAJ".split("").map((char, index) => (
                <span
                  key={index}
                  className="char"
                  style={{ "--char-index": index }}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="intro-name-row">
              {"BHATTA".split("").map((char, index) => (
                <span
                  key={index + 5}
                  className="char"
                  style={{ "--char-index": index + 5 }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Hero Content */}
      <div className="hero-content">
        <p className="hero-badge animate-fade-in-down">
          <span>•</span> Available for Opportunities
        </p>
        <h1 className="hero-title animate-title">
          Aspiring <span className="gradient-text-blue">Computer</span> <br />
          <span className="gradient-text-purple">Engineer</span>
        </h1>
        <p className="hero-subtitle animate-fade-in-up">
          Building Intelligent Systems, Full-Stack Applications, and Innovative IoT
          Engineering Solutions.
        </p>

        {/* CTA Buttons */}
        <div className="hero-ctas animate-fade-in-up-delay">
          <a
            href="#projects"
            className="btn btn-primary"
            onClick={(e) => handleCtaClick(e, "#projects")}
          >
            View Projects
          </a>
          <a
            href="./assets/resume/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-resume"
          >
            View Resume
          </a>
          <a
            href="#contact"
            className="btn btn-secondary"
            onClick={(e) => handleCtaClick(e, "#contact")}
          >
            Contact Me
          </a>
        </div>

        {/* Social Quick-Links */}
        <div className="hero-socials animate-fade-in-up-delay">
          <a
            href="https://github.com/Niraj-Bhatta"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/nirajbhatta559/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://instagram.com/niraj_bhatta_4"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.facebook.com/niraj.bhatta.1420"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://youtube.com/@educationifyy"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="YouTube"
          >
            <Youtube size={20} />
          </a>
          <a
            href="mailto:bhattaniraj559@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="Email"
          >
            <MailIcon size={20} />
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="hero-scroll-indicator"
        onClick={(e) => handleCtaClick(e, "#about")}
      >
        <span className="scroll-text">Explore Portfolio</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  );
}
