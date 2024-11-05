"use strict";

(function() {
    let COURSES = [];

    function init() {
        const addCourseBtn = qs('#add-course-card');
        addCourseBtn.addEventListener('click', addCourse);
        const homeCourse = qs('#home-new-course');
        homeCourse.addEventListener('click', homeFromCourse);
        const homeAssignment = qs('#home-new-assignment');
        homeAssignment.addEventListener('click', homeFromAssignment);
        const createCourseBtn = qs('#create-course-btn');
        createCourseBtn.addEventListener('click', createCourse);
        const createAssignmentBtn = qs('#create-assignment-btn');
        createAssignmentBtn.addEventListener('click', () => {
            const courseName = id("current-course-name").value;
            createAssignment(courseName);
        });
    }

    function addCourse() {
        const mainView = qs("#home");
        const newCourse = qs('#new-course-view');
        newCourse.classList.remove('hidden');
        mainView.classList.add('hidden');

        const courseName = id("course-name");
        courseName.value = "";
    }

    function addAssignment(courseName) {
        const mainView = qs("#home");
        const newAssignment = qs('#new-assignment-view');
        newAssignment.classList.remove('hidden');
        mainView.classList.add('hidden');
    
        let header = qs("#new-assignment-view h2");
        header.textContent = `New Assignment for ${courseName}`;
    
        id("assignment-name").value = "";
        id("current-course-name").value = courseName; 
    }

    function createAssignment(courseName) {
        const assignmentName = id("assignment-name").value; 
        let course = qs(`#course-${String(courseName)}`);
        const existingAssignments = course.querySelectorAll('.assignment p');

        const assignment = gen("div");
        assignment.classList.add("assignment");
        const name = gen("p");
        name.textContent = assignmentName;
        const completeButton = gen("span");
        completeButton.classList.add("checkmark");
        completeButton.innerHTML = "&#x2714;";
        assignment.appendChild(name);
        assignment.appendChild(completeButton);
        course.appendChild(assignment);

        function handleCompleteButtonClick() {
            course.removeChild(assignment);
            completeButton.removeEventListener('click', handleCompleteButtonClick);
        }

        completeButton.addEventListener('click', handleCompleteButtonClick);

        homeFromAssignment();
    }

    function homeFromCourse() {
        const mainView = qs('#home');
        mainView.classList.remove('hidden');
        const newCourse = qs('#new-course-view');
        newCourse.classList.add('hidden');
        const existsMessage = qs('#course-already-exists');
        existsMessage.classList.add("hidden");
    }

    function homeFromAssignment() {
        const mainView = qs('#home');
        mainView.classList.remove('hidden');
        const newAssignment = qs('#new-assignment-view');
        newAssignment.classList.add('hidden');
    }

    function createCourse() {
        let courseName = id("course-name").value;

        if (COURSES.find(course => course.name === courseName)) {
            const existsMessage = qs('#course-already-exists');
            existsMessage.classList.remove("hidden");
            return;
        }
        
        COURSES.push({ name: courseName });
        const courses = qs('#courses');
        const course = gen("section");
        const courseHeader = gen("div");
        courseHeader.classList.add("course-header");
        course.classList.add("course");

        course.id = `course-${courseName}`;
        const name = gen("h2");
        name.textContent = courseName;
        const removeButton = gen("span");
        removeButton.classList.add("x");
        removeButton.innerHTML = "&times;";
        courseHeader.appendChild(name);
        courseHeader.appendChild(removeButton);

        const courseBody = gen("section");
        courseBody.classList.add("course-body");

        const newAssignment = gen("section");
        const newAssignmentWords = gen("p");
        const newAssignmentPlus = gen("h4");
        newAssignmentWords.textContent = "Add Assignment";
        newAssignmentPlus.textContent = "+";
        newAssignment.appendChild(newAssignmentWords);
        newAssignment.appendChild(newAssignmentPlus);
        newAssignment.classList.add('add-assignment-btn');
        newAssignment.addEventListener('click', () => {
            addAssignment(courseName);
        });
        course.appendChild(courseHeader);
        courseBody.appendChild(newAssignment);
        course.appendChild(courseBody);
        courses.appendChild(course);
        console.log(COURSES);

        removeButton.addEventListener('click', () => {
            COURSES = COURSES.filter(course => course.name != courseName);
            courses.removeChild(course);
        });

        homeFromCourse();
    }

    init(); 
})();
