# 🧑‍💻 SRG Developer Portfolio

A modern, interactive developer portfolio website built with **React + Vite**, featuring a macOS-inspired desktop UI with draggable windows and a dynamic dock.

---

## 🚀 Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Vanilla CSS + CSS Variables
- **State Management:** Zustand (store)
- **Routing:** React Router DOM
- **Deployment:** (To be configured)

---

## ✅ Current Features

- macOS-style desktop UI with draggable/resizable windows
- Dynamic dock with animated app icons
- GitHub repository cards (live API fetch)
- Welcome/intro screen animation
- Navbar with smooth navigation

---

## 🗂️ Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, Dock, RepoCard, etc.)
├── constants/        # App-wide constants and config data
├── hoc/              # Higher-order components
├── hooks/            # Custom React hooks
├── store/            # Zustand global state store
└── windows/          # Individual window/page content components
```

---

## 📋 Feature Roadmap — Planned Implementations

> All features below are researched, prioritized, and ready for implementation.
> Mark each one with [x] when completed.

---

### 🎨 UI / UX Enhancements

- [ ] **Dark / Light Mode Toggle**
  - Use CSS custom properties (`--bg-color`, `--text-color`, etc.) for seamless theme switching
  - Auto-detect system preference using `prefers-color-scheme` media query
  - Persist the user's choice in `localStorage`
  - Add a smooth sun/moon icon toggle button in the Navbar

- [ ] **Scroll-triggered Animations**
  - Use the `Intersection Observer API` to trigger animations as sections enter the viewport
  - Animate skill bars, project cards, and section headings on scroll
  - Staggered entrance animations for list items and cards

- [ ] **Custom Cursor**
  - Replace the default cursor with a styled dot + ring cursor effect
  - Add magnetic hover effects on buttons and links
  - Scale/morph the cursor when hovering interactive elements

- [ ] **Page Transitions**
  - Smooth fade/slide transitions between window/page views using `framer-motion` or CSS transitions
  - Loading skeleton screens for async data fetching

- [ ] **Responsive & Mobile-First Layout**
  - Ensure the entire portfolio is fully accessible and usable on mobile devices
  - Collapse the dock into a hamburger menu or bottom nav bar on small screens
  - Test on multiple breakpoints (320px, 768px, 1024px, 1440px)

---

### 📂 Content Sections

- [ ] **About Me Section (Enhanced)**
  - Personal narrative and professional value proposition
  - Professional headshot / avatar with a subtle hover animation
  - Fun facts or personality traits section
  - Timeline of education and career milestones

- [ ] **Skills Section with Animated Progress Bars**
  - Categorize skills: Frontend, Backend, Tools & DevOps, etc.
  - Animated progress bars triggered by `Intersection Observer`
  - Display proficiency level as a percentage with accessible ARIA labels
  - Add technology logos/icons (devicons or react-icons)

- [ ] **Projects Section (Case Studies)**
  - Each project card shows: Title, Description, Tech Stack tags, Live Demo link, GitHub link
  - Modal or expanded view with a detailed case study: Problem → Approach → Result
  - Filter projects by category (Web, Mobile, AI, etc.)
  - Feature 3–5 deep case studies rather than many shallow listings

- [ ] **Blog / Articles Section**
  - Display a grid of blog post cards (title, cover image, read time, date)
  - Link to DEV.to, Hashnode, or Medium posts via their public APIs
  - Or host a local markdown-based blog using `react-markdown`
  - Helps with SEO and demonstrates thought leadership

- [ ] **Testimonials / Recommendations Section**
  - Carousel of testimonials from colleagues, mentors, or clients
  - Each card shows: quote, person's name, role, company
  - Optional: Link to verified LinkedIn recommendation
  - Implement with SwiperJS or a custom auto-scrolling carousel

- [ ] **GitHub Activity / Stats Section**
  - Embed GitHub contribution graph using `https://ghchart.rshah.org/`
  - Display live GitHub stats (stars, forks, top languages) via GitHub API or `github-readme-stats`
  - Show pinned repositories with language and star count

- [ ] **Experience / Work History Section**
  - Vertical timeline of work experience and internships
  - Each entry: Company, Role, Duration, Key achievements (bullet points)
  - Animate each entry sliding in on scroll

- [ ] **Certifications & Achievements Section**
  - Display certificates as cards with certificate name, issuer, and date
  - Include a "Verify" button linking to the official credential URL

