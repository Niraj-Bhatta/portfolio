import React from 'react';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CanvasContainer from './components/3d/CanvasContainer';

// Sections
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import CertificatesSection from './components/sections/CertificatesSection';
import BlogSection from './components/sections/BlogSection';
import AchievementsSection from './components/sections/AchievementsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ContactSection from './components/sections/ContactSection';

import './App.css';

export default function App() {
  return (
    <div className="app-wrapper">
      {/* Premium Custom Mouse Follower */}
      <CustomCursor />

      {/* Fixed top Navbar */}
      <Navbar />

      {/* 3D WebGL Background Scene */}
      <CanvasContainer />

      {/* Portfolio Sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <BlogSection />
        <AchievementsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
