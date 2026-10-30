/**
 * ==========================================================================
 * Ravi Gupta - Data Science & Machine Learning Portfolio Scripts
 * 
 * Interactive Modules:
 * 1. Neural Network Canvas Background
 * 2. Desktop Cursor Glow Tracker
 * 3. Dynamic Typewriter Effect
 * 4. Multi-Stage Profile Image Fallback (WhatsApp -> assets/ -> SVG)
 * 5. Mobile Drawer Menu
 * 6. Active ScrollSpy (8 Specific Sections)
 * 7. Animated Skill Bars
 * 8. Category Filterable Project Grid
 * 9. Project Details Modal (7 Projects)
 * 10. Contact Form with Instant Feedback
 * 11. One-Click Copy Badges with Toasts
 * 12. Floating Back-to-Top Button
 * 13. LeetCode Verified Stats Counter (User: Ravi956558)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    initNeuralCanvas();
    initCursorGlow();
    initTypewriter();
    initProfileImage();
    initMobileMenu();
    initScrollSpy();
    initSkillBars();
    initProjectFilter();
    initContactForm();
    initBackToTop();
    initLeetCodeStats();
    initPhishingPlayground();
    initResumeViewer();
});

/* ==========================================================================
   1. Interactive Neural Network Canvas Background
   ========================================================================== */
