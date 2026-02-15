// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler - sends email directly
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.submit-button');
        const result = document.getElementById('result');
        
        // Disable button and show loading
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        result.textContent = '';
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            // Send to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                result.style.color = '#10b981';
                result.textContent = '✓ Message sent successfully! I will get back to you soon.';
                contactForm.reset();
            } else {
                result.style.color = '#ef4444';
                result.textContent = '✗ Something went wrong. Please email me directly.';
            }
        } catch (error) {
            result.style.color = '#ef4444';
            result.textContent = '✗ Failed to send. Please email me directly at desalegnky827@gmail.com';
        }
        
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });
}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Toggle section visibility
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const button = event.target;
    
    if (section.classList.contains('active')) {
        section.classList.remove('active');
        button.textContent = button.textContent.replace('Hide', 'View').replace('Less', 'More');
    } else {
        section.classList.add('active');
        if (sectionId === 'about-content') {
            button.textContent = 'Read Less';
        } else if (sectionId === 'projects-content') {
            button.textContent = 'Hide Projects';
        } else if (sectionId === 'skills-content') {
            button.textContent = 'Hide Skills';
        }
    }
}

// Toggle skill details
function toggleSkillDetails(event, detailsId) {
    event.stopPropagation();
    const button = event.currentTarget;
    const details = document.getElementById(detailsId);
    
    button.classList.toggle('active');
    details.classList.toggle('active');
}
