// ============================================
// ATON DESIGNER - JAVASCRIPT COMPLETO
// Sistema de tema, animações e funcionalidades
// ============================================

// Elementos DOM principais
const DOM = {
    themeToggle: document.getElementById('themeToggle'),
    menuToggle: document.getElementById('menuToggle'),
    navMenu: document.getElementById('navMenu'),
    heroStats: document.getElementById('heroStats'),
    contactForm: document.getElementById('contactForm'),
    portfolioModal: document.getElementById('portfolioModal'),
    confirmationModal: document.getElementById('confirmationModal'),
    themeIndicator: document.getElementById('themeIndicator')
};

// Estado da aplicação
const AppState = {
    currentTheme: localStorage.getItem('theme') || 'dark',
    currentProject: 0,
    projects: [
        {
            id: 1,
            title: 'TechStart Branding',
            client: 'TechStart Solutions',
            description: 'Identidade visual completa para startup de tecnologia, incluindo logo, paleta de cores, tipografia e manual da marca.',
            tags: ['Branding', 'Logo Design', 'Identidade Visual'],
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            title: 'FinPlan App',
            client: 'FinPlan Finance',
            description: 'UI/UX Design para aplicativo mobile de controle financeiro, com foco em usabilidade e experiência do usuário.',
            tags: ['UI/UX Design', 'Mobile App', 'Prototipagem'],
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 3,
            title: 'EcoLiving Material',
            client: 'EcoLiving Sustentável',
            description: 'Design gráfico completo para empresa de produtos sustentáveis, incluindo material impresso e digital.',
            tags: ['Design Gráfico', 'Material Impresso', 'Social Media'],
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 4,
            title: 'Motion Graphics',
            client: 'Vídeo Corporativo',
            description: 'Animação e motion graphics para vídeos explicativos e conteúdo de redes sociais.',
            tags: ['Motion Design', 'Animação', 'Vídeo'],
            image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ]
};

// ===== SISTEMA DE TEMA =====
function initTheme() {
    // Aplicar tema salvo
    document.documentElement.setAttribute('data-theme', AppState.currentTheme);
    updateThemeIndicator();
    
    // Toggle de tema
    DOM.themeToggle.addEventListener('click', toggleTheme);
    
    // Salvar preferência de tema
    DOM.themeToggle.addEventListener('click', () => {
        localStorage.setItem('theme', AppState.currentTheme);
    });
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Transição suave
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Aplicar novo tema
    document.documentElement.setAttribute('data-theme', newTheme);
    AppState.currentTheme = newTheme;
    
    // Atualizar indicador
    updateThemeIndicator();
    
    // Restaurar transição
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 300);
}

function updateThemeIndicator() {
    if (DOM.themeIndicator) {
        const themeName = AppState.currentTheme === 'dark' ? 'Escuro' : 'Claro';
        DOM.themeIndicator.textContent = `Tema: ${themeName}`;
    }
}

// ===== MENU MOBILE =====
function initMenu() {
    DOM.menuToggle.addEventListener('click', () => {
        DOM.navMenu.classList.toggle('active');
        const icon = DOM.menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        
        // Animar botão
        DOM.menuToggle.style.transform = DOM.navMenu.classList.contains('active') 
            ? 'rotate(90deg)' 
            : 'rotate(0deg)';
    });
    
    // Fechar menu ao clicar em links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            DOM.navMenu.classList.remove('active');
            DOM.menuToggle.querySelector('i').classList.remove('fa-times');
            DOM.menuToggle.querySelector('i').classList.add('fa-bars');
            DOM.menuToggle.style.transform = 'rotate(0deg)';
        });
    });
}

// ===== ANIMAÇÕES DE CONTADOR =====
function initCounters() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatistics();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (DOM.heroStats) {
        observer.observe(DOM.heroStats);
    }
}

function animateStatistics() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.textContent.includes('%') ? '%' : '';
        const plusSign = counter.textContent.includes('+') ? '+' : '';
        
        let count = 0;
        const increment = target / 60; // 60 frames em 2 segundos
        const duration = 2000; // 2 segundos
        
        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.floor(count) + suffix + plusSign;
                setTimeout(updateCounter, duration / 60);
            } else {
                counter.textContent = target + suffix + plusSign;
            }
        };
        
        updateCounter();
    });
}

