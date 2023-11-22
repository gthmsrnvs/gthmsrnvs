import { gsap } from 'gsap';

// Function to show project details in modal
function showProjectDetails(projectId) {
    const projectModal = document.getElementById(projectId);
    if (projectModal) {
        projectModal.style.display = 'block';
    } else {
        console.error('Project modal not found for:', projectId);
    }
}

// Function to close all modals
function closeAllModals() {
    document.querySelectorAll('.project-details').forEach(modal => {
        modal.style.display = 'none';
    });
}

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

    gsap.to(card, {
        rotationX: deltaY * 10,
        rotationY: deltaX * -10,
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

// Event listeners for project cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-item').forEach(card => {
        card.addEventListener('click', function () {
            const projectId = this.id + '-details';
            showProjectDetails(projectId);
        });

        card.addEventListener('mousemove', onCardMouseMove);
        card.addEventListener('mouseleave', onCardMouseOut);

        // Video interaction
        const video = card.querySelector('.prototype-video');
        if (video && video.src) {
            card.addEventListener('mouseenter', () => video.play());
            card.addEventListener('mouseleave', () => video.pause());
        }
    });

    // Event listeners for close buttons in modals
    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', closeAllModals);
    });

    // Business card interaction
    const businessCard = document.querySelector('.business-card');
    if (businessCard) {
        businessCard.addEventListener('mousemove', onCardMouseMove);
        businessCard.addEventListener('mouseleave', onCardMouseOut);
    }
});
