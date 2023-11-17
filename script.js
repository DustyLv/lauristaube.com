async function loadHtmlContent(filePath) {
    try {
        const response = await fetch(filePath);
        const htmlContent = await response.text();
        return htmlContent;
    } catch (error) {
        console.error('Error loading HTML content:', error);
        return null;
    }
}

function getAllProjects() {
    let projectFilePath = "projects.html";
    loadHtmlContent(projectFilePath)
        .then(htmlContent => {
            // You can manipulate or display the content as needed
            // For example, you can insert it into an element
            document.getElementById('projectsContainer').innerHTML = htmlContent;
        });
}

document.addEventListener('DOMContentLoaded', function () {
    // getAllProjects();



    function showProjectInfo(projectId) {
        getProjectInfoById(projectId);
        // document.getElementById('projectInfoContent').innerHTML = projectInfo;
        document.getElementById('projectInfoPopup').style.display = 'block';
    }

    function closeProjectInfo() {
        document.getElementById('projectInfoPopup').style.display = 'none';
    }

    function getProjectInfoById(projectId) {
        let pre = "./projects/";
        let mid = projectId;
        let post = ".html";
        let projectFilePath = pre.concat(mid, post);

        loadHtmlContent(projectFilePath)
            .then(htmlContent => {
                // You can manipulate or display the content as needed
                // For example, you can insert it into an element
                document.getElementById('projectInfoContent').innerHTML = htmlContent;
            });
    }

    // Add event listener to close the popup when clicking outside of it
    document.addEventListener('click', function (event) {
        const popup = document.getElementById('projectInfoPopup');
        const projectsGrid = document.querySelector('.gallery');

        // Check if the click is outside the popup and the projects grid
        if (!popup.contains(event.target) && !event.target.classList.contains('project')) {
            closeProjectInfo();
        }
    });

    // Add event listener to show the popup when clicking on a project
    document.querySelectorAll('#works .grid-item').forEach(function (project) {
        project.addEventListener('click', function (event) {
            showProjectInfo(this.getAttribute('data-project-id'));
            event.stopPropagation(); // Prevent the click event from propagating to the document
        });
    });

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            closeProjectInfo();
        }
    };
});

// --- PAGINATION ---
const projectsContainer = document.getElementById('projectsContainer');
const itemsPerPage = 3;
const totalProjects = document.querySelectorAll('#works .grid-item').length;
const totalPages = Math.ceil(totalProjects / itemsPerPage);
let currentPage = 1;
showPage(1);

function showProjectsOnPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    document.querySelectorAll('#works .grid-item').forEach(function (project, index) {
        project.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
    });
}

function showPage(page) {
    currentPage = page;
    showProjectsOnPage(currentPage);
}

function nextPage() {
    
    if (currentPage < totalPages) {
        pg = currentPage + 1;
        console.log(pg);
        showPage(pg);
    }
}

function prevPage() {
    
    if (currentPage > 1) {
        pg = currentPage - 1;
        console.log(pg);
        showPage(pg);
    }
}

// Initial display


// Example: Add event listeners for pagination controls
document.getElementById('pagination').addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const page = parseInt(event.target.innerText.split(' ')[1]); // Extract the page number from button text
        if (!isNaN(page)) {
            showPage(page);
        }
    }
});

    // --- PAGINATION END ---
