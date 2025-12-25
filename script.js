// Menu toggle para dispositivos móveis
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    });
});

// Animação do cubo 3D com interação do mouse
const cube = document.getElementById('cube');
let mouseX = 0;
let mouseY = 0;
let cubeX = 0;
let cubeY = 0;

// Seguir movimento do mouse
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
});

// Atualizar rotação do cubo baseado na posição do mouse
function updateCubeRotation() {
    // Suavizar o movimento
    cubeX += (mouseX * 30 - cubeX) * 0.05;
    cubeY += (-mouseY * 30 - cubeY) * 0.05;
    
    // Aplicar rotação
    cube.style.transform = `rotateX(${-15 + cubeY}deg) rotateY(${-15 + cubeX}deg)`;
    
    // Continuar a animação
    requestAnimationFrame(updateCubeRotation);
}

// Iniciar animação do cubo
updateCubeRotation();

// Efeito de digitação no título
const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle.innerHTML;

function typeWriterEffect() {
    // Reset para efeito de digitação (opcional)
    // Para implementar um efeito de digitação real, seria necessário um texto diferente
    // Aqui apenas adicionamos uma classe para um efeito sutil
    heroTitle.classList.add('typing-effect');
    
    // Remover após a animação
    setTimeout(() => {
        heroTitle.classList.remove('typing-effect');
    }, 2000);
}

// Iniciar efeito após um tempo
setTimeout(typeWriterEffect, 1000);

// Formulário de contato
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Coletar dados do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Aqui normalmente enviaríamos os dados para um servidor
    // Para demonstração, apenas mostraremos um alerta
    alert(`Obrigado, ${name}! Sua proposta para ${service} foi recebida. Em até 24h úteis entrarei em contato para discutirmos seu projeto.`);
    
    // Resetar formulário
    contactForm.reset();
    
    // Efeito visual de confirmação
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalTextBtn = submitBtn.textContent;
    
    submitBtn.textContent = 'Proposta Enviada!';
    submitBtn.style.backgroundColor = '#00D4AA';
    
    setTimeout(() => {
        submitBtn.textContent = originalTextBtn;
        submitBtn.style.backgroundColor = '';
    }, 3000);
});

// Efeito de rolagem suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efeito de brilho nos cards de plano ao passar o mouse
document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Animar elementos ao rolar a página
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Efeito específico para cards de plano
            if (entry.target.classList.contains('plan-card')) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.service-card, .plan-card, .info-item, .about-stats .stat').forEach(el => {
    // Configurar estado inicial para planos
    if (el.classList.contains('plan-card')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }
    
    observer.observe(el);
});

// Navbar com efeito de scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Esconder/mostrar navbar ao rolar
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Rolando para baixo
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Rolando para cima
        navbar.style.transform = 'translateY(0)';
    }
    
    // Adicionar efeito de transparência quando no topo
    if (scrollTop > 50) {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
    }
    
    lastScrollTop = scrollTop;
});

// Efeito de partículas para as luzes de fundo (opcional)
function createParticles() {
    const container = document.querySelector('.light-effects');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posição aleatória
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Tamanho aleatório
        const size = Math.random() * 4 + 1;
        
        // Cor aleatória entre as cores do tema
        const colors = ['#8A6FFF', '#FF6B9D', '#00D4AA'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Aplicar estilos
        particle.style.position = 'absolute';
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0.3';
        particle.style.filter = 'blur(1px)';
        
        // Animação
        const duration = Math.random() * 10 + 10;
        particle.style.animation = `floatParticle ${duration}s infinite linear`;
        
        container.appendChild(particle);
    }
}

// Criar partículas quando a página carregar
window.addEventListener('load', () => {
    createParticles();
    
    // Iniciar efeito de digitação
    typeWriterEffect();
});

// Adicionar CSS para animação de partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
        }
        50% {
            transform: translateY(-40px) translateX(-10px);
            opacity: 0.3;
        }
        75% {
            transform: translateY(-20px) translateX(-5px);
            opacity: 0.5;
        }
        100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
        }
    }
`;
document.head.appendChild(style);