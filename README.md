<div align="center">

# ✦ NIRAJ BHATTA ✦

### `Aspiring Computer Engineer` · `Portfolio Website`

**A cinematic, interactive portfolio — 3D particles, smooth animations, and a clean responsive UI.**

<br />

🌐 [**Live Site**](https://nirajbhatta.info.np) &nbsp;│&nbsp; 💻 [**Source Code**](https://github.com/Niraj-Bhatta/portfolio) &nbsp;│&nbsp; 📬 [**Contact**](#-contact)

<br />

`React 19` &nbsp;•&nbsp; `Vite 8` &nbsp;•&nbsp; `Three.js` &nbsp;•&nbsp; `Vanilla CSS` &nbsp;•&nbsp; `EmailJS` &nbsp;•&nbsp; `Lucide Icons` &nbsp;

</div>

<br />

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🧭 Quick Navigation

| | | | |
| :---: | :---: | :---: | :---: |
| [🌟 About](#-about) | [✨ Features](#-features) | [🛠️ Tech Stack](#️-tech-stack) | [🚀 Getting Started](#-getting-started) |
| [📜 Scripts](#-available-scripts) | [📁 Structure](#-project-structure) | [☁️ Deployment](#️-deployment) | [🎨 Customize](#-customization) |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🌟 About

> *"Building at the intersection of hardware, intelligence, and the web."*

Welcome to the source code of my personal portfolio. This is a modern, responsive, and highly interactive web application that tells the story of my journey as an aspiring **Computer Engineer** and **Passionate AI/ML Learner** — spanning **IoT & embedded systems**, **computer vision**, **NLP**, and **web/app development**.

The site pairs fluid motion and 3D particle effects with a clean, content-first layout so visitors can quickly explore my **projects**, **experience**, **research papers**, **certifications**, **achievements**, and **blog** — and get in touch.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## ✨ Features

| | Feature | What it does |
| :---: | :--- | :--- |
| 🎬 | **Cinematic Hero** | Typewriter animation with role cycling and particle background |
| 🌌 | **3D Particle Animations** | Interactive Three.js canvas background effects, optimized for performance |
| 🧑‍💼 | **Experience Timeline** | Visual timeline of roles, internships, and positions |
| 🚀 | **Project Showcase** | Detailed cards with GitHub and Live Preview links |
| 🧠 | **Skills Section** | Categorized tech stack with visual skill indicators |
| 📄 | **Research Papers** | Curated list of academic and technical publications |
| 🏆 | **Certifications & Achievements** | Lightbox preview for certificates and achievements |
| 📝 | **Blog Section** | Articles and write-ups with category filtering |
| 📬 | **Contact Section** | EmailJS-powered contact form with a world map visualization |
| 📱 | **Fully Responsive** | Flawless on desktop, tablet, and mobile |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🛠️ Tech Stack

| Layer | Technology | Version |
| :--- | :--- | :--- |
| ⚛️ **Framework** | [React.js](https://reactjs.org/) | `^19.2.7` |
| ⚡ **Build Tool** | [Vite](https://vitejs.dev/) | `^8.1.0` |
| 🌌 **3D Graphics** | [Three.js](https://threejs.org/) | `^0.184.0` |
| 🎨 **Styling** | Vanilla CSS — Flexbox & Grid | — |
| 🔣 **Icons** | [Lucide React](https://lucide.dev/) | `^1.21.0` |
| 📧 **Email** | [EmailJS Browser](https://www.emailjs.com/) | `^4.4.1` |
| ☁️ **Deployment** | personal domain | cloudflare |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🚀 Getting Started

### 📋 Prerequisites

| Requirement | Version |
| :--- | :--- |
| 🟢 Node.js | `v18.0.0` or higher |
| 📦 npm | `v9.0.0` or higher |

### ⚙️ Installation

```bash
# 1️⃣  Clone the repository
git clone https://github.com/Niraj-Bhatta/portfolio.git

# 2️⃣  Move into the project directory
cd portfolio

# 3️⃣  Install dependencies
npm install

# 4️⃣  Copy environment variables and fill in your keys
cp .env.example .env

# 5️⃣  Start the development server
npm run dev
```

> [!TIP]
> Once the server is running, open **http://localhost:5173** in your browser. 🎉

### 🔑 Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

| Variable | Description |
| :--- | :--- |
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS Service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Your EmailJS Template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS Public Key |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | 🔥 Start the dev server with hot reload |
| `npm run build` | 📦 Create an optimized production build in `dist/` |
| `npm run preview` | 👀 Preview the production build locally |
| `npm run lint` | 🔍 Run ESLint to check for code issues |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📁 Project Structure

```text
portfolio/
│
├── 📂 public/               → Static assets (favicons, icons)
│
├── 📂 src/
│   ├── 📂 assets/           → Images, videos, PDFs
│   ├── 📂 components/       → React components
│   │   ├── 📂 sections/     → Page sections
│   │   │   ├── HeroSection
│   │   │   ├── AboutSection
│   │   │   ├── ExperienceSection
│   │   │   ├── ProjectsSection
│   │   │   ├── SkillsSection
│   │   │   ├── PapersSection
│   │   │   ├── CertificatesSection
│   │   │   ├── AchievementsSection
│   │   │   ├── BlogSection
│   │   │   └── ContactSection
│   │   ├── 📂 ui/           → Reusable UI elements
│   │   ├── 📂 3d/           → Three.js particle & canvas effects
│   │   └── 📂 layout/       → Navbar, footer, wrappers
│   ├── 📂 context/          → React context providers
│   ├── 📄 App.jsx           → Main application component
│   ├── 📄 main.jsx          → Entry point
│   └── 🎨 index.css         → Global styles
│
├── 📄 .env.example          → Environment variable template
├── 📄 index.html            → HTML template
├── ⚙️  vite.config.js        → Vite configuration
└── 📦 package.json          → Metadata & dependencies
```

<details>
<summary><b>🔄 How the app flows (click to expand)</b></summary>

<br />

```text
 index.html
     │
     ▼
  main.jsx ──────► App.jsx
                      │
        ┌─────────────┼─────────────┬─────────────┐
        ▼             ▼             ▼             ▼
     layout       sections         ui          3d / canvas
                      │
     ┌──────┬─────────┼──────────┬─────────┬──────────┐
     ▼      ▼         ▼          ▼         ▼          ▼
    Hero  Experience Projects  Skills   Papers/Blog  Contact
                                        Certs/Achievements
```

</details>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## ☁️ Deployment

This project is deployment-ready for **Vercel** and **Netlify**.

| Platform | Build Command | Output Directory |
| :--- | :--- | :--- |
| ▲ **Vercel** | `npm run build` | `dist` |
| ◆ **Netlify** | `npm run build` | `dist` |

> [!IMPORTANT]
> Remember to set your environment variables (EmailJS keys) in the platform's dashboard under **Project Settings → Environment Variables**.

**Steps:** push to GitHub → import the repo on [Vercel](https://vercel.com/new) or [Netlify](https://app.netlify.com/start) → add env vars → use the settings above → deploy. 🚢

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎨 Customization

> [!NOTE]
> Want to make it your own? Start here:

| What | Where |
| :--- | :--- |
| ✏️ **Content** (text, projects, papers, blog posts) | `src/components/sections/` |
| 🖼️ **Media** (images, videos, PDFs) | `src/assets/` |
| 🏷️ **Branding** (logo / favicon) | `public/favicon.svg` |
| 🎨 **Styling** (colors, spacing, animations) | `src/index.css` |
| 📧 **Email integration** | `.env` → EmailJS credentials |
| 🌐 **Context / global state** | `src/context/` |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📬 Contact

<div align="center">

### **Niraj Bhatta**

📧 [bhattaniraj559@gmail.com](mailto:bhattaniraj559@gmail.com)
&nbsp;│&nbsp;
🌐 [nirajbhatta.info.np](https://nirajbhatta.info.np)
&nbsp;│&nbsp;
🐙 [github.com/Niraj-Bhatta](https://github.com/Niraj-Bhatta)

<br />

⭐ **If you like this project, consider giving it a star!** ⭐

<br />

*Designed & Built with ❤️ by **Niraj Bhatta***

</div>
