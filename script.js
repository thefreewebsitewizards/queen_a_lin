// Typewriter Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = this.txt;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
    const txtElement = document.querySelector('.typewriter-text');
    if (txtElement) {
        const words = ['Fine Line Tattoos', 'Floral Inks', 'Minimalist Art', 'Symbolic Designs', 'Custom Pieces'];
        new TypeWriter(txtElement, words, 2000);
    }
});

// Smooth Scrolling for Navigation Links
// Enhanced Smooth Scrolling for Navigation Links with Mobile Menu Close
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Remove active class from all navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active-link');
        });
        
        // Add active class to clicked link
        this.classList.add('active-link');
        
        // Close mobile menu if it's open
        const navLinks = document.querySelector('.nav-links');
        const navToggle = document.querySelector('.nav-toggle');
        if (navLinks && navToggle) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Smooth scroll to target
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio Filtering with Show More functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const showMoreBtn = document.getElementById('showMoreBtn');
let currentFilter = 'all';
let showingAll = false;
const ITEMS_TO_SHOW = 6;

function updatePortfolioDisplay() {
    const filteredItems = Array.from(portfolioItems).filter(item => {
        return currentFilter === 'all' || item.getAttribute('data-category') === currentFilter;
    });
    
    // Hide all items first
    portfolioItems.forEach(item => {
        item.style.display = 'none';
    });
    
    // Show items based on current state
    const itemsToShow = showingAll ? filteredItems.length : Math.min(ITEMS_TO_SHOW, filteredItems.length);
    
    for (let i = 0; i < itemsToShow; i++) {
        if (filteredItems[i]) {
            filteredItems[i].style.display = 'block';
            filteredItems[i].style.animation = 'fadeInUp 0.5s ease';
        }
    }
    
    // Show/hide show more button
    if (filteredItems.length > ITEMS_TO_SHOW && !showingAll) {
        showMoreBtn.style.display = 'inline-block';
        showMoreBtn.textContent = `Show More (${filteredItems.length - ITEMS_TO_SHOW} more)`;
    } else if (showingAll && filteredItems.length > ITEMS_TO_SHOW) {
        showMoreBtn.style.display = 'inline-block';
        showMoreBtn.textContent = 'Show Less';
    } else {
        showMoreBtn.style.display = 'none';
    }
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        currentFilter = button.getAttribute('data-filter');
        showingAll = false; // Reset to show limited items when filter changes
        updatePortfolioDisplay();
    });
});

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        showingAll = !showingAll;
        updatePortfolioDisplay();
    });
}

// Initialize portfolio display
document.addEventListener('DOMContentLoaded', () => {
    updatePortfolioDisplay();
});

// Enhanced Lightbox Functionality
const portfolioImages = document.querySelectorAll('.portfolio-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

portfolioImages.forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightbox();
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .step-card, .policy-section');
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Add slide animations to about section
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    
    if (aboutImage && aboutText) {
        aboutImage.classList.add('slide-left');
        aboutText.classList.add('slide-right');
        observer.observe(aboutImage);
        observer.observe(aboutText);
    }
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Here you would typically send the data to a server
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Add CSS for mobile navigation
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(0, 0, 0, 0.98);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
        }
        
        .nav-links.active {
            left: 0;
        }
        
        .nav-links li {
            margin: 1rem 0;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);
