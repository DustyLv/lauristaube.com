export const projectsData = [
    {
        id: 'pitchforks',
        title: 'Pitchforks & Paragraphs',
        description: 'A fast-paced medieval typing game where you cast word-spells to quell peasant riots. Built from scratch in Unity.',
        longDescription: `<p>Pitchforks & Paragraphs is a wave-based typing game where players must type words displayed on peasants' signs to cast spells and disperse them. The game features a dynamic difficulty system, a combo-based scoring mechanism that rewards speed and accuracy, and online leaderboards.</p>`,
        images: ['https://i.imgur.com/cNbAvgM.jpeg','https://i.imgur.com/jZZUdZ5.jpeg','https://i.imgur.com/mBlEXsz.jpeg'],
        details: [{ label: 'Platform', value: 'Web' }, { label: 'Type', value: 'Game' }],
        links: [{ label: 'Play on itch.io', url: 'https://dustylv.itch.io/pitchforksnparagraphs' }],
        icon: 'gamepad-2',
        tags: ['Unity', 'C#', 'Blender', 'MagicaVoxel'],
        isFeatured: true
    },
    {
        id: 'lipke-guide',
        title: 'Žanis Lipke Memorial Digital Guide',
        description: 'A digital guide to enhance the memorial experience.',
        longDescription: `<p>Creation of digital guide to run on an Android tablet. It provides additional information to the physical exhibits inside the memorial - like a real-life guide would.
        <br><br>
        It gives insights for each exhibit with images, text and videos. To improve the user experience, Bluetooth beacons we're added to automatically switch to the nearest exhibit and show its content.<br>
        To improve this applications longevity, a custom content management system (CMS) was created that the memorial employees or curators can edit and add new content.
        <br><br>
        An outdoors mode was created to give visitors a guided tour - a custom route was created that takes them around the memorial area to see various points of interest. In these points, contextual information is given, as well as some Augmented Reality (AR) elements
        are added to some points.
        Visitors are guided with a top-down map of the area, like any other navigation, with the POIs marked on the map.
        <br><br>
        Since these Android tablets would not have internet connection outside, the navigation was made from the ground-up. An offline map tiling system and a navigation line drawing system were created.
        </p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Lipke+Memorial+VR'],
        details: [{ label: 'Platform', value: 'Mobile (Android)' }, { label: 'Type', value: 'EdTech' }],
        links: [{ label: 'Lipke memorial', url: 'https://lipke.lv/en/' }],
        icon: 'landmark',
        tags: ['Unity', 'C#', 'AR', 'Android', 'Google Services'],
        isFeatured: false
    },
    {
        id: 'rix',
        title: 'RIX Airport Digital Twin 3D Model',
        description: 'Creation of Riga (RIX) airport 3D model.',
        longDescription: `<p>Creation of 3D model for RIX airport runways and surrounding territory. Modeled and textured the terrain, signage and other necessary objects, as well as buildings.
        <br><br>
        The model needed to be as performant as possible, so custom shaders were created for terrain texturing, to use Vertex Colors for masking. As well as, creation and use of texture atlases for signage, ground lines, etc.
        </p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Lipke+Memorial+VR'],
        details: [{ label: 'Platform', value: 'VR Standalone' }, { label: 'Type', value: '3D Model' }],
        icon: 'plane',
        tags: ['Blender', 'Unity', 'Amplify Shader'],
        isFeatured: false
    },
    {
        id: 'lipke-vr',
        title: 'Žanis Lipke Memorial VR Experience',
        description: 'A VR experience for the Žanis Lipke Memorial museum, allowing virtual exploration of the hideout used to save Jews in WWII.',
        longDescription: `<p>This VR application virtually recreates the woodsman's hut and the underground bunker where Žanis Lipke hid people during WWII. The experience allows users to explore the historical site and is used in the museum for educational purposes.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Lipke+Memorial+VR'],
        details: [{ label: 'Platform', value: 'VR Standalone' }, { label: 'Type', value: 'Museum Exhibit' }],
        links: [{ label: 'Lipke memorial', url: 'https://lipke.lv/en/' }],
        icon: 'landmark',
        tags: ['Unity', 'C#', 'VR', 'Blender'],
        isFeatured: false
    },
    {
        id: 'volga-heatwave',
        title: 'Volga Heatwave',
        description: 'A hobby game about a dog trapped in a hot car who must attract attention to be saved before the temperature gets too high.',
        longDescription: `<p>Volga Heatwave is a game about a dog trapped in a hot car who must attract the attention of passersby to be saved. The player's goal is to fill an "attention meter" by interacting with objects in the car, which makes a crowd gather outside. All the while, a temperature meter is constantly rising, and if it reaches its maximum value, the game is over. 
        <br><br>
        This was a solo project where I handled all development and art aspects.
        This was made for the Unity development course while attending masters studies in Vidzeme University.
        Afterwards, I polished the game and submitted it to the Latvian Gamedev association organized game jam/competition 'BRSD 12' (Beidz runāt, sāc darīt | Stop talking, start doing). Came in 7th out of 15 submissions.
        </p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Volga+Heatwave+Game'],
        videos: ['https://i.imgur.com/8pS1s7v.mp4'],
        details: [{ label: 'Platform', value: 'PC' }, { label: 'Type', value: 'Game' }],
        links: [
            { label: 'Play on itch.io', url: 'https://dustylv.itch.io/volga-heatwave' },
        ],
        icon: 'dog',
        tags: ['Unity', 'Blender'],
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
        details: [{ label: 'Platform', value: 'VR Standalone' }, { label: 'Type', value: 'Edutainment' }],
        icon: 'crab',
        tags: ['Unity', 'C#'],
        isFeatured: false
    },
    {
        id: 'izlidzi-vitolam',
        title: 'Izlīdzi vītolam',
        description: 'A Virtual Reality choir conducting game with gesture recognition.',
        longDescription: `<p>A Virtual Reality choir conducting game with gesture recognition. <br><br> The game serves as an interactive experience to see what a choir conductor does. The player has to perform various patterns with arm movements that correspond with what an actual conductor would make to give instructions to the choir.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Charity+Game'],
        details: [{ label: 'Platform', value: 'PC VR' }, { label: 'Type', value: 'Edutainment' }],
        icon: 'heart-handshake',
        tags: ['Unity', 'C#'],
        isFeatured: false
    },
    {
        id: 'zaao',
        title: 'ZAAO VR Sorting Game',
        description: 'A VR game for a waste management company (ZAAO) to educate players on proper waste sorting in an interactive way.',
        longDescription: `<p>This educational VR game gamifies the process of waste sorting. Players are placed in a virtual environment where they must correctly sort different types of trash into the appropriate bins under a time limit.</p><br>
      <p>The main challenge was the use of a 360° image for the background and 3D models for the interactable objects. This choice was made so that the game looks realistic. Creating the environment as a 3D model was not feasible as the game was supposed to run on an Oculus Go headset, and does not have the horsepower to process that much.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=ZAAO+VR+Game'],
        details: [{ label: 'Platform', value: 'Standalone VR' }, { label: 'Type', value: 'Edutainment' }],
        icon: 'recycle',
        tags: ['Unity', 'C#', 'VR', 'Blender'],
        isFeatured: false
    },
    {
        id: 'train-dispatch',
        title: 'Train Dispatcher Game',
        description: 'A train dispatch edutainment game for Gulbene train museum. ',
        longDescription: `<p>Allows the player to take on the role of a train dispatch and make decisions to divert trains to the correct rails. Gives an insight on what a train dispatch actually does. <br><br>
The player is given a description of the situation and they must choose an appropriate course of action from the given choices. </p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Train+Dispatcher+VR'],
        details: [{ label: 'Platform', value: 'PC' }, { label: 'Type', value: 'Edutainment' }],
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
        details: [{ label: 'Platform', value: 'Augmented Reality' }, { label: 'Type', value: '3D Model' }],
        icon: 'image-plus',
        tags: ['Blender', 'AR','Unity'],
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
        details: [{ label: 'Platform', value: 'Video' }, { label: 'Type', value: '3D Model' }],
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
        details: [{ label: 'Platform', value: 'PC VR' }, { label: 'Type', value: 'Simulation' }],
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
        details: [{ label: 'Platform', value: 'Standalone VR' }, { label: 'Type', value: 'Training' }],
        icon: 'cog',
        tags: ['Unity', 'VR', 'C#', 'Blender'],
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
        details: [{ label: 'Platform', value: 'Standalone VR' }, { label: 'Type', value: 'Training' }],
        icon: 'construction',
        tags: ['Unity', 'VR', 'C#', 'Blender'],
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
        details: [{ label: 'Platform', value: 'Standalone VR' }, { label: 'Type', value: 'Prototyping' }],
        icon: 'activity',
        tags: ['Unity', 'XR', 'C#'],
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
        details: [{ label: 'Platform', value: 'PC' }, { label: 'Type', value: 'Museum Exhibit' }],
        icon: 'layers',
        tags: ['Unity', 'VLC Player'],
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
        details: [{ label: 'Platform', value: 'PC' },{ label: 'Type', value: 'Educational Game' }],
        icon: 'map',
        tags: ['Unity', 'C#', 'SQLite'],
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
        details: [{ label: 'Platform', value: 'PC' },{ label: 'Type', value: 'Game' }],
        icon: 'rocket',
        tags: ['Unity', 'C#', 'Blender'],
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
        details: [{ label: 'Platform', value: 'VR & Flatscreen' },{ label: 'Type', value: 'Prototyping' }],
        icon: 'users',
        tags: ['Unity', 'VR', 'C#', 'Spatial.io SDK'],
        isFeatured: false
    },
    {
        id: 'blender-renders',
        title: 'Blender Renders',
        description: 'A collection of various 3D models and scenes created in Blender, focusing on stylized and game-ready assets.',
        longDescription: `<p>A personal showcase of my 3D modeling skills. This collection includes character models, props, and small environmental dioramas, demonstrating proficiency in modeling, texturing, and lighting within Blender.</p>`,
        images: ['https://placehold.co/1600x900/111111/a11a37?text=Blender+Scene'],
        details: [{ label: 'Type', value: '3D Model' }],
        icon: 'cubes',
        tags: ['Blender', '3D Art', 'PBR'],
        isFeatured: false
    }
];