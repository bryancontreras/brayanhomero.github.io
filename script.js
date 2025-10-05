// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu móvil
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menu al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navegación suave y marca de sección activa
    const sections = document.querySelectorAll('section[id]');
    
    function markActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }

    // Animaciones de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.skill-category, .experience-item, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Event listeners
    window.addEventListener('scroll', markActiveSection);
    markActiveSection(); // Llamar inmediatamente

    // Inicializar charts si existen
    if (typeof Chart !== 'undefined') {
        initializeCharts();
    }

    // Inicializar el sistema de idiomas
    initializeLanguageSystem();
});

// Función para inicializar los gráficos del dashboard
function initializeCharts() {
    // Chart 1: Revenue Trend
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Revenue (M$)',
                    data: [2.4, 3.1, 3.8, 4.2],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value + 'M';
                            }
                        }
                    }
                }
            }
        });
    }

    // Chart 2: Pareto Analysis
    const paretoCtx = document.getElementById('paretoChart');
    if (paretoCtx) {
        new Chart(paretoCtx, {
            type: 'bar',
            data: {
                labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Others'],
                datasets: [{
                    label: 'Revenue %',
                    data: [35, 25, 20, 12, 8],
                    backgroundColor: [
                        '#3b82f6',
                        '#60a5fa',
                        '#93c5fd',
                        '#dbeafe',
                        '#f3f4f6'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 40,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Chart 3: SPC Control Chart
    const spcCtx = document.getElementById('spcChart');
    if (spcCtx) {
        new Chart(spcCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Process Metric',
                    data: [94.2, 95.8, 96.1, 94.7, 95.3, 96.4],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Upper Control Limit',
                    data: [97, 97, 97, 97, 97, 97],
                    borderColor: '#ef4444',
                    borderDash: [5, 5],
                    fill: false
                }, {
                    label: 'Lower Control Limit',
                    data: [93, 93, 93, 93, 93, 93],
                    borderColor: '#ef4444',
                    borderDash: [5, 5],
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        min: 90,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Sistema de traducción de idiomas
function initializeLanguageSystem() {
    const languageBtn = document.getElementById('languageBtn');
    let currentLanguage = localStorage.getItem('language') || 'en'; // Empezar en inglés por defecto
    
    // Configurar idioma inicial
    setLanguage(currentLanguage);
    
    // Event listener para el botón de idioma
    if (languageBtn) {
        languageBtn.addEventListener('click', function() {
            currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
            setLanguage(currentLanguage);
            localStorage.setItem('language', currentLanguage);
        });
    }
    
    function setLanguage(lang) {
        // Actualizar todos los elementos con atributos data-es y data-en
        const elements = document.querySelectorAll('[data-es][data-en]');
        elements.forEach(element => {
            element.textContent = element.getAttribute('data-' + lang);
        });
        
        // Actualizar el botón de idioma
        const flagIcon = languageBtn?.querySelector('.flag-icon');
        const langText = languageBtn?.querySelector('.lang-text');
        
        if (flagIcon && langText) {
            if (lang === 'en') {
                // Mostrando inglés, botón para cambiar a español
                flagIcon.textContent = '🇪🇸';
                langText.textContent = 'ES';
            } else {
                // Mostrando español, botón para cambiar a inglés
                flagIcon.textContent = '🇺🇸';
                langText.textContent = 'EN';
            }
        }
    }
}