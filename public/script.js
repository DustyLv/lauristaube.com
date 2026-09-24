let currentPage = 1;
const projectsPerPage = 4;
// Filled from /api/content (managed in the CMS at /admin).
let projects = [];
let regularProjects = [];
let experience = [];
let education = [];

const email = "lauristaube@gmail.com";
const number = "(+371) 2 867 44 29";
const location = "Valmiera, Latvia";
const website = "lauristaube.com";

const summary = "I am a Unity developer and a 3D artist with quite a few projects under my belt. I specialize in Virtual Reality, but enjoy taking up different types of projects. My passion is to create meaningful interactive applications and games.<br><br>I’m detail-oriented and love taking on problems, so I strive to make the best whenever it’s possible.";

// Escapes plain-text CMS fields for use inside HTML. long_description is HTML on purpose and is not escaped.
function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function mediaUrl(r2Key) {
    return `/api/media/${r2Key.split('/').map(encodeURIComponent).join('/')}`;
}

// --- RESUME GENERATOR LOGIC ---
const RESUME_THEMES = {
    light: { page: 'bg-white text-gray-800', sidebar: 'bg-gray-50', name: 'text-gray-900', heading: 'text-gray-900', body: 'text-gray-700', muted: 'text-gray-600', meta: 'text-gray-500' },
    dark: { page: 'bg-gray-900 text-gray-200', sidebar: 'bg-gray-800', name: 'text-white', heading: 'text-gray-100', body: 'text-gray-300', muted: 'text-gray-400', meta: 'text-gray-400' }
};

function resumeTemplate(t) {
    const sectionTitle = title => `<h2 class="text-2xl font-bold border-b-2 pb-2 mb-4" style="font-family: 'Lora', serif; border-color: var(--accent); color: var(--accent);">${title}</h2>`;
    const sidebarTitle = title => `<h2 class="text-lg font-bold uppercase tracking-wider" style="color: var(--accent);">${title}</h2>`;

    // --- SKILLS ---
    const skills = [...new Set(projects.flatMap(p => p.tags))];
    const skillsHTML = `<div class="flex flex-wrap gap-2">${skills.map(skill => `<span class="border text-xs font-semibold mr-2 px-2.5 py-1 rounded-full" style="color: var(--accent); border-color: var(--accent);">${esc(skill)}</span>`).join('')}</div>`;

    const educationHTML = education.map(e => `
        <div class="mt-4">
            <h3 class="text-md font-bold ${t.heading}">${esc(e.title)}</h3>
            ${e.organization ? `<p class="text-sm ${t.muted}">${esc(e.organization)}</p>` : ''}
            <p class="text-sm ${t.muted}">${esc(e.period)}</p>
        </div>
    `).join('');

    const experienceHTML = experience.map(e => {
        const bullets = e.resume_bullets.length ? e.resume_bullets : [e.description].filter(Boolean);
        return `
        <div class="mb-6">
            <h3 class="text-lg font-bold ${t.heading}">${esc(e.title)}</h3>
            ${e.organization ? `<p class="text-md ${t.meta} italic">${esc(e.organization)}</p>` : ''}
            <p class="text-md ${t.meta} italic">${esc(e.period)}</p>
            <ul class="list-disc list-inside ${t.body} mt-1 text-sm space-y-1">
                ${bullets.map(b => `<li>${esc(b)}</li>`).join('')}
            </ul>
        </div>`;
    }).join('');

    // --- PROJECTS ---
    const projectsHTML = projects.filter(p => !p.is_featured).map(p => `
        <div class="mb-4 break-inside-avoid">
            <h3 class="text-lg font-bold ${t.heading}">${esc(p.title)}</h3>
            <p class="text-sm ${t.muted} italic mb-1">${p.tags.map(esc).join(' · ')}</p>
            <p class="${t.body} text-sm">${esc(p.description)}</p>
        </div>
    `).join('');

    return `
        <div class="${t.page}" style="font-family: 'Inter', sans-serif;">
            <div class="grid grid-cols-3">
                <div class="col-span-1 ${t.sidebar} p-8">
                    <h1 class="text-4xl font-bold ${t.name}" style="font-family: 'Lora', serif;">Lauris Taube</h1>
                    <p class="text-xl mt-2" style="color: var(--accent);">Creative Technologist</p>
                    <div class="mt-10">
                        ${sidebarTitle('Contact')}
                        <div class="mt-4 space-y-2 text-sm ${t.body}">
                            <p>${email}</p>
                            <p>${number}</p>
                            <p>${location}</p>
                            <p>${website}</p>
                        </div>
                    </div>
                    <div class="mt-10">
                        ${sidebarTitle('Skills')}
                        <div class="mt-4">${skillsHTML}</div>
                    </div>
                    <div class="mt-10">
                        ${sidebarTitle('Education')}
                        ${educationHTML}
                    </div>
                </div>
                <div class="col-span-2 p-8">
                    <section>
                        ${sectionTitle('Summary')}
                        <p class="${t.body}">${summary}</p>
                    </section>
                    <section class="mt-8">
                        ${sectionTitle('Professional Experience')}
                        ${experienceHTML}
                    </section>
                    <section class="mt-8">
                        ${sectionTitle('Selected Projects')}
                        ${projectsHTML}
                    </section>
                </div>
            </div>
        </div>
    `;
}