---

### 📬 Contact & Communication

- [ ] **Functional Contact Form (EmailJS)**
  - Implement a working contact form using `EmailJS` (no backend required)
  - Fields: Name, Email, Subject, Message
  - Add form validation (required fields, email format check)
  - Show success/error toast notification after submission
  - Add honeypot field or reCAPTCHA to prevent spam

- [ ] **Resume / CV Download Button**
  - Place a prominent "Download Resume" CTA button in the Hero and About sections
  - Store the PDF in the `public/` folder
  - Use `<a href="/resume.pdf" download="SRG_Resume.pdf">` for direct download
  - Keep the resume up to date!

- [ ] **Social Links & CTA Bar**
  - Sticky or floating bar with icons for GitHub, LinkedIn, Twitter/X, Email
  - Add a "Hire Me" or "Open to Work" banner/badge when actively job-seeking
  - Ensure all links open in a new tab with `rel="noopener noreferrer"`

---

### ⚡ Performance & SEO

- [ ] **SEO Optimization**
  - Add `<title>` and `<meta name="description">` tags for each page/view
  - Implement Open Graph tags for rich social media link previews
  - Use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
  - Add a `sitemap.xml` and `robots.txt`

- [ ] **Performance Optimization**
  - Lazy load images using the `loading="lazy"` attribute or `React.lazy()`
  - Use `WebP` format for images to reduce file size
  - Code-split large components for faster initial page load
  - Audit with Lighthouse and aim for a score of 90+ in all categories

- [ ] **PWA Support (Progressive Web App)**
  - Add a `manifest.json` with app name, icons, and theme color
  - Implement a basic service worker for offline support and caching
  - Allow users to "Install" the portfolio as an app on their device

---

### 🔧 Developer Experience

- [ ] **Analytics Integration**
  - Integrate Google Analytics 4 (GA4) or a privacy-friendly alternative like Plausible
  - Track page views, CTA clicks, and most-visited sections
  - Use data to understand what recruiters are looking at

- [ ] **Custom Domain Setup**
  - Purchase a custom domain: `yourname.dev` or `srg.codes`
  - Configure DNS to point to the hosting provider (Vercel, Netlify, GitHub Pages)
  - Enable HTTPS / SSL certificate

- [ ] **CI/CD Pipeline**
  - Set up GitHub Actions to auto-deploy to Vercel/Netlify on every push to `main`
  - Add ESLint and Prettier checks in the pipeline to enforce code quality

- [ ] **Error Boundary & 404 Page**
  - Add a React Error Boundary to catch and display friendly error messages
  - Create a custom, creative 404 page that matches the portfolio theme

---

### 🌟 Wow-Factor / Advanced Features

- [ ] **Interactive 3D Hero Section**
  - Use `Three.js` or `@react-three/fiber` for a subtle 3D background (particles, globe, etc.)
  - Or use `Vanta.js` for animated WebGL backgrounds (net, waves, birds)
  - Keep it subtle — performance > visual flair

- [ ] **Typing / Typewriter Animation in Hero**
  - Cycle through roles: "Frontend Developer", "React Enthusiast", "Problem Solver"
  - Use `react-type-animation` or a custom CSS animation

- [ ] **Live GitHub Repo Search / Filter**
  - Inside the GitHub window, add a search bar to filter repos by name or language
  - Sort by stars, date updated, or forks

- [ ] **"Now Playing" Spotify Widget**
  - Show what music you are currently listening to using the Spotify Web API
  - Display song name, artist, and album art with a subtle pulse animation
  - Falls back to "Not currently playing" state

- [ ] **Visitor Counter / Fun Stats**
  - Show a minimalist visitor count using a backend-free service (CountAPI or JSONBin)
  - Or display fun personal stats: "Lines of code written", "Coffees consumed", etc.

- [ ] **Multi-language Support (i18n)**
  - Support at least English + one other language (e.g., Arabic or Hindi)
  - Use `react-i18next` for translation management
  - Add a language switcher flag button in the Navbar

---

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📌 Notes

- See `note.txt` for any personal implementation notes and reminders.
- When adding new sections, create a new window component inside `src/windows/` and register it in the dock (`src/components/dock.jsx`).
- Always test new features on mobile before marking them as complete.

---

## 📄 License

This project is personal and not open for public redistribution. All rights reserved © SRGonline.
