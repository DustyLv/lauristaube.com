import {projectsData} from './projectdata.js'
let currentPage = 1;
const projectsPerPage = 4;
let regularProjects = [];

const email = "lauristaube@gmail.com";
const number = "(+371) 2 867 44 29";
const location = "Valmiera, Latvia";
const website = "lauristaube.com";

const summary = "I am a Unity developer and a 3D artist with quite a few projects under my belt. I specialize in Virtual Reality, but enjoy taking up different types of projects. My passion is to create meaningful interactive applications and games.<br><br>I’m detail-oriented and love taking on problems, so I strive to make the best whenever it’s possible.";

// --- RESUME GENERATOR LOGIC ---
function generateResume() {
    
    const output = document.getElementById('resume-output');
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // --- SKILLS ---
    const skills = [...new Set(projectsData.flatMap(p => p.tags))];
    const skillsHTML = `<div class="flex flex-wrap gap-2">${skills.map(skill => `<span class="border text-xs font-semibold mr-2 px-2.5 py-1 rounded-full" style="color: var(--accent); border-color: var(--accent);">${skill}</span>`).join('')}</div>`;

    // --- PROJECTS ---
    const projects = projectsData.filter(p => !p.isFeatured);
    
    const lightProjectsHTML = projects.map(p => `
        <div class="mb-4 break-inside-avoid">
            <h3 class="text-lg font-bold text-gray-900">${p.title}</h3>
            <p class="text-sm text-gray-600 italic mb-1">${p.tags.join(' · ')}</p>
            <p class="text-gray-700 text-sm">${p.description}</p>
        </div>
    `).join('');

    const darkProjectsHTML = projects.map(p => `
         <div class="mb-4 break-inside-avoid">
            <h3 class="text-lg font-bold text-gray-100">${p.title}</h3>
            <p class="text-sm text-gray-400 italic mb-1">${p.tags.join(' · ')}</p>
            <p class="text-gray-300 text-sm">${p.description}</p>
        </div>
    `).join('');
    

    // --- TEMPLATES ---
    const lightTemplate = `
        <div class="bg-white text-gray-800" style="font-family: 'Inter', sans-serif;">
            <div class="grid grid-cols-3">
                <div class="col-span-1 bg-gray-50 p-8">
                    <h1 class="text-4xl font-bold text-gray-900" style="font-family: 'Lora', serif;">Lauris Taube</h1>
                    <p class="text-xl mt-2" style="color: var(--accent);">Creative Technologist</p>
                    <div class="mt-10">
                        <h2 class="text-lg font-bold uppercase tracking-wider" style="color: var(--accent);">Contact</h2>
                        <div class="mt-4 space-y-2 text-sm text-gray-700">
                            <p>${email}</p>
                            <p>${number}</p>
                            <p>${location}</p>
                            <p>${website}</p>
                        </div>
                    </div>
                    <div class="mt-10">
                        <h2 class="text-lg font-bold uppercase tracking-wider" style="color: var(--accent);">Skills</h2>
                        <div class="mt-4">${skillsHTML}</div>
                    </div>
                    <div class="mt-10">
                        <h2 class="text-lg font-bold uppercase tracking-wider" style="color: var(--accent);">Education</h2>
                        <div class="mt-4">
                            <h3 class="text-md font-bold text-gray-900">Mg.sc.comp. in Sociotechnic Systems Modeling</h3>
                            <p class="text-sm text-gray-600">Vidzeme University of Applied Sciences</p>
                            <p class="text-sm text-gray-600">2016 - 2018</p>
                        </div>
                        <div class="mt-4">
                            <h3 class="text-md font-bold text-gray-900">B.Sc. in Computer Science</h3>
                            <p class="text-sm text-gray-600">Vidzeme University of Applied Sciences</p>
                            <p class="text-sm text-gray-600">2012 - 2016</p>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 p-8">
                    <section>
                        <h2 class="text-2xl font-bold border-b-2 pb-2 mb-4" style="font-family: 'Lora', serif; border-color: var(--accent); color: var(--accent);">Summary</h2>
                        <p class="text-gray-700">${summary}</p>
                    </section>
                    <section class="mt-8">
                        <h2 class="text-2xl font-bold border-b-2 pb-2 mb-4" style="font-family: 'Lora', serif; border-color: var(--accent); color: var(--accent);">Professional Experience</h2>
                        <div>
                        <h3 class="text-lg font-bold text-gray-900">Unity Developer</h3>
                        <p class="text-md text-gray-500 italic">Vidzeme University of Applied Sciences | VRAR Laboratory</p>
                        <p class="text-md text-gray-500 italic">2019 - Present</p>
                        <ul class="list-disc list-inside text-gray-700 mt-1 text-sm space-y-1">
                            <li>Developer for interactive VR training and educational modules, simulations and other experiences.</li>
                            <li>Responsible for architecture, logic implementation, graphical elements and performance optimization.</li>
                        </ul>
                        </div>
                        <div>
                        <h3 class="text-lg font-bold text-gray-900">Lecturer</h3>
                        <p class="text-md text-gray-500 italic">Vidzeme University of Applied Sciences</p>
                        <p class="text-md text-gray-500 italic">2019 - Present</p>
                        <p>Giving lectures on 3D modeling. Using Blender as the main tool. Giving a good starting point for students to start creating 3D models for games.</p>
                        <ul class="list-disc list-inside text-gray-700 mt-1 text-sm space-y-1">
                            <li>Giving lectures on 3D modeling.</li>
                            <li>Giving a good starting point for students to start creating 3D models for games.</li>
                            <li>Using Blender as the main tool.</li>
                        </ul>
                        </div>
                        <div>
                        <h3 class="text-lg font-bold text-gray-900">Freelance Developer</h3>
                        <p class="text-md text-gray-500 italic">2018 - Present</p>
                        <ul class="list-disc list-inside text-gray-700 mt-1 text-sm space-y-1">
                            <li>Developer for interactive VR and flatscreen experiences in Unity.</li>
                            <li>Responsible for architecture, logic implementation, graphical elements and performance optimization.</li>
                        </ul>
                        </div>
                    </section>
                    <section class="mt-8">
                        <h2 class="text-2xl font-bold border-b-2 pb-2 mb-4" style="font-family: 'Lora', serif; border-color: var(--accent); color: var(--accent);">Selected Projects</h2>
                        ${lightProjectsHTML}
                    </section>
                </div>
            </div>
        </div>
    `;
    const darkTemplate = `
        <div class="bg-gray-900 text-gray-200" style="font-family: 'Inter', sans-serif;">
            <div class="grid grid-cols-3">
                <div class="col-span-1 bg-gray-800 p-8">
                    <h1 class="text-4xl font-bold text-white" style="font-family: 'Lora', serif;">Lauris Taube</h1>
                    <p class="text-xl mt-2" style="color: var(--accent);">Creative Technologist</p>
                    <div class="mt-10">
                        <h2 class="text-lg font-bold uppercase tracking-wider" style="color: var(--accent);">Contact</h2>
                        <div class="mt-4 space-y-2 text-sm text-gray-300">
                            <p>${email}</p>
                            <p>${number}</p>
                            <p>${location}</p>
                            <p>${website}</p>
                        </div>
                    </div>
                    <div class="mt-10">
                        <h2 class="text-lg font-bold uppercase tracking-wider" style="color: var(--accent);">Skills</h2>
                        <div class="mt-4">${skillsHTML}</div>
                    </div>
                    <div class="mt-10">
                        <h2 class="text-lg font-bold uppercase tracking-wider" style="color: var(--accent);">Education</h2>

                        <div class="mt-4">
                            <h3 class="text-md font-bold text-gray-100">Mg.sc.comp. in Sociotechnic Systems Modeling</h3>
                            <p class="text-sm text-gray-400">Vidzeme University of Applied Sciences</p>
                            <p class="text-sm text-gray-400">2016 - 2018</p>
                        </div>
                        <div class="mt-4">
                            <h3 class="text-md font-bold text-gray-100">B.Sc. in Computer Science</h3>
                            <p class="text-sm text-gray-400">Vidzeme University of Applied Sciences</p>
                            <p class="text-sm text-gray-400">2012 - 2016</p>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 p-8">
                    <section>
                        <h2 class="text-2xl font-bold border-b-2 pb-2 mb-4" style="font-family: 'Lora', serif; border-color: var(--accent); color: var(--accent);">Summary</h2>
                        <p class="text-gray-300">${summary}</p>
                    </section>
                    <section class="mt-8">
                        <h2 class="text-2xl font-bold border-b-2 pb-2 mb-4" style="font-family: 'Lora', serif; border-color: var(--accent); color: var(--accent);">Professional Experience</h2>
                        <div class="mb-6">
                            <h3 class="text-lg font-bold text-gray-100">Unity Developer</h3>
                            <p class="text-md text-gray-400 italic">Vidzeme University of Applied Sciences | VRAR Laboratory</p>
                            <p class="text-md text-gray-400 italic">2019 - Present</p>
                            <ul class="list-disc list-inside text-gray-300 mt-1 text-sm space-y-1">
                                <li>Developer for interactive VR training and educational modules, simulations and other experiences.</li>
                                <li>Responsible for architecture, logic implementation, graphical elements and performance optimization.</li>
                            </ul>
                        </div>
                        <div class="mb-6">
                            <h3 class="text-lg font-bold text-gray-100">Lecturer</h3>
                            <p class="text-md text-gray-400 italic">Vidzeme University of Applied Sciences</p>
                            <p class="text-md text-gray-400 italic">2019 - Present</p>
                            <ul class="list-disc list-inside text-gray-300 mt-1 text-sm space-y-1">
                                <li>Giving lectures on 3D modeling.</li>
                                <li>Giving a good starting point for students to start creating 3D models for games.</li>
                                <li>Using Blender as the main tool.</li>
                            </ul>
                        </div>
                        <div class="mb-6">
                            <h3 class="text-lg font-bold text-gray-100">Freelance Developer</h3>
                            <p class="text-md text-gray-400 italic">2018 - Present</p>
                            <ul class="list-disc list-inside text-gray-300 mt-1 text-sm space-y-1">
                                <li>Developer for interactive VR and flatscreen experiences in Unity.</li>
                                <li>Responsible for architecture, logic implementation, graphical elements and performance optimization.</li>
                            </ul>
                        </div>
                    </section>
                    <section class="mt-8">
                        <h2 class="text-2xl font-bold border-b-2 pb-2 mb-4" style="font-family: 'Lora', serif; border-color: var(--accent); color: var(--accent);">Selected Projects</h2>
                        ${darkProjectsHTML}
                    </section>
                </div>
            </div>
        </div>
    `;
    console.log(darkTemplate);

    output.innerHTML = isDarkMode ? darkTemplate : lightTemplate;
    
    setTimeout(() => {
        window.print();
    }, 200);
}

