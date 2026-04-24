// ========== PRELOADER ==========
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    }
});

// ========== PARTICLE BACKGROUND ==========
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.2,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3
            });
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(96, 84, 67, ${p.alpha})`;
            ctx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        }
        requestAnimationFrame(animateParticles);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    resizeCanvas();
    initParticles();
    animateParticles();
}

// ========== CLOCK ==========
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const clockEl = document.getElementById('clock');
    const dateEl = document.getElementById('date');
    if (clockEl) clockEl.textContent = `${hours} : ${minutes} : ${seconds}`;
    if (dateEl) dateEl.textContent = now.toDateString();
}
setInterval(updateClock, 1000);
updateClock();

// ========== TYPED TEXT ==========
const phrases = ['Engenheiro Multimédia 🎨', 'FullStack Developer 💻', '3D Artist 🎬', 'Video Editor ✂️'];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');
function typeEffect() {
    if (!typedEl) return;
    const current = phrases[phraseIndex];
    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

// ========== MOBILE MENU ==========
const toggler = document.getElementById('navToggler');
const menu = document.getElementById('navMenu');
if (toggler && menu) {
    toggler.style.display = window.innerWidth <= 992 ? 'block' : 'none';
    toggler.addEventListener('click', () => menu.classList.toggle('show'));
    window.addEventListener('resize', () => {
        toggler.style.display = window.innerWidth <= 992 ? 'block' : 'none';
        if (window.innerWidth > 992) menu.classList.remove('show');
    });
}

// ========== PROGRESS BARS ==========
function animateProgress() {
    document.querySelectorAll('.progress').forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !bar.style.width) {
            const width = bar.getAttribute('data-width') || '0';
            bar.style.width = width + '%';
        }
    });
}
window.addEventListener('scroll', animateProgress);
window.addEventListener('load', animateProgress);

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ========== REVEAL ANIMATIONS ON SCROLL ==========
const revealElements = document.querySelectorAll('.info-card, .project-card, .award-category, .timeline-content');
function revealOnScroll() {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('revealed');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========== MEDIA GALLERY (IMAGENS E VÍDEOS) ==========

// ===== CONFIGURAÇÃO FÁCIL - EDITA AQUI OS TEUS FICHEIROS =====

// Lista de Imagens (adiciona as tuas imagens aqui)
const images = [
    { src: "assets/imagem1.jpg", title: "Trabalho 3D", category: "3d" },
    { src: "assets/imagem2.jpg", title: "Design Gráfico", category: "design" },
    { src: "assets/imagem3.jpg", title: "Modelo Blender", category: "3d" },
    { src: "assets/imagem4.jpg", title: "Edição de Vídeo", category: "video" },
    // ADICIONA MAIS IMAGENS AQUI:
    // { src: "assets/nova-imagem.jpg", title: "Título da imagem", category: "3d" },
];

// Lista de Vídeos (adiciona os teus vídeos aqui)
const videos = [
    { 
        src: "assets/proj1.mp4", 
         thumbnail: "assets/teste.jpg",
         title: "Título do Vídeo", 
         description: "Descrição curta",
        category: "video"
    },
    { 
        src: "assets/video2.mp4", 
        thumbnail: "assets/thumb2.jpg",
        title: "Projeto Multimedia", 
        description: "Edição After Effects",
        category: "video"
    },
    // ADICIONA MAIS VÍDEOS AQUI:
    { 
        src: "assets/video3.mp4", 
        thumbnail: "assets/thumb2.jpg",
        title: "Projeto Multimedia", 
        description: "Edição After Effects",
        category: "video"
     },
];

// ===== NÃO EDITES PARA BAIXO (a não ser que saibas o que fazes) =====

const imageGallery = document.getElementById('imageGallery');
const videoGallery = document.getElementById('videoGallery');

// Styles adicionais para a galeria (adicionados dinamicamente)
const galleryStyles = `
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
    }
    .gallery-item {
        position: relative;
        background: rgba(26, 26, 46, 0.6);
        border-radius: 15px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.4s ease;
        border: 1px solid rgba(96, 84, 67, 0.2);
        aspect-ratio: 1 / 1;
    }
    .gallery-item:hover {
        transform: translateY(-8px);
        border-color: #605443;
    }
    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
    }
    .gallery-item:hover img {
        transform: scale(1.05);
    }
    .gallery-overlay {
        position: absolute;
        bottom: -100%;
        left: 0;
        right: 0;
        background: linear-gradient(0deg, rgba(0,0,0,0.8), transparent);
        padding: 1rem;
        transition: bottom 0.3s;
    }
    .gallery-item:hover .gallery-overlay {
        bottom: 0;
    }
    .gallery-overlay p {
        color: white;
        margin: 0;
        font-size: 0.8rem;
    }
    .video-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
    }
    .video-card {
        background: rgba(26, 26, 46, 0.6);
        border-radius: 15px;
        overflow: hidden;
        transition: all 0.4s ease;
        border: 1px solid rgba(96, 84, 67, 0.2);
        cursor: pointer;
    }
    .video-card:hover {
        transform: translateY(-8px);
        border-color: #605443;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    .video-thumbnail {
        position: relative;
        width: 100%;
        aspect-ratio: 16/9;
        background: #1a1a2e;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .video-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
    }
    .video-card:hover .video-thumbnail img {
        transform: scale(1.05);
    }
    .play-button {
        position: absolute;
        width: 60px;
        height: 60px;
        background: rgba(96, 84, 67, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
    }
    .play-button i {
        font-size: 1.8rem;
        color: white;
        margin-left: 5px;
    }
    .video-card:hover .play-button {
        transform: scale(1.1);
        background: #605443;
    }
    .video-info {
        padding: 1rem;
    }
    .video-info h4 {
        font-size: 0.9rem;
        margin-bottom: 0.3rem;
    }
    .video-info p {
        font-size: 0.7rem;
        color: #aaa;
    }
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
    }
    .lightbox.active {
        opacity: 1;
        visibility: visible;
    }
    .lightbox-content {
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    }
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
    }
    .lightbox-close {
        position: absolute;
        top: 20px;
        right: 40px;
        font-size: 40px;
        color: white;
        cursor: pointer;
    }
    .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
    }
    .video-modal.active {
        opacity: 1;
        visibility: visible;
    }
    .video-modal-content {
        width: 90%;
        max-width: 900px;
        position: relative;
    }
    .video-modal-content video {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }
    .video-modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 30px;
        color: white;
        cursor: pointer;
    }
    .no-content {
        text-align: center;
        padding: 3rem;
        color: #aaa;
        grid-column: 1 / -1;
    }
    @media (max-width: 768px) {
        .video-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = galleryStyles;
document.head.appendChild(styleSheet);

// Renderizar imagens
function renderImages(filter = 'all') {
    if (!imageGallery) return;
    imageGallery.innerHTML = '';
    let filtered = images;
    if (filter !== 'all' && filter !== 'video') {
        filtered = images.filter(img => img.category === filter);
    }
    
    if (filtered.length === 0) {
        imageGallery.innerHTML = '<div class="no-content">📷 Nenhuma imagem encontrada nesta categoria</div>';
        return;
    }
    
    filtered.forEach((img, idx) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animation = `fadeInUp 0.4s ease forwards`;
        item.style.animationDelay = `${idx * 0.05}s`;
        item.innerHTML = `
            <img src="${img.src}" alt="${img.title}" onerror="this.src='https://placehold.co/400x300/1a1a2e/605443?text=Imagem+Não+Encontrada'">
            <div class="gallery-overlay"><p>${img.title}</p></div>
        `;
        item.addEventListener('click', () => openLightbox(img.src, img.title));
        imageGallery.appendChild(item);
    });
}

