const projectsData = [
    {
        id: 'pitchforks',
        title: 'Pitchforks & Paragraphs',
        description: 'A fast-paced medieval typing game where you cast word-spells to quell peasant riots. Built from scratch in Unity.',
        longDescription: `<p>Pitchforks & Paragraphs is a wave-based typing game where players must type words displayed on peasants' signs to cast spells and disperse them. The game features a dynamic difficulty system, a combo-based scoring mechanism that rewards speed and accuracy, and online leaderboards implemented with Firebase.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Pitchforks+Gameplay'],
        details: [{ label: 'Role', value: 'Solo Developer' }, { label: 'Platform', value: 'Web' }],
        links: [{ label: 'Play on itch.io', url: 'https://dustylv.itch.io/pitchforks-and-paragraphs' }],
        icon: 'gamepad-2',
        tags: ['Unity', 'C#', 'Game Dev'],
        isFeatured: true
    },
    {
        id: 'lipke-guide',
        title: 'Žanis Lipke Memorial digital guide',
        description: '-----',
        longDescription: `<p>-----</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Lipke+Memorial+VR'],
        details: [{ label: 'Type', value: 'VR Museum Exhibit' }],
        icon: 'landmark',
        tags: ['Unity', 'C#'],
        isFeatured: false
    },
    {
        id: 'rix',
        title: 'RIX Airport Digital Twin 3D model',
        description: 'Creation of Riga (RIX) airport 3D model.',
        longDescription: `<p>Creation of 3D model for RIX airport runways and surrounding territory. Modeled and textured the terrain, signage and other necessary objects, as well as buildings.
        <br><br>
        The model needed to be as performant as possible, so custom shaders were created for terrain texturing, to use Vertex Colors for masking. As well as, creation and use of texture atlases for signage, ground lines, etc.
        </p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Lipke+Memorial+VR'],
        details: [{ label: 'Type', value: '3D Model' }],
        icon: 'plane',
        tags: ['Blender', 'Unity', 'Amplify Shader'],
        isFeatured: false
    },
    {
        id: 'lipke-vr',
        title: 'Žanis Lipke Memorial VR experience',
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
        description: 'A VR experience where the player has to catch crayfish in a river.',
        longDescription: `<p>This is a VR game for Ape museum in Latvia. The games purpose is to allow players to immerse themselves in an activity that's becoming quite rare - catching crayfish in a river. </p><br>
      <p>The player must catch as many crayfish as possible in the given time. They are presented with 3 crayfish traps in the river next to them and they must wait for the crayfish to go into them. When that happens, the player pulls up the trap and takes the crayfish and places it into the bag that's around their neck. <br>
      This process is repeated until the end of the game. The amount of crayfish in the bag is counted at the end of the game and shown on the scoreboard. Players can compete for the highest score.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Crayfish+Rush+Game'],
        details: [{ label: 'Platform', value: 'VR' }],
        icon: 'crab',
        tags: ['Unity', 'C#', 'VR Game'],
        isFeatured: false
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
            { label: 'Play on itch.io', url: 'https://dustylv.itch.io/volga-heatwave' },
        ],
        icon: 'dog',
        tags: ['Unity', 'Blender', 'Game Dev'],
        isFeatured: false
    },
    {
        id: 'izlidzi-vitolam',
        title: 'Izlīdzi vītolam',
        description: 'A Virtual Reality choir conducting game with gesture recognition.',
        longDescription: `<p>A Virtual Reality choir conducting game with gesture recognition. <br><br> The game serves as an interactive experience to see what a choir conductor does. The player has to perform various patterns with arm movements that correspond with what an actual conductor would make to give instructions to the choir.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Charity+Game'],
        details: [{ label: 'Platform', value: 'VR' }],
        icon: 'heart-handshake',
        tags: ['Unity', 'C#', 'VR Game'],
        isFeatured: false
    },
    {
        id: 'zaao',
        title: 'ZAAO VR Sorting Game',
        description: 'A VR game for a waste management company (ZAAO) to educate players on proper waste sorting in an interactive way.',
        longDescription: `<p>This educational VR game gamifies the process of waste sorting. Players are placed in a virtual environment where they must correctly sort different types of trash into the appropriate bins under a time limit.</p><br>
      <p>The main challenge was the use of a 360° image for the background and 3D models for the interactable objects. This choice was made so that the game looks realistic. Creating the environment as a 3D model was not feasible as the game was supposed to run on an Oculus Go headset, and does not have the horsepower to process that much.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=ZAAO+VR+Game'],
        details: [{ label: 'Platform', value: 'VR' }],
        icon: 'recycle',
        tags: ['Unity', 'C#', 'VR'],
        isFeatured: false
    },
    {
        id: 'train-dispatch',
        title: 'Train Dispatcher Game',
        description: 'A train dispatch edutainment game for Gulbene train museum. ',
        longDescription: `<p>Allows the player to take on the role of a train dispatch and make decisions to divert trains to the correct rails. Gives an insight on what a train dispatch actually does. <br><br>
The player is given a description of the situation and they must choose an appropriate course of action from the given choices. </p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Train+Dispatcher+VR'],
        details: [{ label: 'Platform', value: 'PC' }],
        icon: 'train',
        tags: ['Unity', 'C#'],
        isFeatured: false
    },
    {
        id: 'art-plus',
        title: 'Art+',
        description: 'Various 3D models for ART+ AR application viewable in multiple places across Latvia',
        longDescription: `<p>ART+ is a collaborative artist effort of bringing art experiences to AR. In different places in Liepaja, Kuldiga and Valmiera, people can use their phones or tablets to view and experience various art and other significant objects.
<br><br>
You can check it out here: https://artplus.app/
<br><br>
My part in this was to create a few 3D models and add some effects to some of them:
<br>
    <ul>
    <li> - Airplane "KOD" or "Ventas Eagle"</li>
    <li> - Roots</li>
    <li> - The white clover</li>
    <li> - Libau - Romny Railway</li>
    </ul>
</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Art+AR+App'],
        details: [{ label: 'Platform', value: 'Augmented Reality' }],
        icon: 'image-plus',
        tags: ['Unity', 'AR'],
        isFeatured: false
    },
    {
        id: 'audio-viz',
        title: 'Audio Visualizations',
        description: 'Hobby audio vizualization renders.',
        longDescription: `<p>These are some personal hobby projects where I wanted to create an animation with audio, where objects in the scene would react to audio. Both projects are for already songs, not original tracks.
      <br>
      </p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Audio+Visualizer'],
        details: [{ label: 'Technology', value: 'Blender' }],
        icon: 'bar-chart-3',
        tags: ['Blender'],
        isFeatured: false
    },
    {
        id: 'bog-sim',
        title: 'Bog Simulator',
        description: 'An automated generation of digital twin in virtual reality for interaction with specific nature ecosystem.',
        longDescription: `<p>This scientific project was aimed towards creating a VR experience to visualize realtime simulation data in an easier form. The simulation was made for a bog ecosystem and as the main parameter to be simulated was underground water level. <br><br>
      This water level is impacted by various factors, but one of the goals for this visualization was how human actions impact the ecosystem. And to demonstrate it, tree cutting was chosen as the main action. If the user cuts down a tree, the simulation is run and the water level data is updated.
<br><br>
This project incorporates GIS data to create the virtual terrain and various drone LIDAR datasets used to place vegetation.</p>`,
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
        longDescription: `<p>This technical training application guides users through the intricate process of motor assembly. It features interactive parts, instructional overlays, and performance feedback to ensure effective learning.
      <br><br>
      The applications purpose is to allow university students to learn mechatronics in a virtual environment. 
Main idea is to allow to learn how to assemble and operate various mechanical devices.
<br><br>
This training application has less focus on safety, but more on the different levels of depth a training environment can have. 
<br>
In this project, also a grading system was implemented that allows to gain more insights on how well does the student understands the subject and where they might need to improve.
<br><br>
As an example, an electric motor was chosen. The application has three levels of complexity.</p>`,
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
        longDescription: `<p>SafeScaff provides a hands-on, risk-free environment for workers to learn and be tested on scaffolding safety protocols, helping to reduce workplace accidents.
      <br><br>
      The users have the task of building a scaffolding structure while performing all safety measures. This includes wearing all the necessary safety equipment, constructing the scaffolding in the correct order, securing all scaffolding pieces so that they don't move.
<br><br>
The whole process and the users actions are recorded. They are used afterwards to determine if the user did everything correctly or what mistakes were made. That allows for a deeper learning process that helps users to learn faster and safer.
<br><br>
This project supports both singleplayer and multiplayer modes.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=SafeScaff+VR'],
        details: [{ label: 'Type', value: 'VR Safety Training' }],
        icon: 'construction',
        tags: ['Unity', 'VR', 'C#'],
        isFeatured: false
    },
    {
        id: 'exonicus',
        title: 'XR Prototype for Exonicus Inc.',
        description: 'Freelance job for Exonicus Inc. to create a prototype for ArUco marker tracking.',
        longDescription: `<p>The main idea of the prototype was to test how well the Vive XR Elite headset performs with tracking ArUco markers and if it would be suitable to use.
<br><br>
By using the headset passthrough and ability to detect and track markers in real-time, digital objects would be attached to each marker and follow it.
<br><br>
This was done in Unity, using the Vive Wave SDK packages, which provide ArUco marker tracking support. At the time of development the tracking performance was awful and not suitable for smooth real-time operation.
<br><br>
This was a solo project where I developed and implemented all of the logic based on the provided specifications.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Trauma+Simulator'],
        details: [{ label: 'Role', value: 'VR/AR Developer' }],
        icon: 'activity',
        tags: ['Unity', 'VR', 'C#'],
        isFeatured: false
    },
    {
        id: 'overly',
        title: 'Exposition app for OverlyApp',
        description: 'Freelance job for OverlyApp to create an exposition application.',
        longDescription: `<p>An exposition app for Ventspils science centre. The app allows users to view online webcams showing wild animals such as eagle or stork nests. The app also has a wide library of animals, birds and sea creatures found in Latvia.
<br><br>
The app was made in Unity with its UI components to display necessary information.
<br><br>
It is a static app where the exposition information is mostly static - for this reason a simple Excel spreadsheet was used as a database for animal descriptions and other info. This information is loaded and shown in the game UI as necessary.
<br><br>
Another part was the webcam viewer for which it was necessary to display streams from Youtube and other sources. For this, VLC plugin was integrated.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Overly+AR'],
        details: [{ label: 'Role', value: 'Unity Developer' }],
        icon: 'layers',
        tags: ['Unity'],
        isFeatured: false
    },
    {
        id: 'find-yourself',
        title: 'Find Yourself in Europe',
        description: 'A digital board game for kids about Valmiera city, Europe and various professions.',
        longDescription: `<p>A digital version of an already existing non-digital educational board game, made for Valmiera city library.
<br><br>
This is an educational board game with questions about Valmiera city, Europe and 10 different professions. The purpose is to educate children in a more engaging and interactive way.
<br><br>
The main goal of the game is to collect points by correctly answering to questions. The winner is who has the most points.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Europe+Game'],
        details: [{ label: 'Type', value: 'Educational Game' }],
        icon: 'map',
        tags: ['Unity', 'C#'],
        isFeatured: false
    },
    {
        id: 'stellar-miner',
        title: 'Revenge of the Stellar Miner',
        description: 'A 2D mobile game where players navigate a spaceship through asteroid fields to collect resources while avoiding enemies.',
        longDescription: `<p>This is a hobby project that didn't end up fully finished. It was in development in 2016, so some things are lost regarding my memory of it. I did get pretty far and it's mostly finished. There might be some bugs and glitches, so..  This was created very early in my game dev days, so user experience falls short, as do some game mechanics and functionalities.
<br><br>
This is a top-down space shooter where you gather resources, upgrade your space ship and fight the boss.
<br><br>
You must destroy asteroids with your ships weapons. You can upgrade and buy new ones to help you speed up the gathering process. There's quite a few upgrades so it might take a while to upgrade fully.
<br><br>
You can do missions, that award you resources or gold. The missions are "destroy x amount" or "collect x amount".
<br><br>
The stronger you get, the higher the chance to get noticed by SpaceCorp, and they might send some AI ships to pester you.
<br><br>
The game has rebindable keys within settings. It also has a save function.
<br><br>
The game UI has toggleable information tooltips, they explain the various UI elements and screens.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Stellar+Miner+Game'],
        details: [{ label: 'Type', value: 'PC Game' }],
        icon: 'rocket',
        tags: ['Unity', 'C#', 'Game'],
        isFeatured: false
    },
    {
        id: 'spatial',
        title: 'Spatial.io Custom Environments and Logic',
        description: 'A research project on Spatial.io and its capabilities.',
        longDescription: `<p>This was a project within Vidzeme University of Applied Sciences for using VR technologies for immersive environments. In this case, main focus was on theatre and how Spatial can be used to help actors train for their plays remotely. Second focus was on how to use Spatial for group activities such as team-building work events.
<br><br>
Custom environments and logic was created using Spatial Creator Toolkit SDK for Unity.
<br><br>
Much of the project was exploring the SDK, creating various 3D environments, adding built-in Spatial functionalities, and also creating new logic with Visual Scripting specific for Spatial.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Spatial+VR'],
        details: [{ label: 'Role', value: 'Software Engineer' }],
        icon: 'users',
        tags: ['Unity', 'VR', 'C#'],
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
    }
];

let currentPage = 1;
const projectsPerPage = 4;
let regularProjects = [];

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    const featuredProject = projectsData.find(p => p.isFeatured);
    regularProjects = projectsData.filter(p => !p.isFeatured);

    if (featuredProject) {
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