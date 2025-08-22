// GSAP Animations and ScrollTrigger Effects
class GSAPAnimations {
    constructor() {
        this.init();
        this.setupScrollTriggers();
        this.setupTextAnimations();
        this.setupInteractiveAnimations();
        // this.setupTimelineAnimations();
    }

    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        
        // Set default GSAP settings
        gsap.defaults({
            duration: 1,
            ease: "power2.out"
        });

        // Optimize ScrollTrigger performance
        ScrollTrigger.config({
            autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
        });
    }

    setupScrollTriggers() {
        // Hero section entrance animation
        this.animateHeroSection();
        
        // Section reveals
        //this.animateSectionReveals();
        
        // Process steps animation
        this.animateProcessSteps();
        
        // Benefits cards animation
        this.animateBenefitCards();
        
        // Testimonials animation
        this.animateTestimonials();
        
        // Stats counter animation
        this.animateStatsCounters();
        
        // Curriculum items animation
        // this.animateCurriculumItems();
        
        // Audience section animation
        this.animateAudienceSection();
        
        // About section animation
        this.animateAboutSection();
        
        // Final CTA animation
        this.animateFinalCTA();
    }

    animateHeroSection() {
        const tl = gsap.timeline();
        
        // Initial state - everything hidden
        gsap.set([".hero-badge", ".hero-title", ".hero-subtitle", ".hero-cta"], { //".hero-stats",
            opacity: 0,
            y: 50
        });

        // Animate hero elements in sequence
        tl.to(".hero-badge", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        })
        .to(".hero-title", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.3")
        .to(".hero-subtitle", {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, "-=0.5")
        .to(".hero-stats .stat", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.3")
        .to(".hero-cta", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.2");

        // Continuous floating animation for hero elements
        gsap.to(".hero-badge", {
            y: "+=10",
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        // Parallax effect for hero background
        gsap.to("#hero-canvas", {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    }

    animateSectionReveals() {
        // Animate section headers
        gsap.utils.toArray(".section-header").forEach(header => {
            gsap.fromTo(header.querySelector("h2"), {
                opacity: 0,
                y: 30,
                scale: 0.9
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            gsap.fromTo(header.querySelector("p"), {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.2,
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    animateProcessSteps() {
        gsap.utils.toArray(".step").forEach((step, index) => {
            const isEven = index % 2 === 1;
            const visual = step.querySelector(".step-visual");
            const content = step.querySelector(".step-content");

            // Create timeline for each step
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: step,
                    start: "top 70%",
                    end: "bottom 30%",
                    toggleActions: "play none none reverse"
                }
            });

            // Animate visual container
            tl.fromTo(visual, {
                opacity: 0,
                x: isEven ? 50 : -50,
                scale: 0.8
            }, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            });

            // Animate content
            tl.fromTo(content, {
                opacity: 0,
                x: isEven ? -50 : 50
            }, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.4");

            // Animate step number
            tl.fromTo(content.querySelector(".step-number"), {
                scale: 0,
                rotation: -180
            }, {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
            }, "-=0.6");

            // Animate list items
            const listItems = content.querySelectorAll("li");
            if (listItems.length > 0) {
                tl.fromTo(listItems, {
                    opacity: 0,
                    x: -20
                }, {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power2.out"
                }, "-=0.3");
            }

            // 3D canvas rotation effect
            const canvas = visual.querySelector("div[id*='canvas']");
            if (canvas) {
                gsap.to(canvas, {
                    rotateY: 360,
                    duration: 20,
                    ease: "none",
                    repeat: -1
                });
            }
        });
    }

    animateBenefitCards() {
        gsap.utils.toArray(".benefit-card").forEach((card, index) => {
            const icon = card.querySelector(".benefit-icon");
            const title = card.querySelector("h3");
            const text = card.querySelector("p");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            // Set initial states
            gsap.set([icon, title, text], {
                opacity: 0,
                y: 30
            });

            // Animate card entrance
            tl.to(card, {
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                delay: index * 0.1
            })
            .to(icon, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
            }, "-=0.4")
            .to(title, {
                opacity: 1,
                y: 0,
                duration: 0.5
            }, "-=0.3")
            .to(text, {
                opacity: 1,
                y: 0,
                duration: 0.5
            }, "-=0.2");

            // Hover animations
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 360,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    animateTestimonials() {
        gsap.utils.toArray(".testimonial-card").forEach((card, index) => {
            const stars = card.querySelectorAll(".stars i");
            const quote = card.querySelector(".testimonial-content p");
            const author = card.querySelector(".testimonial-author");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            // Initial states
            gsap.set([stars, quote, author], {
                opacity: 0
            });

            gsap.set(stars, { scale: 0, rotation: -180 });
            gsap.set(quote, { y: 20 });
            gsap.set(author, { x: -20 });

            // Animate entrance
            tl.to(stars, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "back.out(1.7)",
                delay: index * 0.2
            })
            .to(quote, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.2")
            .to(author, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.3");

            // Hover effect
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -5,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    animateStatsCounters() {
        gsap.utils.toArray(".stat").forEach(stat => {
            const number = stat.querySelector(".stat-number");
            const label = stat.querySelector(".stat-label");
            
            if (number && number.hasAttribute('data-count')) {
                const endValue = parseInt(number.getAttribute('data-count'));
                
                ScrollTrigger.create({
                    trigger: stat,
                    start: "top 80%",
                    onEnter: () => {
                        gsap.fromTo(number, {
                            textContent: 0
                        }, {
                            textContent: endValue,
                            duration: 2,
                            ease: "power2.out",
                            snap: { textContent: 1 },
                            onUpdate: function() {
                                number.textContent = Math.ceil(number.textContent);
                            }
                        });

                        gsap.fromTo(stat, {
                            scale: 0.8,
                            opacity: 0
                        }, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.8,
                            ease: "back.out(1.7)"
                        });
                    }
                });
            }
        });
    }

    animateCurriculumItems() {
        gsap.utils.toArray(".curriculum-item").forEach((item, index) => {
            const icon = item.querySelector(".curriculum-icon");
            const text = item.querySelector(".curriculum-text");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                }
            });

            // Set initial states
            gsap.set(icon, {
                scale: 0,
                rotation: -90,
                opacity: 0
            });

            gsap.set(text, {
                opacity: 0,
                x: 30
            });

            // Animate entrance
            tl.to(icon, {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                delay: index * 0.1
            })
            .to(text, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.3");

            // Pulse animation for icons
            gsap.to(icon, {
                scale: 1.1,
                duration: 2,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: index * 0.5
            });
        });
    }

    animateAudienceSection() {
        const columns = gsap.utils.toArray(".audience-column");
        
        columns.forEach((column, index) => {
            const items = column.querySelectorAll("li");
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: column,
                    start: "top 70%",
                    end: "bottom 30%",
                    toggleActions: "play none none reverse"
                }
            });

            // Animate column entrance
            tl.fromTo(column, {
                opacity: 0,
                x: index === 0 ? -50 : 50,
                scale: 0.9
            }, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            });

            // Animate list items
            tl.fromTo(items, {
                opacity: 0,
                x: index === 0 ? -20 : 20
            }, {
                opacity: 1,
                x: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.4");
        });
    }

    animateAboutSection() {
        const image = document.querySelector(".about-image");
        const text = document.querySelector(".about-text");
        const stats = gsap.utils.toArray(".about-stats .stat");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-section",
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate mentor image
        tl.fromTo(image, {
            opacity: 0,
            scale: 0.8,
            rotation: -10
        }, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.7)"
        });

        // Animate text content
        tl.fromTo(text, {
            opacity: 0,
            x: 50
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5");

        // Animate stats
        tl.fromTo(stats, {
            opacity: 0,
            y: 30,
            scale: 0.8
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.3");

        // Floating animation for avatar
        gsap.to(".mentor-avatar", {
            y: "+=15",
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });
    }

    animateFinalCTA() {
        const timer = document.querySelector(".timer");
        const urgencyText = document.querySelector(".urgency-text");
        const ctaButton = document.querySelector(".cta-final");
        const guarantee = document.querySelector(".guarantee");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".final-cta-section",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Set initial states
        gsap.set([timer, urgencyText, ctaButton, guarantee], {
            opacity: 0,
            y: 30
        });

        // Animate elements
        tl.to(timer, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        })
        .to(urgencyText, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4")
        .to(ctaButton, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.3")
        .to(guarantee, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.2");

        // Pulsing effect for CTA button
        gsap.to(ctaButton, {
            scale: 1.05,
            duration: 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        // Timer segments animation
        gsap.utils.toArray(".timer-segment").forEach((segment, index) => {
            gsap.fromTo(segment, {
                scale: 0,
                rotation: 180
            }, {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: timer,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    setupTextAnimations() {
        // Typewriter effect for hero title
        const heroTitle = document.querySelector(".hero-title");
        if (heroTitle) {
            const text = heroTitle.innerHTML;
            heroTitle.innerHTML = "";
            
            gsap.to(heroTitle, {
                duration: 2,
                text: {
                    value: text,
                    delimiter: ""
                },
                ease: "none",
                delay: 1
            });
        }

        // Split text animations for section headers
        gsap.utils.toArray(".section-header h2").forEach(header => {
            const text = header.textContent;
            const splitText = text.split(" ");
            header.innerHTML = splitText.map(word => `<span class="word">${word}</span>`).join(" ");

            gsap.fromTo(header.querySelectorAll(".word"), {
                opacity: 0,
                y: 20,
                rotationX: -90
            }, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    setupInteractiveAnimations() {
        // Magnetic effect for buttons
        gsap.utils.toArray("button, .cta-primary, .cta-secondary, .cta-final").forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            button.addEventListener('mouseleave', (e) => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(button, {
                    x: x * 0.1,
                    y: y * 0.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });

        // Parallax effect for sticky register button
        const stickyBtn = document.getElementById('sticky-register-btn');
        if (stickyBtn) {
            gsap.to(stickyBtn, {
                y: "+=20",
                duration: 2,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });
        }

        // Modal animations
        const modal = document.getElementById('registration-modal');
        const successModal = document.getElementById('success-modal');

        if (modal) {
            modal.addEventListener('show', () => {
                gsap.fromTo(modal.querySelector('.modal-content'), {
                    scale: 0.7,
                    opacity: 0,
                    rotation: -5
                }, {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                });
            });
        }
    }

    setupTimelineAnimations() {
        // Master timeline for coordinated animations
        const masterTL = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });

        // Navbar animation on scroll
        masterTL.to(".navbar", {
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
            duration: 0.3
        }, 0.1);

        // Progress indicator
        gsap.to(".progress-bar", {
            scaleX: 1,
            duration: 1,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });
    }

    // Performance optimization methods
    refresh() {
        ScrollTrigger.refresh();
    }

    kill() {
        ScrollTrigger.killAll();
    }

    // Utility method for creating custom animations
    createCustomAnimation(element, animationConfig) {
        return gsap.fromTo(element, animationConfig.from, {
            ...animationConfig.to,
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                ...animationConfig.scrollTrigger
            }
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to be ready
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        window.gsapAnimations = new GSAPAnimations();
    } else {
        console.warn('GSAP or ScrollTrigger not loaded. Animations will not work.');
    }
});

// Refresh animations on window resize
window.addEventListener('resize', () => {
    if (window.gsapAnimations) {
        setTimeout(() => {
            window.gsapAnimations.refresh();
        }, 100);
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GSAPAnimations;
}

