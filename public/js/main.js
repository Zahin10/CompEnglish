// public/js/main.js - Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
    
    // Staggered animations for cards and other elements
    const animatedElements = document.querySelectorAll('.animate__fadeInUp');
    
    animatedElements.forEach((element) => {
        const delay = element.getAttribute('data-delay');
        if (delay) {
            element.style.animationDelay = `${delay}ms`;
        }
    });
    
    // Scroll animations - elements animate when they come into view
    const animateOnScroll = function() {
        const scrollElements = document.querySelectorAll('.animate__animated:not(.animate__fadeIn):not(.animate__fadeInUp)');
        
        scrollElements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                if (element.classList.contains('animate__fadeInLeft') || 
                    element.classList.contains('animate__fadeInRight')) {
                    element.style.visibility = 'visible';
                }
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Interactive elements for evidence pages
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.timeline-marker').style.transform = 'scale(1.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('.timeline-marker').style.transform = 'scale(1)';
        });
    });
    
    // Add hover effects to insight items
    const insightItems = document.querySelectorAll('.insight-item, .insight-final, .skill');
    
    insightItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Intersection Observer for more advanced scroll animations
    if ('IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -100px 0px"
        };
        
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            });
        }, appearOptions);
        
        const sliderElements = document.querySelectorAll('.evidence-image-large, .evidence-text, .conclusion-text, .conclusion-visual');
        
        sliderElements.forEach(element => {
            appearOnScroll.observe(element);
        });
    }
    
    // Active page highlighting in navigation
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentLocation) {
            item.classList.add('active');
        }
    });
    
    // Balance visual animation in conclusion page
    const balanceBeam = document.querySelector('.balance-beam');
    
    if (balanceBeam) {
        let tiltAngle = 0;
        let direction = 1;
        
        function tiltBalance() {
            tiltAngle += 0.5 * direction;
            
            if (tiltAngle > 5) {
                direction = -1;
            } else if (tiltAngle < -5) {
                direction = 1;
            }
            
            balanceBeam.style.transform = `rotate(${tiltAngle}deg)`;
            requestAnimationFrame(tiltBalance);
        }
        
        // Start the animation when in view
        const balanceVisual = document.querySelector('.balance-visual');
        
        if (balanceVisual) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(tiltBalance);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(balanceVisual);
        }
    }
    
    // ===== EVIDENCE 1 PAGE SPECIFIC FEATURES =====
    
    // Dyslexia text effect
    const dyslexicParagraphs = document.querySelectorAll('.dyslexic-paragraph');
    
    if (dyslexicParagraphs.length > 0) {
        dyslexicParagraphs.forEach(paragraph => {
            const originalText = paragraph.textContent;
            
            paragraph.addEventListener('mouseover', function() {
                // Scramble text effect
                const words = originalText.split(' ');
                const scrambledWords = words.map(word => {
                    // Keep short words and punctuation intact
                    if (word.length <= 3) return word;
                    
                    // Keep first and last letter, scramble middle
                    const first = word.charAt(0);
                    const last = word.charAt(word.length - 1);
                    let middle = word.substring(1, word.length - 1).split('');
                    
                    // Shuffle middle letters
                    for (let i = middle.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [middle[i], middle[j]] = [middle[j], middle[i]];
                    }
                    
                    return first + middle.join('') + last;
                });
                
                paragraph.textContent = scrambledWords.join(' ');
                paragraph.classList.add('scrambled');
            });
            
            paragraph.addEventListener('mouseout', function() {
                // Restore original text
                paragraph.textContent = originalText;
                paragraph.classList.remove('scrambled');
            });
        });
    }
    
    // Learning cards hover effects
    const learningCards = document.querySelectorAll('.learning-card');
    
    if (learningCards.length > 0) {
        learningCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.08)';
            });
        });
    }
});