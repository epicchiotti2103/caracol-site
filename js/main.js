// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initNavigation();
    initScrollAnimations();
    initFormValidation();
    initSmoothScrolling();
    initScrollEffects();
    initFloatingCards();
});

// Navegação Mobile
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Smooth Scrolling para links internos
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Considerando altura do header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animações on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animatedElements = document.querySelectorAll(`
        .diferencial-card,
        .case-card,
        .publico-card,
        .processo-step,
        .service-card,
        .section-header
    `);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Efeitos de scroll no navbar
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        // Navbar background opacity
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }

        // Hide/Show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Animação dos floating cards
function initFloatingCards() {
    const cards = document.querySelectorAll('.card-floating');
    
    cards.forEach((card, index) => {
        // Adicionar movimento de mouse para paralaxe
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Validação e envio do formulário
function initFormValidation() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const isValid = validateForm();
            
            if (isValid) {
                submitForm();
            }
        });
    }
}

function validateForm() {
    const requiredFields = document.querySelectorAll('#contact-form [required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        const errorElement = field.parentNode.querySelector('.error-message');
        
        // Remover erro anterior
        if (errorElement) {
            errorElement.remove();
        }
        
        field.classList.remove('error');
        
        // Validar campo
        if (!value) {
            showFieldError(field, 'Este campo é obrigatório');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(value)) {
            showFieldError(field, 'Por favor, insira um e-mail válido');
            isValid = false;
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff4444';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.style.display = 'block';
    
    field.parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm() {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Mostrar loading
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Simular envio (aqui você integraria com um backend real)
    setTimeout(() => {
        showSuccessMessage();
        resetForm();
        
        // Restaurar botão
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function showSuccessMessage() {
    // Criar modal de sucesso
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <i class="fas fa-check-circle"></i>
                <h3>Mensagem Enviada!</h3>
            </div>
            <p>Obrigado pelo seu interesse! Nossa equipe entrará em contato em breve.</p>
            <button onclick="closeModal()" class="btn btn-primary">
                <i class="fas fa-times"></i>
                Fechar
            </button>
        </div>
    `;
    
    // Estilos do modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: var(--medium-gray);
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 0 1rem;
        border: 1px solid var(--primary-orange);
    `;
    
    document.body.appendChild(modal);
    
    // Fechar modal automaticamente após 5 segundos
    setTimeout(() => {
        if (document.body.contains(modal)) {
            closeModal();
        }
    }, 5000);
}

function closeModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function resetForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.reset();
        
        // Remover classes de erro
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
        
        // Remover mensagens de erro
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(message => {
            message.remove();
        });
    }
}

// Função para download de case study
function downloadCaseStudy() {
    // Criar conteúdo do case study
    const caseContent = `
CARACOL MEDIA - CASE STUDY
=========================

Casos de Sucesso Comprovados
----------------------------

1. FINTECH - CARTÕES DE CRÉDITO
   • Desafio: Escalar aprovações de cartão com segmentação por renda
   • Solução: Campanhas em canais não convencionais com payouts diferenciados
   • Resultado: Crescimento de 340% em aprovações mensais

2. BANCO DIGITAL - AQUISIÇÃO DE USUÁRIOS
   • Desafio: User acquisition + reengagement simultâneos
   • Solução: Tecnologia proprietária para tracking de jornada completa
   • Resultado: Cliente há 2+ anos com crescimento consistente

3. JOB TECH - RECRUTAMENTO PROGRAMÁTICO
   • Desafio: Campanhas de recrutamento em múltiplos países
   • Solução: Tecnologia Talent.com + expertise local
   • Resultado: CPH 60% abaixo da média do mercado

Nossos Diferenciais
------------------
✓ Tecnologia Proprietária de Tracking
✓ Canais Não Convencionais
✓ Expertise América Latina
✓ Parceria Estratégica

Entre em contato para saber mais:
contato@caracolmedia.com
`;

    // Criar e baixar arquivo
    const blob = new Blob([caseContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'caracol-media-case-study.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Mostrar feedback
    showDownloadFeedback();
}

function showDownloadFeedback() {
    const feedback = document.createElement('div');
    feedback.innerHTML = `
        <i class="fas fa-download"></i>
        Case Study baixado com sucesso!
    `;
    feedback.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--primary-orange);
        color: var(--base-black);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 30px rgba(255, 139, 0, 0.3);
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(feedback)) {
                document.body.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// Adicionar estilos para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideInRight {
        from { 
            transform: translateX(100%);
            opacity: 0;
        }
        to { 
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from { 
            transform: translateX(0);
            opacity: 1;
        }
        to { 
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .success-modal .modal-header {
        margin-bottom: 1rem;
    }
    
    .success-modal .modal-header i {
        color: var(--secondary-lime);
        font-size: 3rem;
        margin-bottom: 0.5rem;
    }
    
    .success-modal .modal-header h3 {
        color: var(--primary-orange);
        margin: 0;
    }
    
    .success-modal p {
        color: var(--text-gray);
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
    
    .form-group .error {
        border-color: #ff4444 !important;
        box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.1) !important;
    }
    
    .navbar {
        transition: transform 0.3s ease, background 0.3s ease;
    }
`;

document.head.appendChild(style);

// Melhorar performance com debounce para scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce ao scroll
const debouncedScrollHandler = debounce(initScrollEffects, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// Preloader simples
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animar entrada do hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.animation = 'fadeInUp 1s ease-out';
        }, 100);
    }
});

// Adicionar efeito parallax suave nos elementos
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-background, .latam-visual img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const rate = scrolled * -0.5;
            el.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Inicializar parallax
initParallax();

// Contador animado para estatísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Inicializar contadores
animateCounters();

console.log('🚀 Caracol Media - Site carregado com sucesso!');
