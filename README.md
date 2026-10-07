<div align="center">

# ✦ NIRAJ BHATTA ✦

### `Aspiring Computer Engineer` · `Portfolio Website`

**A cinematic, interactive portfolio — 3D particles, smooth animations, and a clean responsive UI.**

<br />

🌐 [**Live Site**](https://nirajbhatta.info.np) &nbsp;│&nbsp; 💻 [**Source Code**](https://github.com/Niraj-Bhatta/portfolio) &nbsp;│&nbsp; 📬 [**Contact**](#-contact)

<br />

`React` &nbsp;•&nbsp; `Vite` &nbsp;•&nbsp; `Vanilla CSS` &nbsp;•&nbsp; `Canvas 3D` &nbsp;•&nbsp; `Lucide Icons` &nbsp;•&nbsp; `Vercel / Netlify`

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

Welcome to the source code of my personal portfolio. This is a modern, responsive, and highly interactive web application that tells the story of my journey as an aspiring **Computer Engineer** — spanning **IoT & embedded systems**, **computer vision**, **NLP**, and **web/app development**.

The site pairs fluid motion and 3D particle effects with a clean, content-first layout so visitors can quickly explore my **projects**, **certifications**, and **achievements** — and get in touch.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## ✨ Features

| | Feature | What it does |
| :---: | :--- | :--- |
| 🎬 | **Cinematic Hero** | Typewriter animation with optional background video |
| 🌌 | **3D Particle Animations** | Interactive canvas background effects, optimized for performance |
| 📊 | **Live Visitor Counter** | Real-time simulated global visit tracking |
| 🚀 | **Project Showcase** | Detailed cards with GitHub and Live Preview links |
| 🏆 | **Certifications & Achievements** | Lightbox preview for certificates and achievements |
| 📬 | **Contact Section** | Integrated contact form with a world map visualization |
| 📱 | **Fully Responsive** | Flawless on desktop, tablet, and mobile |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| ⚛️ **Framework** | [React.js](https://reactjs.org/) |
| ⚡ **Build Tool** | [Vite](https://vitejs.dev/) |
| 🎨 **Styling** | Vanilla CSS — Flexbox & Grid |
| 🔣 **Icons** | SVG Sprites & [Lucide Icons](https://lucide.dev/) |
| 🌌 **Graphics** | HTML5 Canvas (3D particle effects) |
| ☁️ **Deployment** | Vercel / Netlify (ready) |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🚀 Getting Started

### 📋 Prerequisites

| Requirement | Version |
| :--- | :--- |
| 🟢 Node.js | `v16.0.0` or higher |
| 📦 npm | `v7.0.0` or higher |

### ⚙️ Installation

```bash
# 1️⃣  Clone the repository
git clone https://github.com/Niraj-Bhatta/portfolio.git

# 2️⃣  Move into the project directory
cd portfolio

# 3️⃣  Install dependencies
npm install

# 4️⃣  Start the development server
npm run dev
```

> [!TIP]
> Once the server is running, open **http://localhost:5173** in your browser. 🎉

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | 🔥 Start the dev server with hot reload |
| `npm run build` | 📦 Create an optimized production build in `dist/` |
| `npm run preview` | 👀 Preview the production build locally |

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
│   │   ├── sections/        ·  Hero, Projects, Achievements, Contact
│   │   ├── ui/              ·  Reusable UI elements
│   │   ├── 3d/              ·  Particle & canvas effects
│   │   └── layout/          ·  Navbar, footer, wrappers
│   ├── 📄 App.jsx           → Main application component
│   ├── 📄 main.jsx          → Entry point
│   └── 🎨 index.css         → Global styles
│
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
     ┌────────┬───────┴────────┬──────────┐
     ▼        ▼                ▼          ▼
    Hero   Projects   Certs & Achievements   Contact
```

</details>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## ☁️ Deployment

This project is deployment-ready for **Vercel** and **Netlify**.

| Platform | Build Command | Output Directory |
| :--- | :--- | :--- |
| ▲ **Vercel** | `npm run build` | `dist` |
| ◆ **Netlify** | `npm run build` | `dist` |

**Steps:** push to GitHub → import the repo on [Vercel](https://vercel.com/new) or [Netlify](https://app.netlify.com/start) → use the settings above → deploy. 🚢

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎨 Customization

> [!NOTE]
> Want to make it your own? Start here:

| What | Where |
| :--- | :--- |
| ✏️ **Content** (text, projects, certificates) | `src/components/` |
| 🖼️ **Media** (images, videos, PDFs) | `src/assets/` |
| 🏷️ **Branding** (logo / favicon) | `public/favicon.svg` |
| 🎨 **Styling** (colors, spacing, animations) | `src/index.css` |

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
