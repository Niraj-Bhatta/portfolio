import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, Mail } from "lucide-react";
import { Github, Linkedin } from "../ui/SocialIcons";
import "./HeroSection.css";
import heroVideo from "../../assets/niraj-video.mp4";

export default function HeroSection() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const targetTime = useRef(0);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.innerWidth <= 768;

    const video = videoRef.current;
    if (!video) return;

    // Load event
    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    // Trigger if already loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    // Scroll scrubbing animation
    let animationFrameId;

    const handleScroll = () => {
      if (!video || !video.duration) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPos = window.scrollY;
      const height = rect.height;

      // Calculate ratio within hero height
      const ratio = Math.min(Math.max(scrollPos / height, 0), 1);

      // Set the target playback time based on scroll
      targetTime.current = ratio * video.duration;
    };

    const smoothVideoScrub = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        // Interpolate current time towards target time (lerp)
        const lerpFactor = 0.1; // lower means smoother
        const diff = targetTime.current - video.currentTime;

        // Prevent microscopic changes that cause jitter
        if (Math.abs(diff) > 0.01) {
          video.currentTime += diff * lerpFactor;
        }
      }
      animationFrameId = requestAnimationFrame(smoothVideoScrub);
    };

    window.addEventListener("scroll", handleScroll);
    smoothVideoScrub();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (video) {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, []);

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
      <div className="hero-video-wrapper">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          src={heroVideo}
        />

        <div className="hero-overlay" />
      </div>

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
          Building Intelligent Systems, Full-Stack Applications, and Innovative
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
            href="mailto:bhattaniraj559@gmail.com"
            className="social-icon-btn"
            aria-label="Email"
          >
            <Mail size={20} />
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
