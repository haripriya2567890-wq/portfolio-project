/* =========================
   PAGE SWITCHING SYSTEM
========================= */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page-section');
const body = document.body;
const navbarBrand = document.querySelector('.navbar-brand');

function showPage(pageId) {
    if (pageId === 'home') {
        // Return view to default long-scrolling state behavior
        body.classList.remove('single-page-mode');
        
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById('home').classList.add('active');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Isolate selected section view context and hide everything else
        body.classList.add('single-page-mode');
        
        sections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(pageId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        window.scrollTo({ top: 0, behavior: 'auto' });
    }

    // Set matching tracking index indicators on navigation Links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });
}

/* Navbar active router mapping logic */
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const page = this.dataset.page;
        showPage(page);
    });
});

/* Reset logo router handle logic */
if (navbarBrand) {
    navbarBrand.addEventListener('click', function (e) {
        e.preventDefault();
        showPage('home');
    });
}

/* Routing shortcut action bindings */
const contactBtn = document.querySelector('[data-page-btn="contact"]');
if (contactBtn) {
    contactBtn.addEventListener('click', function () {
        showPage('contact');
    });
}

/* =========================
   TYPING ANIMATION
========================= */
const typing = document.getElementById('typing');
const words = [
    "UI/UX Designer",
    "Front-End Developer",
    "Creative Thinker",
    "Problem Solver"
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
    if (!typing) return;
    currentWord = words[i];

    if (isDeleting) {
        typing.textContent = currentWord.substring(0, j--);
        if (j < 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
        }
    } else {
        typing.textContent = currentWord.substring(0, j++);
        if (j > currentWord.length) {
            isDeleting = true;
            setTimeout(type, 1000);
            return;
        }
    }
    setTimeout(type, isDeleting ? 60 : 120);
}
type();

/* =========================
   CONTACT FORM VALIDATION
========================= */
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;

        document.getElementById("nameError").innerHTML = "";
        document.getElementById("emailError").innerHTML = "";
        document.getElementById("phoneError").innerHTML = "";
        document.getElementById("messageError").innerHTML = "";
        document.getElementById("successMsg").innerHTML = "";

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/;

        if (name === "") {
            document.getElementById("nameError").innerHTML = "* Name is required";
            valid = false;
        }
        if (email === "") {
            document.getElementById("emailError").innerHTML = "* Email is required";
            valid = false;
        } else if (!emailPattern.test(email)) {
            document.getElementById("emailError").innerHTML = "* Enter valid email";
            valid = false;
        }
        if (phone === "") {
            document.getElementById("phoneError").innerHTML = "* Phone number is required";
            valid = false;
        } else if (!phonePattern.test(phone)) {
            document.getElementById("phoneError").innerHTML = "* Enter 10-digit number";
            valid = false;
        }
        if (message === "") {
            document.getElementById("messageError").innerHTML = "* Message is required";
            valid = false;
        }

        if (valid) {
            document.getElementById("successMsg").innerHTML = "✅ Message Sent Successfully!";
            form.reset();
        }
    });
}

/* =========================
   BACK TO TOP BUTTON
========================= */
const topBtn = document.getElementById("topBtn");
window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

if (topBtn) {
    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* =========================
   NAV ACTIVE EFFECT ON SCROLL
========================= */
window.addEventListener('scroll', () => {
    // Only track standard scroll coordinates if full scroll behavior state is engaged
    if (body.classList.contains('single-page-mode')) return;

    let current = "";
    sections.forEach(section => {
        const top = section.offsetTop;
        if (window.scrollY >= top - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.dataset.page === current) {
            link.classList.add("active");
        }
    });
});