import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Instagram, Facebook, Youtube, MailIcon } from "../ui/SocialIcons";
import "./HeroSection.css";
import heroVideoMp4 from "../../assets/niraj-video-compressed.mp4";
import heroVideoWebm from "../../assets/niraj-video-compressed.webm";
import heroPoster from "../../assets/hero-poster.jpg";

// Memoized Cinematic Name Animation Overlay
const IntroOverlay = React.memo(({ step, firstNameRef, lastNameRef, activeRow }) => {
  if (step === "done") return null;

  return (
    <div className={`intro-name-overlay ${step}`}>
      <div className="intro-name-background">
        <div className="intro-name-row">
          <span ref={firstNameRef} className="char-name-line"></span>
          {activeRow === "first" && <span className="cursor-blink">|</span>}
        </div>
        <div className="intro-name-row">
          <span ref={lastNameRef} className="char-name-line"></span>
          {activeRow === "second" && <span className="cursor-blink">|</span>}
        </div>
      </div>
    </div>
  );
});

IntroOverlay.displayName = "IntroOverlay";

// Memoized Floating Hero Content to prevent unnecessary renders during the intro
const HeroContent = React.memo(({ isFinished, isAnimating, handleCtaClick }) => {
  return (
    <div
      className={`hero-content ${isFinished ? "intro-finished" : "intro-playing"} ${isAnimating ? "animating" : ""
        }`}
    >
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
  );
});

HeroContent.displayName = "HeroContent";

export default function HeroSection({ introState, setIntroState }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const [introStep, setIntroStep] = useState("reveal"); // 'reveal' | 'fadeout' | 'done'
  const [activeRow, setActiveRow] = useState("first"); // 'first' | 'second' | 'none'
  const [videoSrc, setVideoSrc] = useState(null);

  // Detect low-end hardware, slow networks or reduced-motion preferences
  const [shouldSkipVideo] = useState(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection && (connection.saveData || /2g|3g/.test(connection.effectiveType));
    const isLowHardware = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    return !!(isSlowConnection || isLowHardware || motionQuery.matches);
  });

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isHeroAnimating, setIsHeroAnimating] = useState(false);

  // 1. Pure JavaScript Typewriter Implementation
  useEffect(() => {
    const firstName = "NIRAJ";
    const lastName = "BHATTA";

    const startTypewriter = () => {
      const firstEl = firstNameRef.current;
      const lastEl = lastNameRef.current;
      if (firstEl) firstEl.textContent = "";
      if (lastEl) lastEl.textContent = "";
      
      setActiveRow("first");
      
      let i = 0;
      const typeFirst = () => {
        if (i < firstName.length) {
          if (firstNameRef.current) firstNameRef.current.textContent += firstName.charAt(i);
          i++;
          setTimeout(typeFirst, 90);
        } else {
          setActiveRow("second");
          let j = 0;
          const typeSecond = () => {
            if (j < lastName.length) {
              if (lastNameRef.current) lastNameRef.current.textContent += lastName.charAt(j);
              j++;
              setTimeout(typeSecond, 90);
            } else {
              setActiveRow("none");
            }
          };
          setTimeout(typeSecond, 150); // Pause between first and last name
        }
      };
      setTimeout(typeFirst, 600); // Start delay
    };

    const handleLoad = () => {
      startTypewriter();
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // 2. Background Video Lazy Loader
  useEffect(() => {
    if (!shouldSkipVideo) {
      const timer = setTimeout(() => {
        setVideoSrc(true);
      }, 150); // Defer to let critical assets render first
      return () => clearTimeout(timer);
    }
  }, [shouldSkipVideo]);

  // 3. Autoplay and Load Handler
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

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
  }, [videoSrc]);

  // 4. Video Visibility Sync (IntersectionObserver)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || !isVideoLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.paused) {
            video.play().catch((err) => console.log("Video resume on scroll error:", err));
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      if (video) observer.unobserve(video);
    };
  }, [videoSrc, isVideoLoaded]);

  // 5. Cinematic Intro Overlay Phase Timers
  useEffect(() => {
    // at 3.5s: fade out name overlay
    const fadeOutTimer = setTimeout(() => {
      setIntroStep("fadeout");
    }, 3500);

    // at 5s: complete intro and enable scrolling
    const finishTimer = setTimeout(() => {
      setIntroStep("done");
      setIntroState("finished");
    }, 5000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finishTimer);
    };
  }, [setIntroState]);

  // 6. Manage Active Animation State to Clean Up hardware acceleration
  useEffect(() => {
    if (introState === "finished") {
      let timer;
      const rafId = requestAnimationFrame(() => {
        setIsHeroAnimating(true);
        timer = setTimeout(() => {
          setIsHeroAnimating(false);
        }, 1500); // clear will-change after transitions finish
      });

      return () => {
        cancelAnimationFrame(rafId);
        if (timer) clearTimeout(timer);
      };
    }
  }, [introState]);

  // Stable callback handler for scrolling to section
  const handleCtaClick = React.useCallback((e, href) => {
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-container"
    >
      {/* Cinematic Background Video / Poster Layer */}
      <div className={`hero-video-wrapper ${isVideoLoaded || shouldSkipVideo ? "visible" : ""}`}>
        {!shouldSkipVideo && videoSrc ? (
          <video
            ref={videoRef}
            className="hero-video"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            poster={heroPoster}
          >
            <source src={heroVideoWebm} type="video/webm" />
            <source src={heroVideoMp4} type="video/mp4" />
            <img
              src={heroPoster}
              alt="Hero Background Fallback"
              className="hero-video-fallback-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </video>
        ) : (
          <img
            src={heroPoster}
            alt="Hero Background Fallback"
            className="hero-video-fallback-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        <div className="hero-overlay" />
      </div>

      {/* Cinematic Name Animation Overlay */}
      <IntroOverlay
        step={introStep}
        firstNameRef={firstNameRef}
        lastNameRef={lastNameRef}
        activeRow={activeRow}
      />

      {/* Floating Hero Content */}
      <HeroContent
        isFinished={introState === "finished"}
        isAnimating={isHeroAnimating}
        handleCtaClick={handleCtaClick}
      />

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