function generateResume() {
    const output = document.getElementById('resume-output');
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    output.innerHTML = resumeTemplate(isDarkMode ? RESUME_THEMES.dark : RESUME_THEMES.light);

    setTimeout(() => {
        window.print();
    }, 200);
}

function getYoutubeEmbedUrl(url) {
    let videoId;
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === "www.youtube.com" || urlObj.hostname === "youtube.com") {
            videoId = urlObj.searchParams.get("v");
        } else if (urlObj.hostname === "youtu.be") {
            videoId = urlObj.pathname.slice(1);
        }
    } catch (e) {
        return null;
    }

    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&enablejsapi=1`;
    }
    return null;
}

document.addEventListener('DOMContentLoaded', () => {

    const generateBtn = document.getElementById('generate-resume-btn');
    if(generateBtn) generateBtn.addEventListener('click', generateResume);

    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursorGlow, {
                duration: 0.6,
                x: e.clientX,
                y: e.clientY,
                ease: 'power2.out'
            });
        });
    }

    async function loadContent() {
        try {
            const response = await fetch('/api/content');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            ({ projects, experience, education } = await response.json());
        } catch (err) {
            console.error('Could not load content', err);
            document.getElementById('projects-grid').innerHTML =
                '<p class="col-span-full text-center text-slate-400">Projects could not be loaded right now. Please try again later.</p>';
            setupRevealText();
            return;
        }

        const featuredProject = projects.find(p => p.is_featured);
        regularProjects = projects.filter(p => !p.is_featured);

        if(featuredProject) {
            renderFeaturedProject(featuredProject);
        }

        renderPaginatedProjects();
        renderTimeline('experience-list', experience);
        renderTimeline('education-list', education);
        setupRevealText();
    }

    function renderTimeline(containerId, entries) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = entries.map((entry, i) => `
            <div class="experience-item ${i < entries.length - 1 ? 'mb-8' : ''} reveal-text">
                <h5 class="text-xl font-medium text-slate-100">${esc(entry.title)}</h5>
                ${entry.organization ? `<p class="text-slate-400 mb-2">${esc(entry.organization)}</p>` : ''}
                <p class="text-slate-400 mb-2">${esc(entry.period)}</p>
                ${entry.description ? `<p>${esc(entry.description)}</p>` : ''}
            </div>
        `).join('');
    }

    function renderFeaturedProject(project) {
        const container = document.getElementById('featured-project-container');
        if (!container || !project) return;
        
        const tagsHTML = project.tags.map(tag => `<span class="tech-tag">${esc(tag)}</span>`).join('');

        container.innerHTML = `
            <div class="spotlight-card rounded-2xl p-8 col-span-1 md:col-span-2" data-project-id="${esc(project.id)}">
                <div class="project-icon">
                    <i data-lucide="${esc(project.icon)}" class="w-8 h-8"></i>
                </div>
                <div>
                    <h4 class="text-3xl font-bold text-white mb-2 project-title">${esc(project.title)}</h4>
                    <p class="mb-4 max-w-xl project-desc">${esc(project.description)}</p>
                    <div class="flex flex-wrap gap-2 project-tags">
                        ${tagsHTML}
                    </div>
                </div>
            </div>
        `;
    }

    function renderPaginatedProjects() {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;

        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        const paginatedItems = regularProjects.slice(startIndex, endIndex);

        let projectsHTML = '';
        paginatedItems.forEach(project => {
            const tagsHTML = project.tags.map(tag => `<span class="tech-tag">${esc(tag)}</span>`).join('');
            projectsHTML += `
                <div class="spotlight-card rounded-2xl p-8" data-project-id="${esc(project.id)}">
                    <div class="project-icon">
                        <i data-lucide="${esc(project.icon)}" class="w-8 h-8"></i>
                    </div>
                    <div>
                        <h4 class="text-2xl font-bold text-white mb-2 project-title">${esc(project.title)}</h4>
                        <p class="mb-4 project-desc">${esc(project.description)}</p>
                        <div class="flex flex-wrap gap-2 project-tags">
                            ${tagsHTML}
                        </div>
                    </div>
                </div>
            `;
        });
        grid.innerHTML = projectsHTML;
        
        setupPaginationControls();
        initializeDynamicFeatures();
    }

    function setupPaginationControls() {
        const controlsContainer = document.getElementById('pagination-controls');
        if (!controlsContainer) return;

        const pageCount = Math.ceil(regularProjects.length / projectsPerPage);
        if (pageCount <= 1) {
            controlsContainer.innerHTML = '';
            return;
        }

        let controlsHTML = `
            <button id="prev-page" class="pagination-btn rounded-lg w-10 h-10 flex items-center justify-center">
                <i data-lucide="arrow-left" class="w-5 h-5"></i>
            </button>
        `;

        for (let i = 1; i <= pageCount; i++) {
            const activeClass = i === currentPage ? 'active' : '';
            controlsHTML += `<button class="pagination-btn rounded-lg w-10 h-10 font-bold ${activeClass}" data-page="${i}">${i}</button>`;
        }
        
        controlsHTML += `
            <button id="next-page" class="pagination-btn rounded-lg w-10 h-10 flex items-center justify-center">
                <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </button>
        `;
        controlsContainer.innerHTML = controlsHTML;

        lucide.createIcons();

        document.getElementById('prev-page').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderPaginatedProjects();
            }
        });

        document.getElementById('next-page').addEventListener('click', () => {
            if (currentPage < pageCount) {
                currentPage++;
                renderPaginatedProjects();
            }
        });

        controlsContainer.querySelectorAll('.pagination-btn[data-page]').forEach(button => {
            button.addEventListener('click', () => {
                const page = parseInt(button.dataset.page);
                currentPage = page;
                renderPaginatedProjects();
            });
        });

        document.getElementById('prev-page').disabled = currentPage === 1;
        document.getElementById('next-page').disabled = currentPage === pageCount;
    }
    
    function initializeDynamicFeatures() {
        lucide.createIcons();

        document.querySelectorAll('.spotlight-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });
        });

        gsap.utils.toArray('.spotlight-card').forEach(card => {
            const cardTl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
            cardTl.from(card, { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' });
        });
    }

    // --- Project Modal Logic ---
    const modalOverlay = document.getElementById('project-modal-overlay');
    const modalCloseBtn = document.getElementById('project-modal-close');
    const modalTitle = document.getElementById('project-modal-title');
    const galleryContentWrapper = document.getElementById('gallery-content-wrapper');
    const modalDesc = document.getElementById('project-modal-long-desc');
    const modalDetails = document.getElementById('project-modal-details');
    const modalTags = document.getElementById('project-modal-tags');
    const modalLinksContainer = document.getElementById('project-modal-links-container');
    const modalLinks = document.getElementById('project-modal-links');
    const galleryPrevBtn = document.getElementById('gallery-prev');
    const galleryNextBtn = document.getElementById('gallery-next');
    
    // --- Lightbox Logic ---
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCloseBtn = document.getElementById('lightbox-close');

    let currentImageIndex = 0;
    let galleryItems = [];

    // --- NEW --- Function to pause all media
    function pauseAllMedia() {
        galleryContentWrapper.querySelectorAll('iframe').forEach(iframe => {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        });
        galleryContentWrapper.querySelectorAll('video').forEach(video => {
            video.pause();
        });
    }

    function updateGallery() {
        const allMedia = galleryContentWrapper.querySelectorAll('img, video, .video-wrapper');
        allMedia.forEach((el, index) => {
            el.classList.toggle('active', index === currentImageIndex);
        });
        galleryPrevBtn.classList.toggle('hidden', currentImageIndex === 0);
        galleryNextBtn.classList.toggle('hidden', galleryItems.length <= 1 || currentImageIndex === galleryItems.length - 1);
    }

    galleryPrevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            pauseAllMedia(); // Pause current media before changing
            currentImageIndex--;
            updateGallery();
        }
    });

    galleryNextBtn.addEventListener('click', () => {
        if (currentImageIndex < galleryItems.length - 1) {
            pauseAllMedia(); // Pause current media before changing
            currentImageIndex++;
            updateGallery();
        }
    });

    function handleEscKey(event) {
        if (event.key === 'Escape') {
            if (!lightboxOverlay.classList.contains('hidden')) {
                closeLightbox();
            } else {
                closeProjectModal();
            }
        }
    }

    function openLightbox(src) {
        lightboxImage.src = src;
        lightboxOverlay.classList.remove('hidden');
    }

    function closeLightbox() {
        lightboxOverlay.classList.add('hidden');
    }

    galleryContentWrapper.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            openLightbox(e.target.src);
        }
    });

    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });
    lightboxCloseBtn.addEventListener('click', closeLightbox);
    
    function openProjectModal(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        modalTitle.textContent = project.title;
        modalDesc.innerHTML = project.long_description || '';

        // One HTML string per gallery slide, in the order set in the CMS.
        galleryItems = project.media.map(media => {
            if (media.kind === 'video') {
                const youtubeEmbedUrl = getYoutubeEmbedUrl(media.url);
                return youtubeEmbedUrl && `<div class="video-wrapper"><iframe src="${esc(youtubeEmbedUrl)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
            }
            return `<img src="${mediaUrl(media.r2_key)}" alt="${esc(media.caption || `${project.title} screenshot`)}" class="rounded-lg w-full">`;
        }).filter(Boolean);

        const galleryHTML = galleryItems.join('');
        
        galleryContentWrapper.innerHTML = galleryHTML;
        currentImageIndex = 0;
        updateGallery();

        modalDetails.innerHTML = project.details.map(d => `<li class="flex justify-between border-b border-dashed border-zinc-800 py-2"><span class="font-medium text-slate-400">${esc(d.label)}</span><span class="text-white">${esc(d.value)}</span></li>`).join('');
        modalTags.innerHTML = project.tags.map(tag => `<span class="tech-tag">${esc(tag)}</span>`).join('');
        
        if (project.links && project.links.length > 0) {
            modalLinksContainer.style.display = 'block';
            modalLinks.innerHTML = project.links.map(link => `
                <a href="${esc(link.url)}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-slate-300 hover:text-accent transition-colors group">
                    <span class="group-hover:underline">${esc(link.label)}</span>
                    <i data-lucide="arrow-up-right" class="w-4 h-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"></i>
                </a>
            `).join('');
        } else {
            modalLinksContainer.style.display = 'none';
            modalLinks.innerHTML = '';
        }

        document.body.classList.add('modal-open');
        modalOverlay.classList.remove('hidden');
        lucide.createIcons();
        window.addEventListener('keydown', handleEscKey);
    }

    function closeProjectModal() {
        document.body.classList.remove('modal-open');
        modalOverlay.classList.add('hidden');
        pauseAllMedia(); // Pause media when closing the modal
        window.removeEventListener('keydown', handleEscKey);
    }
    
    document.querySelector('main').addEventListener('click', (e) => {
         const card = e.target.closest('.spotlight-card');
        if (card) {
            const projectId = card.dataset.projectId;
            openProjectModal(projectId);
        }
    });

    modalCloseBtn.addEventListener('click', closeProjectModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeProjectModal();
        }
    });

    // --- Nav Scroll, Mobile Menu, Static Text Animations ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('nav-scrolled', window.scrollY > 50);
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        if(link.id !== 'mobile-resume-btn') {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        }
    });
    
    const heroTitle = document.getElementById('hero-title');
    const text = heroTitle.textContent.trim();
    heroTitle.innerHTML = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        heroTitle.appendChild(span);
    });

    const tl = gsap.timeline();
    tl.to('.char', { opacity: 1, y: 0, scale: 1, stagger: 0.05, ease: 'back.out(1.7)', duration: 1 })
    .from("#hero-subtitle", { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, "-=0.8")
    .from("#hero-cta", { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, "-=0.6");

    // About Me Paged Feature
    const slides = document.querySelectorAll('.about-slide');
    const mainProgressBar = document.getElementById('about-progress-bar');
    const slideIndicators = document.querySelectorAll('.slide-indicator');
    const slideInterval = 5000;
    let currentSlide = 0;
    let slideIntervalId;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        slideIndicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        gsap.killTweensOf(mainProgressBar);
        gsap.set(mainProgressBar, { width: '0%' });
        gsap.to(mainProgressBar, { width: '100%', duration: slideInterval / 1000, ease: 'none' });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    if (slides.length > 0) {
         showSlide(currentSlide);
         slideIntervalId = setInterval(nextSlide, slideInterval);
    }

    // Runs once the CMS content is on the page, so the rendered timeline entries are included
    // and the scroll triggers above are measured against the final page height.
    function setupRevealText() {
        gsap.utils.toArray('.reveal-text').forEach(elem => {
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 40,
                duration: 1,
                ease: 'power1.out'
            });
        });
        ScrollTrigger.refresh();
    }

    const sections = document.querySelectorAll('section[id]');
    const colors = {
        'home': 'hsl(240, 3%, 8%)',
        'projects': 'hsl(240, 5%, 7%)',
        'experience': 'hsl(345, 10%, 9%)',
        'contact': 'hsl(345, 15%, 8%)'
    };

    sections.forEach(section => {
        const color = colors[section.id];
        if (color) {
            gsap.to('body', {
                '--bg-top': color,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 50%',
                    end: 'bottom 50%',
                    scrub: 1,
                }
            });
        }
    });

    loadContent();
});
