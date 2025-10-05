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
    initDashboardCharts();
});

function initDashboardCharts() {
    // Datos de ingresos (simplificado de tu archivo React)
    const revenueData = {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        datasets: [{
            label: 'Ingresos (M)',
            data: [1580, 1850, 2260, 2890, 4080],
            borderColor: '#1e40af',
            backgroundColor: 'rgba(30, 64, 175, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };

    // Datos de Pareto
    const paretoData = {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        datasets: [{
            label: 'Valor',
            data: [340, 260, 180, 120, 90, 60],
            backgroundColor: [
                '#1e40af',
                '#2563eb',
                '#3b82f6',
                '#60a5fa',
                '#93c5fd',
                '#dbeafe'
            ],
            borderColor: '#1e3a8a',
            borderWidth: 1
        }]
    };

    // Configuración común
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#f1f5f9'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    // Crear gráfico de ingresos
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: revenueData,
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    title: {
                        display: false
                    }
                }
            }
        });
    }

    // Crear gráfico de Pareto
    const paretoCtx = document.getElementById('paretoChart');
    if (paretoCtx) {
        new Chart(paretoCtx, {
            type: 'bar',
            data: paretoData,
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    title: {
                        display: false
                    }
                }
            }
        });
    }
}