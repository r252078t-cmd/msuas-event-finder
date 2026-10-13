/* =====================================================
   MSUAS UNIVERSITY EVENT FINDER
   Main JavaScript
===================================================== */


/* =====================================================
   1. EVENT DATA
===================================================== */

const events = [
    {
        id: 1,
        title: "Student Research Symposium",
        category: "Academic",
        date: "2026-10-15",
        time: "09:00",
        location: "Main Auditorium",
        organiser: "Faculty of Science",
        description:
            "A student research event where students present projects, research findings and innovative ideas.",
        icon: "📚"
    },

    {
        id: 2,
        title: "Campus Career Fair",
        category: "Career",
        date: "2026-10-21",
        time: "10:00",
        location: "University Hall",
        organiser: "Career Services",
        description:
            "Meet employers, explore career opportunities and learn about internships and graduate employment.",
        icon: "💼"
    },

    {
        id: 3,
        title: "Interfaculty Football Tournament",
        category: "Sports",
        date: "2026-10-24",
        time: "14:00",
        location: "University Sports Ground",
        organiser: "Sports Department",
        description:
            "An exciting football tournament bringing students from different faculties together.",
        icon: "⚽"
    },

    {
        id: 4,
        title: "Student Welcome Social",
        category: "Social",
        date: "2026-10-30",
        time: "16:00",
        location: "Student Centre",
        organiser: "Student Union",
        description:
            "A social gathering designed to help students meet new people and enjoy campus activities.",
        icon: "🎉"
    },

    {
        id: 5,
        title: "Python for Beginners Workshop",
        category: "Workshop",
        date: "2026-11-05",
        time: "09:00",
        location: "Computer Lab 2",
        organiser: "Computing Club",
        description:
            "A beginner-friendly workshop introducing students to Python programming and basic coding concepts.",
        icon: "💻"
    },

    {
        id: 6,
        title: "Entrepreneurship Talk",
        category: "Career",
        date: "2026-11-10",
        time: "11:00",
        location: "Business Lecture Theatre",
        organiser: "Business Society",
        description:
            "An interactive discussion about entrepreneurship, innovation and opportunities for student entrepreneurs.",
        icon: "🚀"
    }
];


/* =====================================================
   2. GET HTML ELEMENTS
===================================================== */

const eventsContainer =
    document.getElementById("eventsContainer");

const eventCount =
    document.getElementById("eventCount");

const noEventsMessage =
    document.getElementById("noEventsMessage");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const dateFilter =
    document.getElementById("dateFilter");

const clearFilters =
    document.getElementById("clearFilters");

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const registrationForm =
    document.getElementById("registrationForm");

const formMessage =
    document.getElementById("formMessage");

const eventModal =
    document.getElementById("eventModal");

const closeModal =
    document.getElementById("closeModal");

const modalBody =
    document.getElementById("modalBody");


/* =====================================================
   3. FAVOURITES
===================================================== */

let savedEvents =
    JSON.parse(localStorage.getItem("savedEvents")) || [];


/* =====================================================
   4. FORMAT DATE
===================================================== */

function formatDate(dateString) {

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


/* =====================================================
   5. DISPLAY EVENTS
===================================================== */

function displayEvents(eventList) {

    eventsContainer.innerHTML = "";


    if (eventList.length === 0) {

        noEventsMessage.hidden = false;

        eventCount.textContent =
            "No events match your search.";

        return;
    }


    noEventsMessage.hidden = true;


    eventCount.textContent =
        `Showing ${eventList.length} event${eventList.length !== 1 ? "s" : ""}`;


    eventList.forEach(event => {

        const isSaved =
            savedEvents.includes(event.id);


        const eventCard =
            document.createElement("article");

        eventCard.className = "event-card";


        eventCard.innerHTML = `

            <div class="event-image"
                 aria-hidden="true">

                ${event.icon}

            </div>


            <div class="event-content">

                <span class="event-category">
                    ${event.category}
                </span>


                <h3 class="event-title">
                    ${event.title}
                </h3>


                <p class="event-description">
                    ${event.description}
                </p>


                <div class="event-meta">

                    <span>
                        📅 ${formatDate(event.date)}
                    </span>

                    <span>
                        🕐 ${event.time}
                    </span>

                    <span>
                        📍 ${event.location}
                    </span>

                </div>


                <div class="event-actions">

                    <button
                        type="button"
                        class="btn btn-primary details-btn"
                        data-id="${event.id}">

                        View Details

                    </button>


                    <button
                        type="button"
                        class="btn btn-secondary save-btn"
                        data-id="${event.id}">

                        ${isSaved ? "❤️ Saved" : "♡ Save Event"}

                    </button>

                </div>

            </div>

        `;


        eventsContainer.appendChild(eventCard);

    });


    attachEventButtons();
}


/* =====================================================
   6. SEARCH & FILTER
===================================================== */

function filterEvents() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedCategory =
        categoryFilter.value;


    const selectedDate =
        dateFilter.value;


    const filteredEvents =
        events.filter(event => {

            const matchesSearch =
                event.title
                    .toLowerCase()
                    .includes(searchTerm) ||

                event.description
                    .toLowerCase()
                    .includes(searchTerm) ||

                event.location
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesCategory =
                selectedCategory === "all" ||
                event.category === selectedCategory;


            const matchesDate =
                selectedDate === "" ||
                event.date === selectedDate;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesDate
            );

        });


    displayEvents(filteredEvents);
}


/* =====================================================
   7. EVENT BUTTONS
===================================================== */

