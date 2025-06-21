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

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe all sections with animation
        document.querySelectorAll('.section-reveal').forEach(section => {
            observer.observe(section);
        });

        // Add parallax effect to floating shapes
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.floating-shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add mobile menu toggle functionality
        const mobileMenuButton = document.querySelector('nav button');
        const navLinks = document.querySelector('nav .hidden.md\\:flex');

        if (mobileMenuButton && navLinks) {
            mobileMenuButton.addEventListener('click', () => {
                navLinks.classList.toggle('hidden');
                navLinks.classList.toggle('flex');
                navLinks.classList.toggle('flex-col');
                navLinks.classList.toggle('absolute');
                navLinks.classList.toggle('top-full');
                navLinks.classList.toggle('left-0');
                navLinks.classList.toggle('w-full');
                navLinks.classList.toggle('bg-blue-900');
                navLinks.classList.toggle('p-4');
            });
        }

        // Add typing effect to hero title
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                const heroTitle = document.querySelector('#hero h1');
                if (heroTitle) {
                    const originalText = heroTitle.textContent;
                    typeWriter(heroTitle, originalText, 30);
                }
            }, 1000);
        });

        // Add interactive hover effects to phase cards
        document.querySelectorAll('.phase-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add glowing effect on scroll
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            document.querySelectorAll('.phase-card').forEach((card, index) => {
                const cardTop = card.offsetTop;
                const cardBottom = cardTop + card.offsetHeight;
                
                if (scrollPosition + windowHeight > cardTop && scrollPosition < cardBottom) {
                    card.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15)';
                } else {
                    card.style.boxShadow = '';
                }
            });
        });
        // Add scroll to section function
        function scrollToSection(target) {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        // Exit Intent Modal Logic
        let modalShown = false;
        let exitIntentModal = null;

        // Create and inject the modal HTML
        function createExitIntentModal() {
            const modalHTML = `
                <div id="exitIntentModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div class="relative max-w-md w-full mx-4 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 scale-95 opacity-0" id="modalContent">
                        <!-- Close button -->
                        <button id="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        
                        <!-- Modal content -->
                        <div class="p-8">
                            <!-- Header with icon -->
                            <div class="text-center mb-6">
                                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                </div>
                                <h3 class="text-2xl font-bold text-gray-900 mb-2">Wait! Don't Leave Empty-Handed</h3>
                                <p class="text-gray-600">Get our exclusive <strong>Web App Development Blueprint</strong> - a comprehensive guide to building custom planning apps with AI.</p>
                            </div>
                            
                            <!-- Benefits list -->
                            <div class="mb-6">
                                <h4 class="font-semibold text-gray-900 mb-3">What you'll get:</h4>
                                <ul class="space-y-2 text-sm text-gray-600">
                                    <li class="flex items-center">
                                        <svg class="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        Step-by-step development roadmap
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        Claude AI prompts and templates
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        Code snippets and boilerplates
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        Deployment checklists
                                    </li>
                                </ul>
                            </div>
                            
                            <!-- Email form -->
                            <form id="emailCaptureForm" class="space-y-4">
                                <div>
                                    <input 
                                        type="email" 
                                        id="userEmail" 
                                        name="email" 
                                        placeholder="Enter your email address"
                                        required
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    >
                                </div>
                                <button 
                                    type="submit" 
                                    id="downloadButton"
                                    class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <span id="buttonText">Get My Free Blueprint</span>
                                    <svg id="loadingSpinner" class="hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </button>
                            </form>
                            
                            <!-- Privacy notice -->
                            <p class="text-xs text-gray-500 mt-4 text-center">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                            
                            <!-- No thanks option -->
                            <button id="noThanks" class="w-full text-gray-400 hover:text-gray-600 text-sm mt-3 transition-colors">
                                No thanks, I'll pass on this free resource
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            exitIntentModal = document.getElementById('exitIntentModal');
        }

        // Show modal with animation
        function showExitIntentModal() {
            if (modalShown) return;
            
            modalShown = true;
            exitIntentModal.classList.remove('hidden');
            exitIntentModal.classList.add('flex');
            
            // Animate in
            setTimeout(() => {
                const modalContent = document.getElementById('modalContent');
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }, 10);
        }

        // Hide modal with animation
        function hideExitIntentModal() {
            const modalContent = document.getElementById('modalContent');
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');
            
            setTimeout(() => {
                exitIntentModal.classList.add('hidden');
                exitIntentModal.classList.remove('flex');
            }, 300);
        }

        // Exit intent detection
        function detectExitIntent(e) {
            if (e.clientY <= 0 && !modalShown) {
                showExitIntentModal();
            }
        }

        // Handle form submission
        function handleFormSubmission(e) {
            e.preventDefault();
            
            const email = document.getElementById('userEmail').value;
            const button = document.getElementById('downloadButton');
            const buttonText = document.getElementById('buttonText');
            const spinner = document.getElementById('loadingSpinner');
            
            // Show loading state
            button.disabled = true;
            buttonText.textContent = 'Processing...';
            spinner.classList.remove('hidden');
            
            // Simulate Mailchimp integration (replace with actual Mailchimp API)
            setTimeout(() => {
                // Hide loading state
                spinner.classList.add('hidden');
                buttonText.textContent = 'Download Starting...';
                
                // Simulate PDF download
                setTimeout(() => {
                    // Create a dummy PDF download link
                    const link = document.createElement('a');
                    link.href = '#'; // Replace with actual PDF URL
                    link.download = 'ucleus-web-app-blueprint.pdf';
                    link.click();
                    
                    // Show success message
                    buttonText.textContent = 'Success! Check your downloads';
                    button.classList.remove('from-blue-600', 'to-purple-600');
                    button.classList.add('bg-green-500');
                    
                    // Close modal after delay
                    setTimeout(() => {
                        hideExitIntentModal();
                    }, 2000);
                    
                }, 1000);
                
            }, 1500);
            
            // Here you would integrate with Mailchimp API
            // Example Mailchimp integration:
            /*
            fetch('YOUR_MAILCHIMP_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email_address: email,
                    status: 'subscribed'
                })
            })
            .then(response => response.json())
            .then(data => {
                // Handle success
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            */
        }

        // Initialize modal functionality
        function initializeExitIntentModal() {
            createExitIntentModal();
            
            // Add event listeners
            document.addEventListener('mouseleave', detectExitIntent);
            
            // Modal close events
            document.getElementById('closeModal').addEventListener('click', hideExitIntentModal);
            document.getElementById('noThanks').addEventListener('click', hideExitIntentModal);
            
            // Close on backdrop click
            exitIntentModal.addEventListener('click', (e) => {
                if (e.target === exitIntentModal) {
                    hideExitIntentModal();
                }
            });
            
            // Form submission
            document.getElementById('emailCaptureForm').addEventListener('submit', handleFormSubmission);
            
            // Escape key to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !exitIntentModal.classList.contains('hidden')) {
                    hideExitIntentModal();
                }
            });
        }

        // Initialize after DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Small delay to ensure everything is loaded
            setTimeout(initializeExitIntentModal, 1000);
        });

        // Optional: Show modal after certain time on page (fallback)
        setTimeout(() => {
            if (!modalShown) {
                // Only show if user has been on page for 30 seconds without leaving
                showExitIntentModal();
            }
        }, 30000);