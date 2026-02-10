// ==================== NAVIGATION & SCROLL EFFECTS ====================

// Scroll section active link
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
            });
            
            const activeLink = document.querySelector("header nav a[href*=" + id + "]");
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });

    // Sticky header
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 100);
};

// ==================== MOBILE MENU ====================

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle("fa-xmark");
        navbar.classList.toggle("active");
    };

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.onclick = () => {
            menuIcon.classList.remove("fa-xmark");
            navbar.classList.remove("active");
        };
    });
}

// ==================== EMAILJS CONTACT FORM ====================

function sendMail(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const number = document.getElementById("number").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Validate all fields are filled
    if (!name || !email || !number || !subject || !message) {
        alert("Please fill in all fields!");
        return;
    }

    const params = {
        name: name,
        email: email,
        number: number,
        subject: subject,
        message: message,
    };

    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    emailjs.send("service_me14rt9", "template_26yrjs6", params)
        .then(() => {
            alert("✅ Message sent successfully! I'll get back to you soon.");
            event.target.reset();
        })
        .catch((err) => {
            console.error("EmailJS Error:", err);
            alert("❌ Error sending message. Please try again or contact me directly.");
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

// ==================== SKILL BARS ANIMATION ====================

const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
};

// ==================== SMOOTH SCROLL ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== INITIALIZATION ====================

window.addEventListener('load', () => {
    // Animate skill bars when they come into view
    animateSkillBars();
    
    // Add fade-in animation to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Initially hide sections
    sections.forEach(section => {
        if (section.id !== 'home') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            sectionObserver.observe(section);
        }
    });
});

// ==================== PREVENT FORM RESUBMISSION ====================

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ==================== CURSOR EFFECT (OPTIONAL - Desktop only) ====================

if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(20, 184, 166, 0.5);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });

    // Enlarge cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// ==================== CONSOLE MESSAGE ====================

console.log('%c👋 Welcome to my portfolio! ', 'background: #14B8A6; color: white; font-size: 20px; padding: 10px;');
console.log('%cLooking for a UI/UX Designer? Let\'s connect! 🚀', 'color: #14B8A6; font-size: 14px;');