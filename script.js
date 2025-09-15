const projectsData = [
    {
      id: 'pitchforks',
      title: 'Pitchforks & Paragraphs',
      description: 'A fast-paced medieval typing game where you cast word-spells to quell peasant riots. Built from scratch in Unity.',
      longDescription: `<p>Pitchforks & Paragraphs is a wave-based typing game where players must type words displayed on peasants' signs to cast spells and disperse them. The game features a dynamic difficulty system, a combo-based scoring mechanism that rewards speed and accuracy, and online leaderboards implemented with Firebase.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Pitchforks+Gameplay'],
      details: [{ label: 'Role', value: 'Solo Developer' }, {label: 'Platform', value: 'PC'}],
      links: [{ label: 'Play on itch.io', url: 'https://lauristaube.itch.io/pitchforks-and-paragraphs' }],
      icon: 'gamepad-2',
      tags: ['Unity', 'C#', 'Firebase', 'Game Dev'],
      isFeatured: true
    },
    {
      id: 'volga-heatwave',
      title: 'Volga Heatwave',
      description: 'A hobby game about a dog trapped in a hot car who must attract attention to be saved before the temperature gets too high.',
      longDescription: `<p>Volga Heatwave is a game about a dog trapped in a hot car who must attract the attention of passersby to be saved. The player's goal is to fill an "attention meter" by interacting with objects in the car, which makes a crowd gather outside. All the while, a temperature meter is constantly rising, and if it reaches its maximum value, the game is over. This was a solo hobby project where I handled all development and art aspects.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Volga+Heatwave+Game'],
      videos: ['https://i.imgur.com/8pS1s7v.mp4'],
      details: [{ label: 'Role', value: 'Solo Developer & Artist' }, { label: 'Type', value: 'Hobby Game' }],
      links: [
          { label: 'Play on itch.io', url: 'https://lauristaube.itch.io/volga-heatwave' },
          { label: 'View on GitHub', url: 'https://github.com/lauristaube/Volga-Heatwave' }
      ],
      icon: 'dog',
      tags: ['Unity', 'Blender', 'Game Dev'],
      isFeatured: false
    },
    {
      id: 'blender-renders',
      title: 'Blender Renders',
      description: 'A collection of various 3D models and scenes created in Blender, focusing on stylized and game-ready assets.',
      longDescription: `<p>A personal showcase of my 3D modeling skills. This collection includes character models, props, and small environmental dioramas, demonstrating proficiency in modeling, texturing, and lighting within Blender.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Blender+Scene'],
      details: [{ label: 'Software', value: 'Blender' }],
      icon: 'cubes',
      tags: ['Blender', '3D Art', 'PBR'],
      isFeatured: false
    },
    {
      id: 'lipke-vr',
      title: 'Žanis Lipke memorial VR experience',
      description: 'A VR experience for the Žanis Lipke Memorial museum, allowing virtual exploration of the hideout used to save Jews in WWII.',
      longDescription: `<p>This VR application virtually recreates the woodsman's hut and the underground bunker where Žanis Lipke hid people during WWII. The experience allows users to explore the historical site and is used in the museum for educational purposes.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Lipke+Memorial+VR'],
      details: [{ label: 'Type', value: 'VR Museum Exhibit' }],
      icon: 'landmark',
      tags: ['Unity', 'C#', 'VR', 'Blender'],
      isFeatured: false
    },
    {
      id: 'crayfish-rush',
      title: 'Crayfish Rush',
      description: 'A mobile game where the player helps a crayfish cross a busy road to reach a river, developed for a client.',
      longDescription: `<p>Crayfish Rush is an arcade-style mobile game. As the main developer, my role involved implementing all gameplay mechanics, UI, and ensuring the game was optimized for mobile performance.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Crayfish+Rush+Game'],
      details: [{ label: 'Platform', value: 'Mobile' }],
      icon: 'crab',
      tags: ['Unity', 'C#', 'Mobile Game'],
      isFeatured: false
    },
    {
      id: 'izlidzi-vitolam',
      title: 'Izlīdzi vītolam',
      description: 'A mobile game created for a charity organization to raise awareness and donations for children with disabilities.',
      longDescription: `<p>This project was a pro-bono mobile game developed to support a charity. The game was designed to be engaging and family-friendly, with integrated features to inform players about the charity's mission and encourage donations.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Charity+Game'],
      details: [{ label: 'Type', value: 'Charity Project' }],
      icon: 'heart-handshake',
      tags: ['Unity', 'C#', 'Mobile Game'],
      isFeatured: false
    },
    {
      id: 'zaao',
      title: 'ZAAO VR Sorting Game',
      description: 'A VR game for a waste management company (ZAAO) to educate players on proper waste sorting in an interactive way.',
      longDescription: `<p>This educational VR game gamifies the process of waste sorting. Players are placed in a virtual environment where they must correctly sort different types of trash into the appropriate bins under a time limit.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=ZAAO+VR+Game'],
      details: [{ label: 'Type', value: 'Educational VR Game' }],
      icon: 'recycle',
      tags: ['Unity', 'C#', 'VR'],
      isFeatured: false
    },
    {
      id: 'train-dispatch',
      title: 'Train Dispatcher Learning Tool',
      description: 'A VR learning tool for training train dispatchers, simulating complex railway operations and emergency scenarios.',
      longDescription: `<p>This VR simulation provides a realistic environment for train dispatchers to learn and practice their duties, from routine scheduling to handling unexpected emergencies, without real-world risk.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Train+Dispatcher+VR'],
      details: [{ label: 'Type', value: 'VR Training' }],
      icon: 'train',
      tags: ['Unity', 'C#', 'VR'],
      isFeatured: false
    },
    {
      id: 'art-plus',
      title: 'Art+',
      description: 'An augmented reality application that brings traditional 2D artworks to life with 3D animations and effects.',
      longDescription: `<p>Using image recognition (Vuforia), Art+ identifies specific paintings or drawings and overlays interactive 3D content, creating a magical, augmented gallery experience for users.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Art+AR+App'],
      details: [{ label: 'Technology', value: 'Augmented Reality' }],
      icon: 'image-plus',
      tags: ['Unity', 'AR', 'Vuforia'],
      isFeatured: false
    },
    {
      id: 'audio-viz',
      title: 'Audio Visualizer',
      description: 'A WebGL application that generates dynamic 3D visuals that react in real-time to music and audio input.',
      longDescription: `<p>This project, built in Unity and exported to WebGL, analyzes audio frequencies to drive animations and visual effects, creating a synchronized and mesmerizing audio-visual experience in the browser.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Audio+Visualizer'],
      details: [{ label: 'Platform', value: 'WebGL' }],
      icon: 'bar-chart-3',
      tags: ['Unity', 'WebGL', 'C#'],
      isFeatured: false
    },
    {
      id: 'bog-sim',
      title: 'Bog Simulator',
      description: 'A serene VR nature experience that allows users to explore a realistic and atmospheric Latvian bog environment.',
      longDescription: `<p>This VR simulator focuses on immersion and atmosphere, recreating the unique flora, fauna, and soundscape of a Latvian bog. It serves as a virtual tourism or relaxation experience.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Bog+Simulator+VR'],
      details: [{ label: 'Type', value: 'VR Experience' }],
      icon: 'leaf',
      tags: ['Unity', 'VR', 'Blender'],
      isFeatured: false
    },
    {
      id: 'motor-assembly',
      title: 'Motor Assembly VR',
      description: 'A VR learning environment for teaching the step-by-step process of assembling a complex electric motor.',
      longDescription: `<p>This technical training application guides users through the intricate process of motor assembly. It features interactive parts, instructional overlays, and performance feedback to ensure effective learning.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Motor+Assembly+VR'],
      details: [{ label: 'Type', value: 'VR Training' }],
      icon: 'cog',
      tags: ['Unity', 'VR', 'C#'],
      isFeatured: false
    },
    {
      id: 'safescaff',
      title: 'SafeScaff VR',
      description: 'A VR safety training simulation for construction workers, focusing on the correct and safe procedures for erecting scaffolding.',
      longDescription: `<p>SafeScaff provides a hands-on, risk-free environment for workers to learn and be tested on scaffolding safety protocols, helping to reduce workplace accidents.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=SafeScaff+VR'],
      details: [{ label: 'Type', value: 'VR Safety Training' }],
      icon: 'construction',
      tags: ['Unity', 'VR', 'C#'],
      isFeatured: false
    },
    {
      id: 'exonicus',
      title: 'Exonicus Trauma Simulator',
      description: 'VR medical training simulators for first responders and military personnel to practice life-saving procedures in high-stress scenarios.',
      longDescription: `<p>As a VR/AR Developer at Exonicus, I contributed to creating realistic medical training simulations. These simulators help medical professionals practice critical decision-making and procedures in immersive, true-to-life virtual environments.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Trauma+Simulator'],
      details: [{ label: 'Role', value: 'VR/AR Developer' }],
      icon: 'activity',
      tags: ['Unity', 'VR', 'C#'],
      isFeatured: false
    },
    {
      id: 'overly',
      title: 'Overly AR Platform',
      description: 'Contributed to the development of the Overly platform, enabling brands and individuals to create their own AR experiences.',
      longDescription: `<p>As a Unity Developer at Overly, I worked on the core technology that powers their augmented reality platform, helping to build the tools that allow others to easily create and deploy AR content.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Overly+AR'],
      details: [{ label: 'Role', value: 'Unity Developer' }],
      icon: 'layers',
      tags: ['Unity', 'AR', 'Vuforia'],
      isFeatured: false
    },
    {
      id: 'find-yourself',
      title: 'Find Yourself in Europe',
      description: 'An educational mobile game designed to teach young people about opportunities within the European Union.',
      longDescription: `<p>This game uses interactive quizzes, mini-games, and storytelling to inform players about various EU programs, cultural facts, and travel opportunities in an engaging way.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Europe+Game'],
      details: [{ label: 'Type', value: 'Educational Game' }],
      icon: 'map',
      tags: ['Unity', 'C#', 'Mobile Game'],
      isFeatured: false
    },
    {
      id: 'stellar-miner',
      title: 'Revenge of the Stellar Miner',
      description: 'A 2D mobile game where players navigate a spaceship through asteroid fields to collect resources while avoiding enemies.',
      longDescription: `<p>This was an early mobile game project focused on classic arcade-style gameplay. It involved creating player controls, enemy AI, procedural level generation, and scoring systems.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Stellar+Miner+Game'],
      details: [{ label: 'Type', value: '2D Mobile Game' }],
      icon: 'rocket',
      tags: ['Unity', 'C#', 'Mobile Game'],
      isFeatured: false
    },
    {
      id: 'spatial',
      title: 'Spatial VR Collaboration',
      description: 'Worked as a Software Engineer on the Spatial platform, a leading VR tool for remote collaboration and meetings.',
      longDescription: `<p>As part of the engineering team at Spatial, I contributed to the development of features for their virtual collaboration platform, which allows users to meet and work together in a shared VR space.</p>`,
      images: ['https://placehold.co/1600x900/111111/a11a37?text=Spatial+VR'],
      details: [{ label: 'Role', value: 'Software Engineer' }],
      icon: 'users',
      tags: ['Unity', 'VR', 'C#'],
      isFeatured: false
    }
  ];

  let currentPage = 1;
  const projectsPerPage = 4;
  let regularProjects = [];

  gsap.registerPlugin(ScrollTrigger);

  document.addEventListener('DOMContentLoaded', () => {
      
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
          link.addEventListener('click', () => {
              mobileMenu.classList.add('hidden');
          });
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
              ease: 'power3.out'
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