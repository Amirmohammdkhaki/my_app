// ============================================================================
// گلدمن - اسکریپت اصلی
// Goldman - Main JavaScript
// Version: 2.0.0
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== 1. Navbar Scroll Effect =====
    const navbar = document.getElementById('mainNavbar');
    
    function updateNavbarOnScroll() {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbarOnScroll);
    updateNavbarOnScroll(); // اجرای اولیه
    
    // ===== 2. Mobile Menu Close on Link Click =====
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.getElementById('navbarGoldman');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
    
    // ===== 3. Button Ripple Effect =====
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    const buttons = document.querySelectorAll('.signup-btn, .login-btn, .profile-link');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // ===== 4. Particle Animation =====
    function createParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            particle.style.animationDuration = `${15 + index * 2}s`;
        });
    }
    createParticles();
    
    // ===== 5. Active Link Highlight =====
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.closest('.nav-item').classList.add('active');
        }
    });
    
    // ===== 6. Lazy Loading Images =====
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
    
    // ===== 7. Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
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
    
    // ===== 8. Alert Auto Dismiss =====
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });
    
    // ===== 9. Add Loading State to Buttons =====
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('loading');
        });
    });
    
    // ===== 10. Responsive Adjustments =====
    function handleResponsive() {
        const width = window.innerWidth;
        const authButtons = document.querySelector('.auth-buttons');
        
        if (authButtons) {
            if (width < 992) {
                authButtons.style.flexDirection = 'column';
            } else {
                authButtons.style.flexDirection = 'row';
            }
        }
    }
    
    window.addEventListener('resize', handleResponsive);
    handleResponsive();
    
    // ===== 11. Navbar Hide on Scroll Down =====
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== 12. Initialize Tooltips =====
    if (typeof $ !== 'undefined' && $.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }
});