import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Instagram, Facebook, Youtube, MailIcon } from "../ui/SocialIcons";
import "./HeroSection.css";
import heroVideo from "../../assets/niraj-video.mp4";
import profilePhoto from "../../assets/hero.png";

// Static arrays defined outside the component to avoid layout allocations on render
const FIRST_NAME_CHARS = "NIRAJ".split("");
const LAST_NAME_CHARS = "BHATTA".split("");

// Memoized Cinematic Name Animation Overlay
const IntroOverlay = React.memo(({ step }) => {
  if (step === "done") return null;

  return (
    <div className={`intro-name-overlay ${step}`}>
      <div className="intro-name-background">
        <div className="intro-name-row">
          {FIRST_NAME_CHARS.map((char, index) => (
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
          {LAST_NAME_CHARS.map((char, index) => (
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
  );
});

IntroOverlay.displayName = "IntroOverlay";

// Memoized Floating Hero Content to prevent unnecessary renders during the intro
const HeroContent = React.memo(({ isFinished, isAnimating, handleCtaClick }) => {
  return (
    <div
      className={`hero-content ${isFinished ? "intro-finished" : "intro-playing"} ${
        isAnimating ? "animating" : ""
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

  const [introStep, setIntroStep] = useState("reveal"); // 'reveal' | 'fadeout' | 'done'
  const [videoSrc, setVideoSrc] = useState(null);

  // Initialize capability config synchronously on load to avoid layout thrashing and synchronous useEffect state updates
  const [perfConfig, setPerfConfig] = useState(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hasLowHardware = (
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
      (navigator.deviceMemory && navigator.deviceMemory < 4)
    );
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection && (connection.saveData || /2g|slow-2g/.test(connection.effectiveType));

    if (motionQuery.matches || isSlowConnection) {
      return {
        fps: 30,
        isLowEnd: true,
        reduceMotion: motionQuery.matches,
      };
    }
    return {
      fps: 60,
      isLowEnd: hasLowHardware,
      reduceMotion: false,
    };
  });

  const [isVideoLoaded, setIsVideoLoaded] = useState(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hasLowHardware = (
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
      (navigator.deviceMemory && navigator.deviceMemory < 4)
    );
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection && (connection.saveData || /2g|slow-2g/.test(connection.effectiveType));
    return motionQuery.matches || isSlowConnection || hasLowHardware;
  });

  const [isHeroAnimating, setIsHeroAnimating] = useState(false);

  // 1. Dynamic Frame-Rate Benchmarking (only if not already classified as low-end)
  useEffect(() => {
    if (perfConfig.isLowEnd) return;

    // Dynamic frame-rate testing over 40 frames
    let frameCount = 0;
    let lastTime = performance.now();
    const frameTimes = [];
    let rafId;

    const checkFrame = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      if (frameCount > 0) {
        frameTimes.push(delta);
      }

      frameCount++;
      if (frameCount < 40) {
        rafId = requestAnimationFrame(checkFrame);
      } else {
        const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
        const droppedFrames = frameTimes.filter((t) => t > 33.33).length;
        const isLowPerformance = avgFrameTime > 22 || droppedFrames > 3;

        if (isLowPerformance) {
          setPerfConfig({
            fps: 30,
            isLowEnd: true,
            reduceMotion: false,
          });
          setIsVideoLoaded(true);
        }
      }
    };

    rafId = requestAnimationFrame(checkFrame);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e) => {
      setPerfConfig((prev) => ({ ...prev, reduceMotion: e.matches }));
      if (e.matches) {
        setIsVideoLoaded(true);
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      cancelAnimationFrame(rafId);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [perfConfig.isLowEnd]);

  // 2. Background Video Lazy Loader
  useEffect(() => {
    // Only load the 6.9MB video file on non-low-end devices
    if (!perfConfig.isLowEnd && !perfConfig.reduceMotion) {
      const timer = setTimeout(() => {
        setVideoSrc(heroVideo);
      }, 150); // defer to let critical assets render first
      return () => clearTimeout(timer);
    }
  }, [perfConfig.isLowEnd, perfConfig.reduceMotion]);

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
      className={`hero-container ${perfConfig.isLowEnd ? "perf-low" : ""}`}
    >
      {/* Cinematic Background Video / Poster Layer */}
      <div className={`hero-video-wrapper ${isVideoLoaded ? "visible" : ""}`}>
        <video
          ref={videoRef}
          className="hero-video"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          poster={profilePhoto}
          src={videoSrc || undefined}
        />
        <div className="hero-overlay" />
      </div>

      {/* Cinematic Name Animation Overlay (Memoized character mapping) */}
      <IntroOverlay step={introStep} />

      {/* Floating Hero Content (Memoized content tree) */}
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
