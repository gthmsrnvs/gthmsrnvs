import { gsap } from 'gsap';

// Function for parallax effect on project cards
function onCardMouseMove(event) {
    const card = event.currentTarget;
    const boundingRect = card.getBoundingClientRect();
    const relX = event.clientX - boundingRect.left;
    const relY = event.clientY - boundingRect.top;
    const centerX = boundingRect.width / 2;
    const centerY = boundingRect.height / 2;

    const deltaX = (relX - centerX) / centerX;
    const deltaY = (relY - centerY) / centerY;

    const rotationX = deltaY * 10; // Rotation around the X-axis
    const rotationY = deltaX * -10; // Rotation around the Y-axis

    gsap.to(card, {
        rotationX: rotationX,
        rotationY: rotationY,
        boxShadow: "0px 20px 30px rgba(0,0,0,0.3)",
        ease: 'power1.out',
        transformPerspective: 500,
        duration: 0.3
    });
}

function onCardMouseOut(event) {
    const card = event.currentTarget;
    gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
        ease: 'power1.out',
        duration: 0.3
    });
}

// Function to show project details in modal
function showProjectDetails(projectId) {
    document.getElementById(projectId).style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}

// Function to close all modals and overlay
function closeAllModals() {
    document.querySelectorAll('.project-details').forEach(modal => {
        modal.style.display = 'none';
    });
    document.querySelector('.overlay').style.display = 'none';
}

// Event listeners for project cards
document.querySelectorAll('.project-item').forEach(card => {
    card.addEventListener('click', function() {
        const projectId = this.id + '-details';
        showProjectDetails(projectId);
    });

    card.addEventListener('mousemove', onCardMouseMove);
    card.addEventListener('mouseleave', onCardMouseOut);
});

// Event listeners for close buttons in modals
document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', closeAllModals);
});

// Business card interaction (if applicable)
const businessCard = document.querySelector('.business-card');
if (businessCard) {
    businessCard.addEventListener('mousemove', onCardMouseMove);
    businessCard.addEventListener('mouseleave', onCardMouseOut);
}
