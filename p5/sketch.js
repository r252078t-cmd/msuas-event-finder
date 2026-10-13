// =====================================================
// MSUAS UNIVERSITY EVENT FINDER
// P5.JS INTERACTIVE EVENT VISUALISATION
// =====================================================

let eventCircles = [];

const categories = [
    "Academic",
    "Career",
    "Sports",
    "Social",
    "Workshop"
];

function setup() {

    let canvas = createCanvas(800, 420);
    canvas.elt.style.cursor = "pointer"; 

    // Put the canvas inside the P5 container
    canvas.parent("p5-container");

    // Create one circle for each category
    for (let i = 0; i < categories.length; i++) {

        eventCircles.push({
            x: 100 + i * 140,
            y: 210,
            size: 80,
            category: categories[i],
            speedX: random(-1.5, 1.5),
            speedY: random(-1.2, 1.2)
        });
    }
}


function draw() {

    background(245, 247, 250);

    // Title
    fill(16, 42, 67);
    noStroke();
    textAlign(CENTER);
    textSize(22);
    text("Interactive Campus Event Visualisation", width / 2, 35);

    // Instruction
    fill(80);
    textSize(14);
    text(
        "Move your mouse over a circle, then click it to filter events",
        width / 2,
        60
    );


    // Draw each event category circle
    for (let i = 0; i < eventCircles.length; i++) {

        let event = eventCircles[i];

        // Move the circle
        event.x += event.speedX;
        event.y += event.speedY;


        // Bounce from left and right
        if (
            event.x - event.size / 2 < 0 ||
            event.x + event.size / 2 > width
        ) {
            event.speedX *= -1;
        }


        // Bounce from top and bottom
        if (
            event.y - event.size / 2 < 80 ||
            event.y + event.size / 2 > height
        ) {
            event.speedY *= -1;
        }


        // Check whether mouse is over the circle
        let distanceFromCircle = dist(
            mouseX,
            mouseY,
            event.x,
            event.y
        );


        // Make circle larger when mouse is nearby
        let displaySize = event.size;

        if (distanceFromCircle < event.size / 2) {
            displaySize = event.size + 20;
        }


        // Circle
        // Give each category its own colour
if (event.category === "Academic") {
    fill(52, 152, 219);
} 
else if (event.category === "Career") {
    fill(46, 125, 50);
} 
else if (event.category === "Sports") {
    fill(231, 76, 60);
} 
else if (event.category === "Social") {
    fill(155, 89, 182);
} 
else if (event.category === "Workshop") {
    fill(243, 156, 18);
}

ellipse(
    event.x,
    event.y,
    displaySize,
    displaySize
);

        // Category name
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(13);
        text(
            event.category,
            event.x,
            event.y
        );
    }
}


// =====================================================
// MOUSE CLICK
// =====================================================

function mousePressed() {

    for (let i = 0; i < eventCircles.length; i++) {

        let event = eventCircles[i];

        let distanceFromCircle = dist(
            mouseX,
            mouseY,
            event.x,
            event.y
        );

        if (distanceFromCircle <= event.size / 2) {

            const categorySelect =
                document.getElementById("categoryFilter");

            if (categorySelect) {

                categorySelect.value = event.category;

                categorySelect.dispatchEvent(
                    new Event("change", {
                        bubbles: true
                    })
                );

                const eventsSection =
                    document.getElementById("events");

                if (eventsSection) {

                    eventsSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }

            break;
        }
    }
}