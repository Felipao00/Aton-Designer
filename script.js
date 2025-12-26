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

function initApp() {
    // Inicializar componentes
    initTheme();
    initMenu();
    initScrollAnimations(); // Deve vir antes de checkInitialAnimations
    initContactForm();
    initModals();
    initSmoothScroll();
    initNavbarScroll();
    initServiceButtons();
    initLoading();
    
    // Verificar animações na carga inicial
    setTimeout(checkInitialAnimations, 100);
    
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

// ===== ANIMAÇÕES AO SCROLL REVISADAS =====
function initScrollAnimations() {
    // Configuração do Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Adicionar classe 'visible' quando o elemento entra na viewport
                entry.target.classList.add('visible');
                
                // Se o elemento tiver contador, animá-lo
                if (entry.target.classList.contains('hero-stats')) {
                    setTimeout(() => {
                        animateStatistics();
                    }, 300);
                }
                
                // Se for um card de serviço, adicionar delay progressivo
                if (entry.target.classList.contains('service-card')) {
                    const index = Array.from(
                        entry.target.parentElement.children
                    ).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            } else {
                // Remover classe 'visible' quando sai da viewport (opcional)
                // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);
    
    // Observar todos os elementos com classe de animação
    const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .animate-card, .animate-stat, .animate-process, .animate-from-right'
    );
    
    animatedElements.forEach((el) => observer.observe(el));
    
    // Iniciar alguns elementos como visíveis (hero section)
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.classList.add(`delay-${index}`);
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 100);
    });
}

// Atualizar a função animateStatistics para ser mais suave
function animateStatistics() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach((counter, index) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.textContent.includes('%') ? '%' : '';
        const plusSign = counter.textContent.includes('+') ? '+' : '';
        
        let count = 0;
        const duration = 2000; // 2 segundos
        const steps = 60;
        const increment = target / steps;
        
        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.floor(count) + suffix + plusSign;
                setTimeout(updateCounter, duration / steps);
            } else {
                counter.textContent = target + suffix + plusSign;
            }
        };
        
        // Delay progressivo para cada contador
        setTimeout(updateCounter, index * 300);
    });
}

// Adicionar uma função para verificar animações na carga inicial
function checkInitialAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = (
            rect.top <= window.innerHeight &&
            rect.bottom >= 0
        );
        
        if (isVisible) {
            el.classList.add('visible');
        }
    });
}