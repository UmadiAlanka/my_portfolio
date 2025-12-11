// Scroll section active link
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            // Active navbar links
            navLinks.forEach(links => {
                links.classList.remove("active");
            });
            document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
        }
    });

    // Sticky header
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 100);
};

// Mobile menu toggle
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("fa-xmark");
    navbar.classList.toggle("active");
};

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove("fa-xmark");
        navbar.classList.remove("active");
    };
});

// EmailJS contact form
function sendMail(event) {
    event.preventDefault(); // Stop form from reloading

    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        number: document.getElementById("number").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    emailjs.send("service_me14rt9", "template_26yrjs6", parms)
        .then(() => {
            alert("Email sent successfully!");
            // Reset form
            event.target.reset();
        })
        .catch((err) => {
            alert("Error: " + JSON.stringify(err));
        });
}