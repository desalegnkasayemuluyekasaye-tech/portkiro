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

// Case Study Data
const caseStudies = {
    'web-app-case': {
        title: 'Web Application Development',
        challenge: 'Developed a fully responsive web application with modern UI/UX principles.',
        solution: 'Built using React for frontend, Node.js and Express for backend, with PostgreSQL database. Implemented real-time updates and optimized performance.',
        results: 'Achieved 95% Lighthouse score, 2.5s load time, and 98% uptime.'
    },
    'network-case': {
        title: 'Network Infrastructure Design',
        challenge: 'Design secure enterprise network architecture for multi-site deployment.',
        solution: 'Implemented VLAN segmentation, firewall policies, and redundant connections with failover mechanisms.',
        results: 'Improved network reliability to 99.9%, reduced latency by 40%, enhanced security posture significantly.'
    },
    'integration-case': {
        title: 'System Integration',
        challenge: 'Integrate disparate systems and automate data flows across departments.',
        solution: 'Created middleware layer with API integrations, established data synchronization protocols, and built monitoring dashboards.',
        results: 'Reduced manual tasks by 85%, improved data accuracy to 99.8%, saved 200+ hours annually.'
    }
};

// Show case study modal
function showCaseStudy(caseId) {
    const modal = document.getElementById('caseStudyModal');
    const body = document.getElementById('caseStudyBody');
    const study = caseStudies[caseId];

    if (study) {
        body.innerHTML = `
            <h2>${study.title}</h2>
            <div class="case-study-section">
                <h3>Challenge</h3>
                <p>${study.challenge}</p>
            </div>
            <div class="case-study-section">
                <h3>Solution</h3>
                <p>${study.solution}</p>
            </div>
            <div class="case-study-section">
                <h3>Results</h3>
                <p>${study.results}</p>
            </div>
        `;
        modal.style.display = 'block';
    }
}

// Close case study modal
function closeCaseStudy() {
    const modal = document.getElementById('caseStudyModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('caseStudyModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Download resume
function downloadResume(event) {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = 'data:text/plain;base64,UEsDBBQABgAIAAAAIQBkzb8+PAAAAA4AAAAIAAAAUkVBRE1FLnR4dCtJLS9VKMsvTi2pBAAQ//8DAFBLAQIUAxQABgAIAAAAIQBkzb8+PAAAAA4AAAAIAAAAAAAAAAAAAIBBAAAAUkVBRE1FLnR4dFBLBQYAAAAAAQABACYAAABcAAAAACg=';
    link.download = 'Desalegn_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add case study styles
const style = document.createElement('style');
style.textContent = `
    .case-study-section {
        margin-bottom: 1.5rem;
    }

    .case-study-section h3 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }

    .case-study-section p {
        color: var(--text-color);
        line-height: 1.6;
    }
`;
document.head.appendChild(style);