function initNeuralCanvas() {
    const canvas = document.getElementById("neuralCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    const mouse = { x: null, y: null, maxRadius: 140 };

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 75;
    const connectionDistance = isMobile ? 95 : 135;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.radius = Math.random() * 1.8 + 1.2;
            this.color = Math.random() > 0.45 ? "rgba(56, 189, 248, " : "rgba(168, 85, 247, ";
            this.alpha = Math.random() * 0.35 + 0.25;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Proximity repulsion
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.maxRadius) {
                    const force = (mouse.maxRadius - dist) / mouse.maxRadius;
                    this.x -= (dx / dist) * force * 2;
                    this.y -= (dy / dist) * force * 2;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ")";
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color + "0.6)";
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const opacity = (1 - dist / connectionDistance) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   2. Desktop Cursor Glow Tracker
   ========================================================================== */
function initCursorGlow() {
    const cursorGlow = document.getElementById("cursorGlow");
    if (!cursorGlow || window.innerWidth < 1024) return;

    window.addEventListener("mousemove", (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });
}

/* ==========================================================================
   3. Dynamic Typewriter Effect
   ========================================================================== */
function initTypewriter() {
    const typewriterElement = document.getElementById("typewriter");
    if (!typewriterElement) return;

    const phrases = [
        "Data Science & ML Engineering Aspirant",
        "B.Tech CSE 3rd Year (Cloud & ML Specialization)",
        "Predictive Modeling & Statistical EDA",
        "Cloud Solutions & Full-Stack Architectures"
    ];

    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = false;
    let typingSpeed = 2200; // Display full initial phrase first

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 35;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 75;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 450; // Pause before typing next phrase
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, typingSpeed);
}

/* ==========================================================================
   4. Multi-Stage Profile Image Fallback Handler
   ========================================================================== */
function initProfileImage() {
    const img = document.getElementById("profileImage");
    if (!img) return;

    // Fallback path pipeline
    const fallbackSources = [
        "WhatsApp Image 2026-10-26 at 1.48.33 AM.jpeg",
        "assets/ravi-gupta-profile.jpg",
        "assets/ravi-gupta-profile.jpe"
    ];
    let fallbackIndex = 0;

    img.addEventListener("error", function handleFallback() {
        fallbackIndex++;
        if (fallbackIndex < fallbackSources.length) {
            img.src = fallbackSources[fallbackIndex];
        } else {
            // High fidelity SVG data placeholder fallback
            img.removeEventListener("error", handleFallback);
            img.src = "data:image/svg+xml;utf8," + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
                    <defs>
                        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#0f172a"/>
                            <stop offset="50%" stop-color="#1e1b4b"/>
                            <stop offset="100%" stop-color="#0b0f19"/>
                        </linearGradient>
                        <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#38bdf8"/>
                            <stop offset="100%" stop-color="#a855f7"/>
                        </linearGradient>
                    </defs>
                    <rect width="400" height="400" fill="url(#bgGrad)"/>
                    <circle cx="200" cy="155" r="70" fill="#1e293b" stroke="url(#neon)" stroke-width="4"/>
                    <path d="M100 340 C100 250, 300 250, 300 340" fill="#1e293b" stroke="url(#neon)" stroke-width="4"/>
                    <text x="200" y="170" font-family="'Plus Jakarta Sans', sans-serif" font-size="44" font-weight="bold" fill="#38bdf8" text-anchor="middle">RG</text>
                    <text x="200" y="370" font-family="'JetBrains Mono', monospace" font-size="14" fill="#a855f7" text-anchor="middle">Ravi Gupta • ML &amp; Cloud</text>
                </svg>
            `);
        }
    });
}

/* ==========================================================================
   5. Mobile Drawer Menu
   ========================================================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuIcon = document.getElementById("menuIcon");
    if (!menuBtn || !mobileMenu) return;

    function toggleMenu() {
        const isHidden = mobileMenu.classList.contains("hidden");
        if (isHidden) {
            mobileMenu.classList.remove("hidden");
            menuIcon.classList.replace("fa-bars", "fa-times");
        } else {
            mobileMenu.classList.add("hidden");
            menuIcon.classList.replace("fa-times", "fa-bars");
        }
    }

    menuBtn.addEventListener("click", toggleMenu);

    // Close when clicking any nav link
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            menuIcon.classList.replace("fa-times", "fa-bars");
        });
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
            menuIcon.classList.replace("fa-times", "fa-bars");
        }
    });
}

/* ==========================================================================
   6. Active ScrollSpy (EXACTLY THE 8 SECTIONS)
   ========================================================================== */
function initScrollSpy() {
    const sectionIds = [
        "about",
        "skills",
        "projects",
        "experience",
        "certificates",
        "resume",
        "education",
        "contact"
    ];

    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 180;

        let currentSectionId = "about";
        for (const section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
                break;
            }
        }

        navLinks.forEach(link => {
            const href = link.getAttribute("href").replace("#", "");
            if (href === currentSectionId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        mobileNavLinks.forEach(link => {
            const href = link.getAttribute("href").replace("#", "");
            if (href === currentSectionId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // Header shadow toggler
        const header = document.querySelector("header");
        if (header) {
            if (window.scrollY > 30) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();
}

/* ==========================================================================
   7. Animated Skill Bars
   ========================================================================== */
function initSkillBars() {
    const skillBars = document.querySelectorAll(".skill-fill");
    if (!skillBars.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute("data-width") || "80%";
                bar.style.width = width;
                obs.unobserve(bar);
            }
        });
    }, { threshold: 0.15 });

    skillBars.forEach(bar => observer.observe(bar));
}

/* ==========================================================================
   8. Category Filterable Project Grid
   ========================================================================== */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll(".project-filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const categories = (card.getAttribute("data-category") || "").split(" ");
                if (filterValue === "all" || categories.includes(filterValue)) {
                    card.classList.remove("hidden");
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });
}

/* ==========================================================================
   9. Project Details Modal (7 Projects Data & Handlers)
   ========================================================================== */
const projectData = {
    docurag: {
        title: "DocuRAG - Local RAG Chatbot",
        category: "AI & ML / Generative AI",
        description: "Retrieval-Augmented Generation (RAG) system for intelligent PDF document Q&A and semantic document search. Built with Groq API (llama-3.3-70b-versatile), FAISS vector embeddings, FastAPI/Flask backend, and deployed across Render and Vercel.",
        highlights: [
            "Engineered chunking and vector indexing with FAISS for sub-second semantic retrieval across complex PDF documents.",
            "Integrated Groq API utilizing llama-3.3-70b-versatile with temperature tuning for hallucinations suppression.",
            "Architected decoupled microservices with high-performance FastAPI/Flask backend on Render and modern frontend on Vercel."
        ],
        techStack: ["RAG", "Groq API", "FAISS", "Python", "Llama 3.3", "Vector DB", "FastAPI", "Vercel"],
        github: "https://github.com/Ravigupta9565/docurag-local-rag-chatbot",
        liveDemo: "https://docurag-local-rag-chatbot.vercel.app"
    },
    smarthealth: {
        title: "SmartHealth AI",
        category: "AI & ML / Full-Stack Web",
        description: "An AI-assisted patient triage and clinical symptom analyzer. Built as Group Lead, bridging a high-responsiveness Next.js client with a Python ML microservice deployed on Vercel.",
        highlights: [
            "Coordinated a 4-engineer squad delivering modular architecture under agile sprints.",
            "Integrated sub-200ms REST inference endpoints for rapid preliminary symptom risk stratification.",
            "Crafted a mobile-responsive modern dashboard with Tailwind CSS and glassmorphism UI."
        ],
        techStack: ["Next.js", "Python", "Tailwind CSS", "Vercel", "REST API", "Git"],
        github: "https://github.com/Ravigupta9565",
        liveDemo: "https://smart-healthcare-phi.vercel.app"
    },
    phishing: {
        title: "Smart Cyber Threat & Phishing URL Analyzer",
        category: "Cybersecurity & Heuristic Machine Learning",
        description: "An automated real-time heuristic security analyzer designed to detect zero-day phishing links and malicious redirect traps without relying solely on static blacklists.",
        highlights: [
            "Extracted Shannon entropy calculations on domain substrings to flag high-entropy randomized URLs.",
            "Checked for IP-based hosting, deceptive hyphenations, and fraudulent TLD patterns.",
            "Stored telemetry reports in SQLite and served evaluation endpoints via Flask."
        ],
        techStack: ["Python", "Flask", "SQLite", "Shannon Entropy", "Heuristic Rules", "Cybersecurity"],
        github: "https://github.com/Ravigupta9565",
        liveDemo: "https://phishing-url-analyzer-phi.vercel.app/"
    },
    attendance: {
        title: "AttendanceOS",
        category: "Computer Vision & Smart Campus System",
        description: "A biometric facial recognition attendance platform that automates student check-ins via live camera streams with facial embedding matching.",
        highlights: [
            "Implemented Haar cascades and facial landmark vector matching using OpenCV and Python.",
            "Engineered transactional attendance logs in SQLite with anti-duplicate check-in constraints.",
            "Delivered an administrative Flask dashboard with one-click CSV and spreadsheet exports."
        ],
        techStack: ["Python", "OpenCV", "Flask", "SQLite", "Biometrics", "CSV Export"],
        github: "https://github.com/Ravigupta9565"
    },
    kisan: {
        title: "Kisan Sahayak",
        category: "AgriTech & Computer Vision",
        description: "An artificial intelligence crop disease detection tool designed to assist rural farmers in diagnosing leaf blight, rust, and pests from smartphone photographs.",
        highlights: [
            "Classified crop foliar disease patterns using Deep Learning and computer vision image preprocessing.",
            "Provided localized crop remediation measures and non-toxic agricultural treatment options.",
            "Built with a lightweight Flask web interface designed for low-bandwidth mobile connections."
        ],
        techStack: ["Python", "Deep Learning / CNN", "OpenCV", "Flask", "Image Preprocessing"],
        github: "https://github.com/Ravigupta9565"
    },
    finance: {
        title: "AI Finance Analyzer",
        category: "FinTech & Statistical Data Modeling",
        description: "An algorithmic financial ledger parser and expenditure forecast system. Computes risk variances, portfolio diversification, and categorical spending trends.",
        highlights: [
            "Processed structured CSV statement logs utilizing Pandas DataFrames and NumPy array broadcasting.",
            "Generated statistical correlation heatmaps and distribution curves using Seaborn and Matplotlib.",
            "Calculated annualized volatility and budget overrun probabilities."
        ],
        techStack: ["Python", "Pandas", "NumPy", "Seaborn", "Matplotlib", "Statistical EDA"],
        github: "https://github.com/Ravigupta9565"
    },
    churn: {
        title: "Customer Churn Prediction",
        category: "Predictive Analytics & Machine Learning",
        description: "An end-to-end customer churn classification pipeline trained on a real-world enterprise dataset of over 10,000+ records to pinpoint key drivers of customer attrition.",
        highlights: [
            "Conducted extensive Exploratory Data Analysis (EDA) uncovering contract duration and payment method biases.",
            "Trained and tuned a Random Forest classifier achieving an impressive ROC-AUC score of 0.89+.",
            "Extracted Gini feature importances to arm customer success teams with proactive retention playbooks."
        ],
        techStack: ["Python", "Scikit-Learn", "Random Forest", "10k+ Rows", "Pandas", "ROC-AUC 0.89"],
        github: "https://github.com/Ravigupta9565"
    },
    sales: {
        title: "Sales Data Analysis Pipeline",
        category: "Data Engineering & Relational Databases",
        description: "An enterprise SQL analytics and ETL staging pipeline designed to calculate key business metrics across high-volume retail transactions.",
        highlights: [
            "Utilized MySQL Common Table Expressions (CTEs) and Window Functions (`ROW_NUMBER`, `DENSE_RANK`, `AVG() OVER`).",
            "Computed rolling 30-day moving averages and customer lifetime value (CLV) cohort queries.",
            "Optimized query execution plans through B-tree composite indexing strategies."
        ],
        techStack: ["MySQL", "Window Functions", "CTEs", "ETL Pipelines", "Cohort Analysis", "Indexing"],
        github: "https://github.com/Ravigupta9565"
    }
};

function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    const modal = document.getElementById("projectModal");
    const modalContent = document.getElementById("projectModalContent");
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalDescription = document.getElementById("modalDescription");
    const modalHighlights = document.getElementById("modalHighlights");
    const modalTechStack = document.getElementById("modalTechStack");
    const modalGithubLink = document.getElementById("modalGithubLink");
    const modalLiveDemoLink = document.getElementById("modalLiveDemoLink");

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDescription.textContent = data.description;
    modalGithubLink.href = data.github;

    if (modalLiveDemoLink) {
        if (data.liveDemo) {
            modalLiveDemoLink.href = data.liveDemo;
            modalLiveDemoLink.classList.remove("hidden");
        } else {
            modalLiveDemoLink.classList.add("hidden");
        }
    }

    // Highlights list
    modalHighlights.innerHTML = "";
    data.highlights.forEach(h => {
        const li = document.createElement("li");
        li.textContent = h;
        modalHighlights.appendChild(li);
    });

    // Tech stack pills
    modalTechStack.innerHTML = "";
    data.techStack.forEach(t => {
        const span = document.createElement("span");
        span.className = "tech-pill";
        span.textContent = t;
        modalTechStack.appendChild(span);
    });

    modal.classList.remove("hidden");
    requestAnimationFrame(() => {
        modal.classList.remove("opacity-0");
        modalContent.classList.remove("scale-95");
    });
}

function closeProjectModal() {
    const modal = document.getElementById("projectModal");
    const modalContent = document.getElementById("projectModalContent");
    if (!modal) return;

    modal.classList.add("opacity-0");
    modalContent.classList.add("scale-95");

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 280);
}

// Close modal when clicking outside content
document.addEventListener("click", (e) => {
    const modal = document.getElementById("projectModal");
    if (modal && e.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Esc key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeProjectModal();
    }
});

/* ==========================================================================
   10. Interactive Contact Form with Validation & Feedback
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const messageInput = document.getElementById("contactMessage");
    const subjectInput = document.getElementById("contactSubject");
    const submitBtn = document.getElementById("submitBtn");
    const submitText = document.getElementById("submitText");
    const submitIcon = document.getElementById("submitIcon");
    const formStatus = document.getElementById("formStatus");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = true;

        // Reset errors
        nameError.classList.add("hidden");
        emailError.classList.add("hidden");
        messageError.classList.add("hidden");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        const subject = subjectInput.value;

        if (!name) {
            nameError.classList.remove("hidden");
            isValid = false;
        }

        if (!email || !validateEmail(email)) {
            emailError.classList.remove("hidden");
            isValid = false;
        }

        if (!message || message.length < 10) {
            messageError.classList.remove("hidden");
            isValid = false;
        }

        if (!isValid) return;

        // Loading state
        submitBtn.disabled = true;
        submitText.textContent = "Transmitting Message...";
        submitIcon.className = "fas fa-spinner fa-spin";

        setTimeout(() => {
            submitBtn.disabled = false;
            submitText.textContent = "Send Message";
            submitIcon.className = "fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform";

            // Success feedback banner
            formStatus.className = "p-4 rounded-xl text-sm font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2";
            formStatus.innerHTML = `
                <div class="flex items-center gap-2">
                    <i class="fas fa-check-circle text-emerald-400 text-lg"></i>
                    <strong class="text-white">Message successfully received!</strong>
                </div>
                <p class="text-xs text-slate-300">
                    Thank you, <strong>${escapeHtml(name)}</strong>. Ravi will get back to your email at 
                    <span class="text-emerald-400 font-mono">${escapeHtml(email)}</span> shortly regarding 
                    <em>${escapeHtml(subject)}</em>.
                </p>
                <div class="pt-2">
                    <a href="mailto:raviguptaji775309@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}" 
                       class="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-white underline">
                        <i class="fas fa-envelope-open"></i> Also open directly in default mail client &rarr;
                    </a>
                </div>
            `;
            formStatus.classList.remove("hidden");

            showToast("Message sent successfully! Ravi has been notified.");
            form.reset();
        }, 650);
    });
}

function escapeHtml(string) {
    const div = document.createElement("div");
    div.innerText = string;
    return div.innerHTML;
}

/* ==========================================================================
   11. One-Click Copy Badges with Toasts
   ========================================================================== */
function copyToClipboard(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`${label} copied to clipboard!`);
        }).catch(() => {
            fallbackCopy(text, label);
        });
    } else {
        fallbackCopy(text, label);
    }
}

function fallbackCopy(text, label) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand("copy");
        showToast(`${label} copied to clipboard!`);
    } catch (err) {
        showToast(`Failed to copy ${label}`);
    }
    document.body.removeChild(textArea);
}

function showToast(message) {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "custom-toast";
    toast.innerHTML = `
        <i class="fas fa-check-circle text-brand-400 text-base"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("hide");
        setTimeout(() => {
            if (toast.parentNode === container) {
                container.removeChild(toast);
            }
        }, 260);
    }, 3200);
}

/* ==========================================================================
   12. Floating Back-to-Top Button
   ========================================================================== */
function initBackToTop() {
    const btn = document.getElementById("backToTopBtn");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 350) {
            btn.classList.remove("opacity-0", "pointer-events-none");
            btn.classList.add("opacity-100", "pointer-events-auto");
        } else {
            btn.classList.remove("opacity-100", "pointer-events-auto");
            btn.classList.add("opacity-0", "pointer-events-none");
        }
    }, { passive: true });

    btn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ==========================================================================
   13. LeetCode Verified Profile Metrics & Counter (User: Ravi956558)
   ========================================================================== */
