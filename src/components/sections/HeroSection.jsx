import React, { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Github, Linkedin, Instagram, Facebook, Youtube, MailIcon } from "../ui/SocialIcons";
import "./HeroSection.css";
import heroVideo from "../../assets/niraj-video.mp4";

export default function HeroSection({ introState, setIntroState }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Handle video loading and initial pause at 0s
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      video.currentTime = 0;
      video.pause();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    // If metadata is already loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      if (video) {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, []);

  // Listen for scroll/interaction events to trigger the intro play
  useEffect(() => {
    if (introState !== "poster") return;

    const handleStartIntro = (e) => {
      let shouldStart = false;

      if (e.type === "wheel") {
        if (e.deltaY > 0) shouldStart = true;
      } else if (e.type === "keydown") {
        if (["ArrowDown", "PageDown", " ", "End"].includes(e.key)) {
          shouldStart = true;
        }
      } else if (e.type === "click") {
        shouldStart = true;
      }

      if (shouldStart) {
        setIntroState("playing");
      }
    };

    // Track swipes on mobile (swiping up means scrolling down)
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      const touchEndY = e.touches[0].clientY;
      if (touchStartY - touchEndY > 10) {
        setIntroState("playing");
      }
    };

    window.addEventListener("wheel", handleStartIntro, { passive: true });
    window.addEventListener("keydown", handleStartIntro);
    window.addEventListener("click", handleStartIntro);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleStartIntro);
      window.removeEventListener("keydown", handleStartIntro);
      window.removeEventListener("click", handleStartIntro);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [introState, setIntroState]);

  // Lock scroll, play video, and wait for 7 seconds to complete intro
  useEffect(() => {
    if (introState !== "playing") return;

    const preventDefault = (e) => {
      e.preventDefault();
    };
    const preventKeys = (e) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", " ", "Home", "End"].includes(e.key)) {
        e.preventDefault();
      }
    };

    // Lock scrolling on window level
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", preventKeys, { passive: false });

    // Play video
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.currentTime = 0;
      video.play().catch((err) => console.log("Video playback error: ", err));
    }

    // Lock for 7 seconds (duration of video)
    const timer = setTimeout(() => {
      setIntroState("finished");
    }, 7000);

    return () => {
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
      window.removeEventListener("keydown", preventKeys);
      clearTimeout(timer);
    };
  }, [introState, setIntroState]);

  // Make sure video keeps looping in background after intro finishes
  useEffect(() => {
    if (introState === "finished") {
      const video = videoRef.current;
      if (video && video.paused) {
        video.play().catch((err) => console.log("Autoplay background error: ", err));
      }
    }
  }, [introState]);

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
            href="https://instagram.com/your_instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://facebook.com/your_facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://youtube.com/your_youtube"
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