document.addEventListener('DOMContentLoaded', () => {
    // const resumeBtnDesktop = document.getElementById('desktop-resume-btn');
    // const resumeBtnMobile = document.getElementById('mobile-resume-btn');
    const generateBtn = document.getElementById('generate-resume-btn');
    
    // if(resumeBtnDesktop) resumeBtnDesktop.addEventListener('click', (e) => { e.preventDefault(); document.getElementById('resume').scrollIntoView(); });
    // if(resumeBtnMobile) resumeBtnMobile.addEventListener('click', (e) => { e.preventDefault(); document.getElementById('resume').scrollIntoView(); });
    if(generateBtn) generateBtn.addEventListener('click', generateResume);


    // --- ALL OTHER PAGE LOGIC ---
    
    const featuredProject = projectsData.find(p => p.isFeatured);
    regularProjects = projectsData.filter(p => !p.isFeatured);

    if(featuredProject) {
        renderFeaturedProject(featuredProject);
    }
    
    renderPaginatedProjects();

    // --- Cursor Glow ---
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

    function renderFeaturedProject(project) {
        const container = document.getElementById('featured-project-container');
        if (!container || !project) return;
        
        const tagsHTML = project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');

        container.innerHTML = `
            <div class="spotlight-card rounded-2xl p-8 col-span-1 md:col-span-2" data-project-id="${project.id}">
                <div class="project-icon">
                    <i data-lucide="${project.icon}" class="w-8 h-8"></i>
                </div>
                <div>
                    <h4 class="text-3xl font-bold text-white mb-2 project-title">${project.title}</h4>
                    <p class="mb-4 max-w-xl project-desc">${project.description}</p>
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
            const tagsHTML = project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
            projectsHTML += `
                <div class="spotlight-card rounded-2xl p-8" data-project-id="${project.id}">
                    <div class="project-icon">
                        <i data-lucide="${project.icon}" class="w-8 h-8"></i>
                    </div>
                    <div>
                        <h4 class="text-2xl font-bold text-white mb-2 project-title">${project.title}</h4>
                        <p class="mb-4 project-desc">${project.description}</p>
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

        // Re-render lucide icons for the new buttons
        lucide.createIcons();

        // Add event listeners
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

        // Update disabled state
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
    const modalGallery = document.getElementById('project-modal-gallery');
    const modalDesc = document.getElementById('project-modal-long-desc');
    const modalDetails = document.getElementById('project-modal-details');
    const modalTags = document.getElementById('project-modal-tags');
    const modalLinksContainer = document.getElementById('project-modal-links-container');
    const modalLinks = document.getElementById('project-modal-links');

    function handleEscKey(event) {
        if (event.key === 'Escape') {
            closeProjectModal();
        }
    }

    function openProjectModal(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;

        modalTitle.textContent = project.title;
        modalDesc.innerHTML = project.longDescription;
        
        let galleryHTML = '';
        if (project.videos && project.videos.length > 0) {
             galleryHTML += project.videos.map(vid => `
                <video controls autoplay muted loop playsinline class="rounded-lg border border-[var(--border)] w-full">
                    <source src="${vid}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
             `).join('');
        }
        if (project.images && project.images.length > 0) {
            galleryHTML += project.images.map(img => `<img src="${img}" alt="${project.title} screenshot" class="rounded-lg border border-[var(--border)] w-full">`).join('');
        }
        console.log(galleryHTML);
        modalGallery.innerHTML = galleryHTML;

        modalDetails.innerHTML = project.details.map(d => `<li class="flex justify-between border-b border-dashed border-zinc-800 py-2"><span class="font-medium text-slate-400">${d.label}</span><span class="text-white">${d.value}</span></li>`).join('');
        modalTags.innerHTML = project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
        
        if (project.links && project.links.length > 0) {
            modalLinksContainer.style.display = 'block';
            modalLinks.innerHTML = project.links.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-slate-300 hover:text-accent transition-colors group">
                    <span class="group-hover:underline">${link.label}</span>
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
        // Don't close mobile menu for resume button
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
    const slideInterval = 5000; // 5 seconds
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
});