// ===== ANIMAÇÕES AO SCROLL =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .process-step, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ===== FORMULÁRIO DE CONTATO =====
function initContactForm() {
    if (!DOM.contactForm) return;
    
    DOM.contactForm.addEventListener('submit', handleFormSubmit);
    
    // Efeitos nos inputs
    const formInputs = DOM.contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        date: new Date().toISOString()
    };
    
    // Validar dados
    if (!validateFormData(formData)) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Simular envio (em produção, enviaria para um servidor)
    simulateFormSubmission(formData);
}

function validateFormData(data) {
    return data.name && data.email && data.phone && data.service;
}

function simulateFormSubmission(data) {
    // Mostrar loading
    const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
    submitBtn.disabled = true;
    
    // Simular delay de rede
    setTimeout(() => {
        // Resetar botão
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Mostrar modal de confirmação
        showConfirmationModal(data.service);
        
        // Resetar formulário
        DOM.contactForm.reset();
        
        // Enviar para Google Analytics (simulado)
        console.log('Form submitted:', data);
        
        // Mostrar notificação
        showNotification('Solicitação enviada com sucesso! Em breve entrarei em contato.', 'success');
    }, 1500);
}

// ===== MODAIS =====
function initModals() {
    // Modal de portfólio
    const portfolioButtons = document.querySelectorAll('[data-view]');
    portfolioButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            AppState.currentProject = index;
            openPortfolioModal(index);
        });
    });
    
    // Botões de navegação do modal
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const modalClose = document.getElementById('modalClose');
    
    if (modalPrev) modalPrev.addEventListener('click', showPrevProject);
    if (modalNext) modalNext.addEventListener('click', showNextProject);
    if (modalClose) modalClose.addEventListener('click', closePortfolioModal);
    
    // Modal de confirmação
    const confirmClose = document.getElementById('confirmClose');
    const confirmOk = document.getElementById('confirmOk');
    
    if (confirmClose) confirmClose.addEventListener('click', closeConfirmationModal);
    if (confirmOk) confirmOk.addEventListener('click', closeConfirmationModal);
    
    // Fechar modais ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closePortfolioModal();
            closeConfirmationModal();
        }
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePortfolioModal();
            closeConfirmationModal();
        }
    });
}

