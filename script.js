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
        github: "https://github.com/Ravigupta9565"
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
        github: "https://github.com/Ravigupta9565"
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

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDescription.textContent = data.description;
    modalGithubLink.href = data.github;

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