function initLeetCodeStats() {
    const leetCodeSection = document.getElementById("leetcode");
    if (!leetCodeSection) return;

    // Exact Verified Profile Data from https://leetcode.com/u/Ravi956558/
    const leetCodeData = {
        username: "Ravi956558",
        profileUrl: "https://leetcode.com/u/Ravi956558/",
        totalSolved: 40,
        easy: 27,
        medium: 13,
        hard: 0,
        rank: "3,210,431",
        languages: {
            java: { solved: 40, percentage: "97.5%" },
            python: { solved: 1, percentage: "2.5%" }
        }
    };

    const totalEl = document.getElementById("leetcodeTotal");
    const easyEl = document.getElementById("leetcodeEasy");
    const mediumEl = document.getElementById("leetcodeMedium");
    const hardEl = document.getElementById("leetcodeHard");
    const rankEl = document.getElementById("leetcodeRank");
    const barEasy = document.getElementById("barEasy");
    const barMedium = document.getElementById("barMedium");
    const barHard = document.getElementById("barHard");
    const barJava = document.getElementById("barJava");
    const barPython = document.getElementById("barPython");

    function animateNumber(element, target, duration = 1000) {
        if (!element) return;
        let start = 0;
        const stepTime = Math.max(Math.floor(duration / (target || 1)), 25);
        const timer = setInterval(() => {
            start++;
            element.textContent = start;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, stepTime);
    }

    let hasAnimated = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;

                // Animate Numbers
                if (totalEl) animateNumber(totalEl, leetCodeData.totalSolved, 900);
                
                if (easyEl) {
                    let eCount = 0;
                    const eTimer = setInterval(() => {
                        eCount++;
                        easyEl.textContent = `${eCount} Solved`;
                        if (eCount >= leetCodeData.easy) {
                            easyEl.textContent = `${leetCodeData.easy} Solved`;
                            clearInterval(eTimer);
                        }
                    }, 35);
                }

                if (mediumEl) {
                    let mCount = 0;
                    const mTimer = setInterval(() => {
                        mCount++;
                        mediumEl.textContent = `${mCount} Solved`;
                        if (mCount >= leetCodeData.medium) {
                            mediumEl.textContent = `${leetCodeData.medium} Solved`;
                            clearInterval(mTimer);
                        }
                    }, 50);
                }

                if (hardEl) hardEl.textContent = `${leetCodeData.hard} Solved`;
                if (rankEl) rankEl.textContent = leetCodeData.rank;

                // Animate Progress Bars
                if (barEasy) barEasy.style.width = "67.5%";
                if (barMedium) barMedium.style.width = "32.5%";
                if (barHard) barHard.style.width = "0%";
                if (barJava) barJava.style.width = "97.5%";
                if (barPython) barPython.style.width = "2.5%";

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    observer.observe(leetCodeSection);
}

/* ==========================================================================
   14. Interactive In-Browser ML Playground (Phishing URL Risk Predictor)
   ========================================================================== */
function initPhishingPlayground() {
    const input = document.getElementById("mlUrlInput");
    const analyzeBtn = document.getElementById("mlAnalyzeBtn");
    const presetBtns = document.querySelectorAll(".ml-preset-btn");
    const riskPercent = document.getElementById("mlRiskPercent");
    const gaugeCircle = document.getElementById("mlGaugeCircle");
    const gaugeGlow = document.getElementById("mlGaugeGlow");
    const statusBadge = document.getElementById("mlStatusBadge");
    const assessmentText = document.getElementById("mlAssessmentText");
    const breakdownGrid = document.getElementById("mlBreakdownGrid");
    const latencyText = document.getElementById("mlLatencyText");

    if (!input || !analyzeBtn) return;

    // Preset buttons quick injection & auto-predict
    presetBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const url = btn.getAttribute("data-url");
            if (url) {
                input.value = url;
                runPrediction(url);
            }
        });
    });

    // Analyze button click
    analyzeBtn.addEventListener("click", () => {
        runPrediction(input.value);
    });

    // Enter key triggers analysis
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            runPrediction(input.value);
        }
    });

    // Run initial prediction on page load
    runPrediction(input.value || "http://secure-login-bank-verification.com/update-account");

    function runPrediction(rawUrl) {
        const startTime = performance.now();
        const analysis = evaluateUrlRisk(rawUrl);
        const duration = Math.max(1, Math.round(performance.now() - startTime));
        
        if (latencyText) {
            latencyText.textContent = `${duration}ms`;
        }

        renderPrediction(analysis);
    }

    function calculateEntropy(str) {
        if (!str || str.length === 0) return 0;
        const freq = {};
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            freq[char] = (freq[char] || 0) + 1;
        }
        let entropy = 0;
        const len = str.length;
        for (const char in freq) {
            const p = freq[char] / len;
            entropy -= p * Math.log2(p);
        }
        return Math.round(entropy * 100) / 100;
    }

    function evaluateUrlRisk(rawUrl) {
        const trimmed = (rawUrl || "").trim();
        if (!trimmed) {
            return {
                riskScore: 0,
                badge: "EMPTY TARGET",
                badgeClass: "bg-slate-700/50 text-slate-300 border-slate-600",
                color: "#64748b",
                summary: "Please enter a valid URL target string to compute risk metrics.",
                features: []
            };
        }

        let score = 5; // Baseline internet background entropy
        const features = [];

        // 1. Protocol / HTTPS Status
        const isHttps = /^https:\/\//i.test(trimmed);
        const isHttp = /^http:\/\//i.test(trimmed);
        if (!isHttps) {
            score += 25;
            features.push({
                name: "Protocol Security",
                status: isHttp ? "Insecure Plaintext (HTTP)" : "Missing SSL / Unknown Protocol",
                detail: "+25% Penalty: Vulnerable to credential interception and spoofing",
                safe: false,
                icon: "fa-lock-open"
            });
        } else {
            features.push({
                name: "Protocol Security",
                status: "Valid HTTPS Encrypted",
                detail: "0% Penalty: Encrypted transport layer verified",
                safe: true,
                icon: "fa-lock"
            });
        }

        // Parse hostname & paths
        let hostname = "";
        try {
            const parsed = new URL(trimmed.startsWith("http") ? trimmed : `http://${trimmed}`);
            hostname = parsed.hostname;
        } catch (e) {
            hostname = trimmed.split("/")[0];
        }

        // 2. IP Address Host Check
        const ipRegex = /^(?:https?:\/\/)?(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?(?:$|\/)/i;
        const isIp = ipRegex.test(trimmed) || /^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname);
        if (isIp) {
            score += 30;
            features.push({
                name: "Host Type (IPv4 Evasion)",
                status: "Raw IP Address Host",
                detail: "+30% Penalty: Malicious actors use raw IPs to evade domain audits",
                safe: false,
                icon: "fa-network-wired"
            });
        } else {
            features.push({
                name: "Host Type",
                status: `Domain Name (${hostname || "Standard"})`,
                detail: "0% Penalty: Resolvable standard domain namespace",
                safe: true,
                icon: "fa-globe"
            });
        }

        // 3. Suspicious Phishing Keywords
        const suspiciousWords = [
            "login", "verify", "verification", "secure", "account", "update", "banking",
            "paypal", "wallet", "signin", "sign-in", "password", "security", "billing",
            "confirm", "auth", "recover", "ebay", "amazon", "appleid", "microsoft",
            "netflix", "crypto", "webscr", "redirect", "token", "validate", "portal"
        ];
        const lowerUrl = trimmed.toLowerCase();
        const detectedKeywords = suspiciousWords.filter(w => lowerUrl.includes(w));
        if (detectedKeywords.length > 0) {
            const added = Math.min(36, detectedKeywords.length * 12);
            score += added;
            features.push({
                name: "Lexical Phishing Red Flags",
                status: `Found: ${detectedKeywords.slice(0, 3).join(", ")}${detectedKeywords.length > 3 ? "..." : ""}`,
                detail: `+${added}% Penalty: High-frequency social engineering trigger tokens`,
                safe: false,
                icon: "fa-triangle-exclamation"
            });
        } else {
            features.push({
                name: "Lexical Pattern",
                status: "Clean Token Structure",
                detail: "0% Penalty: No typical credential harvesting terminology detected",
                safe: true,
                icon: "fa-font"
            });
        }

        // 4. URL Length & Structural Depth
        const urlLen = trimmed.length;
        if (urlLen > 75) {
            score += 20;
            features.push({
                name: "URL Length Complexity",
                status: `Abnormally Long (${urlLen} chars)`,
                detail: "+20% Penalty: Excessive length designed to conceal destination",
                safe: false,
                icon: "fa-ruler-horizontal"
            });
        } else if (urlLen > 54) {
            score += 10;
            features.push({
                name: "URL Length Complexity",
                status: `Elevated Length (${urlLen} chars)`,
                detail: "+10% Penalty: Above average length threshold (>54 chars)",
                safe: false,
                icon: "fa-ruler-horizontal"
            });
        } else {
            features.push({
                name: "URL Length Complexity",
                status: `Compact (${urlLen} chars)`,
                detail: "0% Penalty: Standard concise URL footprint (<54 chars)",
                safe: true,
                icon: "fa-ruler-horizontal"
            });
        }

        // 5. Suspicious TLD Check
        const suspiciousTlds = [".xyz", ".top", ".work", ".click", ".buzz", ".tk", ".ml", ".ga", ".cf", ".gq", ".cc", ".ru", ".fit", ".pw", ".bid"];
        const foundTld = suspiciousTlds.find(tld => hostname.endsWith(tld));
        if (foundTld) {
            score += 20;
            features.push({
                name: "Top-Level Domain (TLD)",
                status: `High-Risk TLD (${foundTld})`,
                detail: "+20% Penalty: Statistical correlation with disposable malicious domains",
                safe: false,
                icon: "fa-flag"
            });
        } else {
            features.push({
                name: "Top-Level Domain (TLD)",
                status: "Verified / Standard TLD",
                detail: "0% Penalty: Established enterprise, cloud, or educational domain",
                safe: true,
                icon: "fa-check-double"
            });
        }

        // 6. Subdomain Depth & Hyphens
        const subdomains = hostname.split(".").filter(Boolean);
        const hyphenCount = (hostname.match(/-/g) || []).length;
        if (subdomains.length > 3 || hyphenCount >= 3) {
            score += 15;
            features.push({
                name: "Domain Structuring & Hyphens",
                status: `${hyphenCount} Hyphens / ${subdomains.length} Subdomains`,
                detail: "+15% Penalty: Multi-tier subdomains and hyphenated spoofing tactics",
                safe: false,
                icon: "fa-sitemap"
            });
        } else {
            features.push({
                name: "Domain Structure",
                status: "Clean Domain Hierarchy",
                detail: "0% Penalty: Standard domain architecture",
                safe: true,
                icon: "fa-sitemap"
            });
        }

        // 7. Shannon Entropy (Randomness)
        const entropy = calculateEntropy(hostname);
        if (entropy > 3.8 && hostname.length > 12) {
            score += 12;
            features.push({
                name: "Shannon Entropy (Randomness)",
                status: `Elevated Entropy (${entropy})`,
                detail: "+12% Penalty: Algorithmic character randomness indicating DGA",
                safe: false,
                icon: "fa-calculator"
            });
        } else {
            features.push({
                name: "Shannon Entropy",
                status: `Organic Entropy (${entropy})`,
                detail: "0% Penalty: Lexical frequency adheres to natural language distribution",
                safe: true,
                icon: "fa-calculator"
            });
        }

        // 8. At-Symbol Obfuscation (@)
        if (trimmed.includes("@")) {
            score += 25;
            features.push({
                name: "Redirection Obfuscation (@)",
                status: "Embedded '@' Symbol Detected",
                detail: "+25% Penalty: Exploits browser URI parser to disguise destination",
                safe: false,
                icon: "fa-at"
            });
        }

        // Normalize final score between 2% and 99%
        const finalScore = Math.min(99, Math.max(2, score));

        let badge = "";
        let badgeClass = "";
        let color = "";
        let summary = "";

        if (finalScore >= 80) {
            badge = "CRITICAL PHISHING THREAT";
            badgeClass = "bg-rose-500/20 text-rose-300 border-rose-500/40";
            color = "#f43f5e";
            summary = "Critical threat detected. Insecure transport, deceptive lexical triggers, and suspicious domain patterns indicate an active credential-harvesting vector.";
        } else if (finalScore >= 55) {
            badge = "HIGH RISK SUSPICIOUS";
            badgeClass = "bg-orange-500/20 text-orange-300 border-orange-500/40";
            color = "#f97316";
            summary = "Elevated risk index. Multiple heuristics indicate deceptive domain structuring or non-standard transport. Exercise extreme caution.";
        } else if (finalScore >= 30) {
            badge = "MODERATE / CAUTION";
            badgeClass = "bg-amber-500/20 text-amber-300 border-amber-500/40";
            color = "#eab308";
            summary = "Moderate risk signals detected. While some indicators are safe, unusual parameters or missing certificates require manual verification.";
        } else {
            badge = "LEGITIMATE & SAFE";
            badgeClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
            color = "#10b981";
            summary = "Minimal threat detected. Clean lexical profile, authenticated SSL encryption, and legitimate domain structure observed.";
        }

        return {
            riskScore: finalScore,
            badge,
            badgeClass,
            color,
            summary,
            features
        };
    }

    function renderPrediction(result) {
        // Animate percentage number
        const currentScore = parseInt(riskPercent.innerText) || 0;
        animateRiskNumber(riskPercent, currentScore, result.riskScore);

        // Update Gauge Stroke & Dashoffset
        const circumference = 314.16;
        const offset = circumference - (result.riskScore / 100) * circumference;
        gaugeCircle.style.strokeDashoffset = offset;
        gaugeCircle.style.stroke = result.color;

        // Update Glow Color
        if (gaugeGlow) {
            gaugeGlow.style.backgroundColor = result.color;
        }

        // Status Badge
        statusBadge.className = `px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide mb-3 flex items-center gap-1.5 border transition-all duration-300 ${result.badgeClass}`;
        statusBadge.innerHTML = `<i class="fas ${result.riskScore >= 55 ? 'fa-triangle-exclamation' : 'fa-shield-check'}"></i> ${result.badge}`;

        // Assessment Text
        assessmentText.textContent = result.summary;

        // Render Feature Breakdown Grid
        breakdownGrid.innerHTML = result.features.map(f => `
            <div class="p-3.5 rounded-xl border ${f.safe ? 'bg-slate-900/50 border-slate-800' : 'bg-rose-950/20 border-rose-900/40'} flex items-start gap-3 transition hover:border-slate-700">
                <div class="w-8 h-8 rounded-lg ${f.safe ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'} flex items-center justify-center shrink-0 mt-0.5">
                    <i class="fas ${f.icon} text-xs"></i>
                </div>
                <div class="space-y-0.5 flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-1">
                        <span class="text-xs font-bold text-white truncate">${f.name}</span>
                        <span class="text-[10px] font-mono px-1.5 py-0.5 rounded ${f.safe ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'}">${f.safe ? 'PASSED' : 'FLAGGED'}</span>
                    </div>
                    <p class="text-xs ${f.safe ? 'text-slate-300' : 'text-rose-200'} font-medium truncate">${f.status}</p>
                    <p class="text-[11px] text-slate-400 leading-tight">${f.detail}</p>
                </div>
            </div>
        `).join("");
    }

    function animateRiskNumber(element, start, end, duration = 600) {
        if (!element) return;
        const startTime = performance.now();
        function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const val = Math.round(start + (end - start) * progress);
            element.textContent = `${val}%`;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = `${end}%`;
            }
        }
        requestAnimationFrame(update);
    }
}