function openPortfolioModal(index) {
    const project = AppState.projects[index];
    if (!project) return;
    
    // Atualizar conteúdo do modal
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalClient').textContent = `Cliente: ${project.client}`;
    document.getElementById('modalDescription').textContent = project.description;
    
    const modalImage = document.getElementById('modalImage');
    modalImage.innerHTML = `<img src="${project.image}" alt="${project.title}" style="width:100%;border-radius:10px;">`;
    
    const modalTags = document.getElementById('modalTags');
    modalTags.innerHTML = project.tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
    
    // Mostrar modal
    DOM.portfolioModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePortfolioModal() {
    DOM.portfolioModal.classList.remove('active');
    document.body.style.overflow = '';
}

function showNextProject() {
    AppState.currentProject = (AppState.currentProject + 1) % AppState.projects.length;
    openPortfolioModal(AppState.currentProject);
}

function showPrevProject() {
    AppState.currentProject = (AppState.currentProject - 1 + AppState.projects.length) % AppState.projects.length;
    openPortfolioModal(AppState.currentProject);
}

function showConfirmationModal(service) {
    const serviceNames = {
        'branding': 'Identidade Visual',
        'graphic': 'Design Gráfico',
        'uiux': 'UI/UX Design',
        'motion': 'Motion Design',
        'multiple': 'Vários Serviços'
    };
    
    const serviceName = serviceNames[service] || service;
    document.getElementById('modalService').innerHTML = `
        <p><strong>Serviço selecionado:</strong> ${serviceName}</p>
        <p><em>Obrigado pelo seu interesse!</em></p>
    `;
    
    DOM.confirmationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeConfirmationModal() {
    DOM.confirmationModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; // Altura do header
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
/*function initNavbarScroll() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Esconder/mostrar navbar
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Adicionar sombra quando scrolar
        if (scrollTop > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}*/

// ===== NOTIFICAÇÕES =====
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#06D6A0' : '#EF476F'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        min-width: 300px;
        max-width: 400px;
        transform: translateX(150%);
        transition: transform 0.3s ease;
    `;
    
    // Adicionar ao body
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Botão de fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// ===== BOTÕES DE SERVIÇO =====
function initServiceButtons() {
    const serviceButtons = document.querySelectorAll('[data-service]');
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const service = btn.getAttribute('data-service');
            const serviceName = getServiceName(service);
            
            // Preencher formulário automaticamente
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                serviceSelect.value = service;
            }
            
            // Rolar para o formulário
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Mostrar feedback
            showNotification(`Serviço "${serviceName}" selecionado! Preencha os outros dados.`, 'info');
        });
    });
}

function getServiceName(serviceKey) {
    const services = {
        'branding': 'Identidade Visual',
        'graphic': 'Design Gráfico',
        'uiux': 'UI/UX Design',
        'motion': 'Motion Design'
    };
    
    return services[serviceKey] || serviceKey;
}

// ===== LOADING INICIAL =====
function initLoading() {
    // Criar tela de loading
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loader"></div>';
    
    // Adicionar ao body
    document.body.appendChild(loadingScreen);
    
    // Remover após carregar
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                if (document.body.contains(loadingScreen)) {
                    document.body.removeChild(loadingScreen);
                }
            }, 300);
        }, 1000);
    });
}

// ===== INICIALIZAÇÃO DA APLICAÇÃO =====
function initApp() {
    // Inicializar componentes
    initTheme();
    initMenu();
    initCounters();
    initScrollAnimations();
    initContactForm();
    initModals();
    initSmoothScroll();
    initNavbarScroll();
    initServiceButtons();
    initLoading();
    
    // Atualizar ano do copyright
    const yearElement = document.querySelector('footer p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
    
    // Log de inicialização
    console.log('🚀 Aton Designer - Site iniciado com sucesso!');
    console.log(`🎨 Tema atual: ${AppState.currentTheme}`);
    console.log(`📂 ${AppState.projects.length} projetos no portfólio`);
}

// Iniciar aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initApp);

// ===== FUNÇÕES UTILITÁRIAS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Exportar para uso global (se necessário)
window.AtonDesigner = {
    toggleTheme,
    showNotification,
    openPortfolioModal,
    closePortfolioModal
};

// ============================================
// SISTEMA DE ANIMAÇÕES DE SCROLL APRIMORADO
// ============================================

// Configuração das animações
const AnimationConfig = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    staggerDelay: 100, // ms entre elementos
    enableOnce: true
};

// Tipos de animação disponíveis
const AnimationTypes = {
    FADE_UP: 'fade-in-element',
    FADE_LEFT: 'fade-in-left',
    FADE_RIGHT: 'fade-in-right',
    FADE_SCALE: 'fade-in-scale',
    FADE_ROTATE: 'fade-in-rotate'
};

// Inicializar sistema de animações
function initEnhancedAnimations() {
    // Configurar animações específicas por seção
    configureHeroAnimations();
    configureServicesAnimations();
    configurePortfolioAnimations();
    configureProcessAnimations();
    configureTestimonialsAnimations();
    configureContactAnimations();
    
    // Observer para animações genéricas
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: AnimationConfig.threshold,
        rootMargin: AnimationConfig.rootMargin
    });
    
    // Observar todos os elementos com classe de animação
    document.querySelectorAll('[class*="fade-in-"]').forEach(el => {
        observer.observe(el);
    });
}

// Configurar animações da seção Hero
function configureHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-content > *');
    
    heroElements.forEach((el, index) => {
        // Adicionar classes de animação com delay escalonado
        el.classList.add('fade-in-element');
        el.classList.add(`stagger-delay-${index + 1}`);
        
        // Efeito especial para o título
        if (el.classList.contains('hero-title')) {
            el.classList.add('reveal-text');
        }
        
        // Efeito especial para stats
        if (el.classList.contains('hero-stats')) {
            el.querySelectorAll('.stat-item').forEach((stat, statIndex) => {
                stat.classList.add('fade-in-up');
                stat.classList.add(`stagger-delay-${statIndex + 2}`);
            });
        }
    });
    
    // Animar os design items com efeito flutuante
    const designItems = document.querySelectorAll('.design-item');
    designItems.forEach((item, index) => {
        item.classList.add('fade-in-scale');
        item.style.transitionDelay = `${index * 0.2}s`;
    });
}

// Configurar animações da seção Serviços
function configureServicesAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.classList.add('animated-border');
        card.style.transitionDelay = `${index * 0.15}s`;
        
        // Animar elementos internos com delay
        const innerElements = card.querySelectorAll('h3, p, ul, .service-footer');
        innerElements.forEach((el, elIndex) => {
            el.classList.add('fade-in-element');
            el.style.transitionDelay = `${(index * 0.15) + (elIndex * 0.1)}s`;
        });
    });
}

// Configurar animações da seção Portfólio
function configurePortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        // Animar alternando direções para efeito mais dinâmico
        if (index % 2 === 0) {
            item.classList.add('fade-in-left');
        } else {
            item.classList.add('fade-in-right');
        }
        
        item.style.transitionDelay = `${index * 0.2}s`;
        
        // Animar overlay
        const overlay = item.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.classList.add('fade-in-up');
            overlay.style.transitionDelay = `${(index * 0.2) + 0.3}s`;
        }
    });
}

// Configurar animações da seção Processo
function configureProcessAnimations() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        step.classList.add('fade-in-left');
        step.style.transitionDelay = `${index * 0.25}s`;
        
        // Animar número do passo com efeito especial
        const stepNumber = step.querySelector('.step-number');
        if (stepNumber) {
            stepNumber.classList.add('fade-in-scale');
            stepNumber.style.transitionDelay = `${index * 0.25}s`;
        }
        
        // Animar conteúdo com delay
        const content = step.querySelector('.step-content');
        if (content) {
            setTimeout(() => {
                content.classList.add('fade-in-element');
            }, 300);
        }
    });
}

// Configurar animações da seção Depoimentos
function configureTestimonialsAnimations() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        card.classList.add('fade-in-rotate');
        card.style.transitionDelay = `${index * 0.15}s`;
    });
}

// Configurar animações da seção Contato
function configureContactAnimations() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.style.transitionDelay = `${index * 0.2}s`;
        
        // Efeito de entrada para elementos internos
        const innerElements = card.querySelectorAll('h3, p, .contact-card-info, .btn');
        innerElements.forEach((el, elIndex) => {
            el.classList.add('fade-in-element');
            el.style.transitionDelay = `${(index * 0.2) + (elIndex * 0.1)}s`;
        });
    });
}

// Handler para observação de interseção
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Adicionar classe visible
            element.classList.add('visible');
            
            // Se for animação de contador, iniciar contagem
            if (element.classList.contains('hero-stats')) {
                // Garantir que a contagem só inicie quando visível
                setTimeout(() => {
                    animateStatistics();
                }, 500);
            }
            
            // Se configurado para observar apenas uma vez
            if (AnimationConfig.enableOnce) {
                observer.unobserve(element);
            }
        }
    });
}

// Função aprimorada para animação dos contadores
function animateStatistics() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        // Reset para garantir animação
        counter.textContent = '0';
        
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.textContent.includes('%') ? '%' : '';
        const plusSign = counter.textContent.includes('+') ? '+' : '';
        
        let count = 0;
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        
        const updateCounter = () => {
            count += increment;
            
            if (count < target) {
                counter.textContent = Math.floor(count) + suffix + plusSign;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix + plusSign;
                // Efeito de pulso ao finalizar
                counter.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    counter.style.transform = 'scale(1)';
                }, 300);
            }
        };
        
        // Delay para sincronizar com animação de entrada
        setTimeout(() => {
            requestAnimationFrame(updateCounter);
        }, 300);
    });
}

// Efeito de digitação para títulos (opcional)
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Iniciar após um delay
    setTimeout(typeWriter, 1000);
}

// ===== INICIALIZAÇÃO DA APLICAÇÃO ATUALIZADA =====
function initApp() {
    // Inicializar componentes básicos
    initTheme();
    initMenu();
    initModals();
    initSmoothScroll();
    initServiceButtons();
    initLoading();
    updateCurrentYear();
    
    // Inicializar sistema de animações aprimorado
    initEnhancedAnimations();
    
    // Efeitos especiais (opcional)
    // initTypewriterEffect();
    
    // Log de inicialização
    console.log('🚀 Aton Designer - Site iniciado com sucesso!');
    console.log(`🎨 Sistema de animações aprimorado ativado`);
}

// Iniciar aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initApp);

// ===== UTILITÁRIOS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}