// Renderizar vídeos
function renderVideos(filter = 'all') {
    if (!videoGallery) return;
    videoGallery.innerHTML = '';
    let filtered = videos;
    if (filter !== 'all') {
        filtered = videos.filter(vid => vid.category === filter);
    }
    
    if (filtered.length === 0) {
        videoGallery.innerHTML = '<div class="no-content">🎬 Nenhum vídeo encontrado nesta categoria</div>';
        return;
    }
    
    filtered.forEach((vid, idx) => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.style.animation = `fadeInUp 0.4s ease forwards`;
        card.style.animationDelay = `${idx * 0.05}s`;
        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="${vid.thumbnail || 'https://placehold.co/640x360/1a1a2e/605443?text=Vídeo'}" alt="${vid.title}">
                <div class="play-button">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="video-info">
                <h4>${vid.title}</h4>
                <p>${vid.description || ''}</p>
            </div>
        `;
        card.addEventListener('click', () => openVideoModal(vid.src, vid.title));
        videoGallery.appendChild(card);
    });
}

// Lightbox para imagens
function openLightbox(src, title) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${src}" alt="${title}">
            <p style="margin-top: 1rem;">${title}</p>
        </div>
    `;
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => lightbox.classList.add('active'), 10);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    });
}

// Modal para vídeos
function openVideoModal(src, title) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <span class="video-modal-close">&times;</span>
            <video controls autoplay>
                <source src="${src}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <p style="margin-top: 1rem; text-align: center;">${title}</p>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => modal.classList.add('active'), 10);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('video-modal-close')) {
            const video = modal.querySelector('video');
            if (video) video.pause();
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    });
}

// Controlo dos filtros
let currentFilter = 'all';

function updateGallery() {
    if (!imageGallery || !videoGallery) return;
    
    if (currentFilter === 'video') {
        imageGallery.style.display = 'none';
        videoGallery.style.display = 'grid';
        renderVideos('video');
    } else {
        imageGallery.style.display = 'grid';
        videoGallery.style.display = 'none';
        renderImages(currentFilter);
    }
}

// Event listeners dos filtros
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            updateGallery();
        });
    });
}

// Inicializar galeria
if (imageGallery && videoGallery) {
    updateGallery();
}

// ========== FIM ==========
console.log('Portfolio carregado com sucesso!');