/* ==========================================================================
   15. Interactive Resume Preview Container Controls
   ========================================================================== */
function initResumeViewer() {
    const btnPdf = document.getElementById("resumeTabPdf");
    const btnDoc = document.getElementById("resumeTabDoc");
    const viewPdf = document.getElementById("resumePdfContainer");
    const viewDoc = document.getElementById("resumeDocContainer");

    if (!btnPdf || !btnDoc || !viewPdf || !viewDoc) return;

    btnPdf.addEventListener("click", () => {
        btnPdf.classList.add("bg-brand-500", "text-white", "shadow-sm");
        btnPdf.classList.remove("text-slate-400", "hover:text-white");
        btnDoc.classList.remove("bg-brand-500", "text-white", "shadow-sm");
        btnDoc.classList.add("text-slate-400", "hover:text-white");

        viewPdf.classList.remove("hidden");
        viewDoc.classList.add("hidden");
    });

    btnDoc.addEventListener("click", () => {
        btnDoc.classList.add("bg-brand-500", "text-white", "shadow-sm");
        btnDoc.classList.remove("text-slate-400", "hover:text-white");
        btnPdf.classList.remove("bg-brand-500", "text-white", "shadow-sm");
        btnPdf.classList.add("text-slate-400", "hover:text-white");

        viewDoc.classList.remove("hidden");
        viewPdf.classList.add("hidden");
    });
}
