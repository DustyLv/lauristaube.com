function getAllProjects() {
    let projectFilePath = "projects.html";

    $("#projectsContainer").load(projectFilePath);
    document.getElementById('projectsContainer').style.display = 'none';
    showPage(1);
}


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

    $("#projectInfoContent").load(projectFilePath); 
}




const projectsContainer = document.getElementById('projectsContainer');
const itemsPerPage = 3;
const totalProjects = document.querySelectorAll('#works .grid-item').length;
const totalPages = Math.ceil(totalProjects / itemsPerPage);
let currentPage = 1;



function showProjectsOnPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    document.querySelectorAll('#works .grid-item').forEach(function (project, index) {
        project.style.display = (index >= startIndex && index < endIndex) ? 'inline-block' : 'none';
    });
}

function showPage(page) {
    currentPage = page;
    showProjectsOnPage(currentPage);
}

function nextPage() {
    if (currentPage < totalPages) {
        pg = currentPage + 1;
        showPage(pg);
    }
}

function prevPage() {
    if (currentPage > 1) {
        pg = currentPage - 1;
        showPage(pg);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // getAllProjects();
    showPage(1);



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