function attachEventButtons() {

    const detailsButtons =
        document.querySelectorAll(".details-btn");


    const saveButtons =
        document.querySelectorAll(".save-btn");


    detailsButtons.forEach(button => {

        button.addEventListener("click", () => {

            const eventId =
                Number(button.dataset.id);

            showEventDetails(eventId);

        });

    });


    saveButtons.forEach(button => {

        button.addEventListener("click", () => {

            const eventId =
                Number(button.dataset.id);

            toggleSavedEvent(eventId);

        });

    });

}


/* =====================================================
   8. EVENT DETAILS MODAL
===================================================== */

function showEventDetails(eventId) {

    const event =
        events.find(item => item.id === eventId);


    if (!event) {
        return;
    }


    modalBody.innerHTML = `

        <span class="event-category">
            ${event.category}
        </span>

        <h2 id="modalTitle">
            ${event.title}
        </h2>

        <p>
            ${event.description}
        </p>

        <br>

        <p>
            <strong>📅 Date:</strong>
            ${formatDate(event.date)}
        </p>

        <p>
            <strong>🕐 Time:</strong>
            ${event.time}
        </p>

        <p>
            <strong>📍 Location:</strong>
            ${event.location}
        </p>

        <p>
            <strong>🏫 Organiser:</strong>
            ${event.organiser}
        </p>

        <br>

        <button
            type="button"
            class="btn btn-primary"
            onclick="closeEventModal()">

            Close Details

        </button>

    `;


    eventModal.hidden = false;

    document.body.style.overflow = "hidden";

    closeModal.focus();
}


/* =====================================================
   9. CLOSE MODAL
===================================================== */

function closeEventModal() {

    eventModal.hidden = true;

    document.body.style.overflow = "";

}


closeModal.addEventListener(
    "click",
    closeEventModal
);


eventModal.addEventListener(
    "click",
    event => {

        if (event.target === eventModal) {
            closeEventModal();
        }

    }
);


/* =====================================================
   10. KEYBOARD MODAL CONTROL
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !eventModal.hidden
        ) {

            closeEventModal();

        }

    }
);


/* =====================================================
   11. SAVE / UNSAVE EVENTS
===================================================== */

function toggleSavedEvent(eventId) {

    if (savedEvents.includes(eventId)) {

        savedEvents =
            savedEvents.filter(
                id => id !== eventId
            );

    } else {

        savedEvents.push(eventId);

    }


    localStorage.setItem(
        "savedEvents",
        JSON.stringify(savedEvents)
    );


    filterEvents();

}


/* =====================================================
   12. CLEAR FILTERS
===================================================== */

clearFilters.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        categoryFilter.value = "all";

        dateFilter.value = "";

        displayEvents(events);

    }
);


/* =====================================================
   13. SEARCH EVENTS
===================================================== */

searchInput.addEventListener(
    "input",
    filterEvents
);


categoryFilter.addEventListener(
    "change",
    filterEvents
);
// Allow P5.js to filter events by category
function filterEventsByCategory(category) {
    categoryFilter.value = category;
    filterEvents();
}

dateFilter.addEventListener(
    "change",
    filterEvents
);


/* =====================================================
   14. CATEGORY CARDS
===================================================== */

const categoryCards =
    document.querySelectorAll(".category-card");


categoryCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const category =
                card.dataset.category;


            categoryFilter.value =
                category;


            filterEvents();


            document
                .getElementById("events")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});


/* =====================================================
   15. MOBILE NAVIGATION
===================================================== */

menuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            navMenu.classList.toggle("active");


        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    }
);


/* Close mobile menu after clicking a link */

const navLinks =
    document.querySelectorAll(
        ".main-navigation a"
    );


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navMenu.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );

});


/* =====================================================
   16. REGISTRATION FORM VALIDATION
===================================================== */

registrationForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById("studentName")
                .value
                .trim();


        const email =
            document
                .getElementById("studentEmail")
                .value
                .trim();


        const category =
            document
                .getElementById("interestCategory")
                .value;


        if (
            name === "" ||
            email === "" ||
            category === ""
        ) {

            formMessage.textContent =
                "Please complete all required fields.";

            formMessage.style.color =
                "#b42318";

            return;
        }


        formMessage.textContent =
            `Thank you, ${name}! Your event interest has been registered.`;

        formMessage.style.color =
            "#18794e";


        registrationForm.reset();

    }
);


/* =====================================================
   17. INITIAL DISPLAY
===================================================== */

displayEvents(events);
/* =====================================================
   FORCE MODAL CLOSE
===================================================== */

closeModal.onclick = function () {
    eventModal.hidden = true;
    document.body.style.overflow = "";
};

eventModal.onclick = function (event) {
    if (event.target === eventModal) {
        eventModal.hidden = true;
        document.body.style.overflow = "";
    }
};

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        eventModal.hidden = true;
        document.body.style.overflow = "";
    }
});

// =====================================================
// LIGHT / DARK MODE
// =====================================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        // Switch between light and dark mode
        document.body.classList.toggle("dark-mode");

        // Check which mode is currently active
        const darkModeEnabled =
            document.body.classList.contains("dark-mode");

        // Change the button text
        if (darkModeEnabled) {

            themeToggle.textContent = "☀️ Light Mode";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        } else {

            themeToggle.textContent = "🌙 Dark Mode";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }

        // Remember the user's choice
        localStorage.setItem(
            "darkMode",
            darkModeEnabled
        );
    });


    // Restore the user's previous choice
    const savedDarkMode =
        localStorage.getItem("darkMode");

    if (savedDarkMode === "true") {

        document.body.classList.add("dark-mode");

        themeToggle.textContent = "☀️ Light Mode";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );
    }
}