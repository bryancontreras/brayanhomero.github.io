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
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Ejecutar al hacer scroll
    window.addEventListener('scroll', markActiveSection);
    
    // Ejecutar al cargar la página
    markActiveSection();
});

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
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Ejecutar al hacer scroll
    window.addEventListener('scroll', markActiveSection);
    
    // Ejecutar al cargar la página
    markActiveSection();
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observar elementos para animar
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll(
        '.about-content, .timeline-item, .skill-category, .project-card, .contact-content'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

// Contador animado para las estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = !isNaN(target);
        
        if (isNumber) {
            const targetNumber = parseInt(target);
            const increment = targetNumber / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < targetNumber) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        }
    });
}

// Observar la sección de estadísticas para iniciar animación
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Efecto de cursor personalizado (opcional)
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    Object.assign(cursor.style, {
        position: 'fixed',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'rgba(37, 99, 235, 0.3)',
        pointerEvents: 'none',
        zIndex: '9999',
        transition: 'transform 0.1s ease',
        transform: 'translate(-50%, -50%)',
        display: 'none'
    });
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.display = 'block';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.display = 'block';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.display = 'none';
    });
    
    // Efecto hover en elementos clickeables
    const clickableElements = document.querySelectorAll('a, button, .btn');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'rgba(37, 99, 235, 0.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'rgba(37, 99, 235, 0.3)';
        });
    });
});

// Lazy loading para imágenes (si se agregan en el futuro)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Ejecutar lazy loading al cargar la página
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Función para compartir en redes sociales
function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Brayan RC - Senior Business Intelligence Analyst');
    const description = encodeURIComponent('Especialista en análisis de datos y Business Intelligence');
    
    const socialUrls = {
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        whatsapp: `https://api.whatsapp.com/send?text=${title} ${url}`
    };
    
    if (socialUrls[platform]) {
        window.open(socialUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Añadir botones de compartir si se desean
document.addEventListener('DOMContentLoaded', function() {
    const shareButtons = document.querySelectorAll('[data-share]');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.dataset.share;
            shareOnSocial(platform);
        });
    });
});

// Performance: Preload de recursos críticos
function preloadCriticalResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Ejecutar preload al cargar la página
document.addEventListener('DOMContentLoaded', preloadCriticalResources);

// Dashboard Charts
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboardCharts();
});

// Initialize Dashboard Charts
function initializeDashboardCharts() {
    // Chart.js default configuration
    Chart.defaults.color = '#64748b';
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 12;
    
    // Revenue Trend Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Facturación (MXN)',
                    data: [85000000, 92000000, 108000000, 125000000, 142000000, 158000000],
                    borderColor: '#1d4ed8',
                    backgroundColor: 'rgba(29, 78, 216, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1d4ed8',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#1d4ed8',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return 'Facturación: $' + context.parsed.y.toLocaleString('es-MX');
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f1f5f9'
                        },
                        border: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000000) + 'M';
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // Pareto Analysis Chart
    const paretoCtx = document.getElementById('paretoChart');
    if (paretoCtx) {
        new Chart(paretoCtx, {
            type: 'bar',
            data: {
                labels: ['Cardio', 'Oncología', 'Neurología', 'Pediatría', 'Emergencias', 'Otros'],
                datasets: [{
                    label: 'Ingresos por Especialidad',
                    data: [45000000, 38000000, 25000000, 18000000, 15000000, 17000000],
                    backgroundColor: [
                        '#1d4ed8',
                        '#2563eb',
                        '#3b82f6',
                        '#60a5fa',
                        '#93c5fd',
                        '#bfdbfe'
                    ],
                    borderRadius: 6,
                    borderSkipped: false
                }, {
                    label: '% Acumulado',
                    data: [28.5, 52.4, 68.2, 79.6, 89.1, 100],
                    type: 'line',
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    borderWidth: 3,
                    yAxisID: 'y1',
                    tension: 0.4,
                    pointBackgroundColor: '#dc2626',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#1d4ed8',
                        borderWidth: 1,
                        cornerRadius: 8
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: true,
                        grid: {
                            color: '#f1f5f9'
                        },
                        border: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000000) + 'M';
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        max: 100,
                        grid: {
                            drawOnChartArea: false
                        },
                        border: {
                            display: false
                        },
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

    // SPC Control Chart
    const spcCtx = document.getElementById('spcChart');
    if (spcCtx) {
        const data = [98.2, 97.8, 98.5, 98.1, 97.9, 98.3, 98.0, 98.4, 97.7, 98.6, 98.2, 97.8];
        const ucl = 98.8;
        const lcl = 97.2;
        const centerLine = 98.0;
        
        new Chart(spcCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Calidad de Atención (%)',
                    data: data,
                    borderColor: '#1d4ed8',
                    backgroundColor: 'rgba(29, 78, 216, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#1d4ed8',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    tension: 0.1
                }, {
                    label: 'LCS',
                    data: Array(12).fill(ucl),
                    borderColor: '#dc2626',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    fill: false
                }, {
                    label: 'Línea Central',
                    data: Array(12).fill(centerLine),
                    borderColor: '#16a34a',
                    borderWidth: 2,
                    borderDash: [10, 5],
                    pointRadius: 0,
                    fill: false
                }, {
                    label: 'LCI',
                    data: Array(12).fill(lcl),
                    borderColor: '#dc2626',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#1d4ed8',
                        borderWidth: 1,
                        cornerRadius: 8,
                        filter: function(tooltipItem) {
                            return tooltipItem.datasetIndex === 0;
                        },
                        callbacks: {
                            label: function(context) {
                                return 'Calidad: ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        min: 96.5,
                        max: 99.5,
                        grid: {
                            color: '#f1f5f9'
                        },
                        border: {
                            display: false
                        },
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