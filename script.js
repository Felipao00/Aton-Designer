// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    // Simular progresso do loader
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        loaderProgress.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 300);
        }
    }, 20);
});

// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Efeitos de hover no cursor
const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .team-member, .social-links a');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.borderColor = 'var(--accent-color)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.borderColor = 'rgba(255, 62, 127, 0.5)';
    });
});

// Menu mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    
    // Animar as barras do menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Ativar link da navegação conforme scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Animar elementos ao aparecer na tela
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Elementos para animar
const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat, .team-member, .contact-item');

animateElements.forEach(element => {
    observer.observe(element);
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aqui normalmente enviaríamos os dados para um backend
    // Para este exemplo, apenas simularemos o envio
    
    const submitBtn = contactForm.querySelector('button');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simular envio
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem enviada!';
        submitBtn.style.background = 'linear-gradient(135deg, #00b09b, #96c93d)';
        
        // Resetar formulário
        contactForm.reset();
        
        // Restaurar botão após 3 segundos
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }, 2000);
});

// Efeito de digitação no hero
const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle.textContent;
const words = originalText.split(' ');

heroTitle.innerHTML = '';

words.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word + ' ';
    
    if (word === 'IMPACTA') {
        span.className = 'gradient-text';
    }
    
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    
    heroTitle.appendChild(span);
    
    // Animar cada palavra
    setTimeout(() => {
        span.style.transition = 'opacity 0.5s, transform 0.5s';
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
    }, index * 100);
});

// Adicionar animação às formas flutuantes
const shapes = document.querySelectorAll('.shape');

shapes.forEach((shape, index) => {
    // Posição inicial aleatória
    const randomX = Math.random() * 20 - 10;
    const randomY = Math.random() * 20 - 10;
    
    shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Animação flutuante
    setInterval(() => {
        const newX = Math.random() * 40 - 20;
        const newY = Math.random() * 40 - 20;
        
        shape.style.transition = 'transform 3s ease-in-out';
        shape.style.transform = `translate(${newX}px, ${newY}px)`;
    }, 3000 + index * 1000);
});

// Atualizar ano no copyright
const copyright = document.querySelector('.copyright');
if (copyright) {
    const currentYear = new Date().getFullYear();
    copyright.textContent = copyright.textContent.replace('2023', currentYear);
}