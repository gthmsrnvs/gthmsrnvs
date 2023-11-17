import { gsap } from 'gsap';

// Function to move the card on mouse move with parallax effect and shadow
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
    boxShadow: "0px 20px 30px rgba(0,0,0,0.3)", // Adds shadow
    ease: 'power1.out',
    transformPerspective: 500,
    duration: 0.3
  });
}

// Function to reset the card style on mouse out
function onCardMouseOut(event) {
  const card = event.currentTarget;
  gsap.to(card, {
    rotationX: 0,
    rotationY: 0,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)", // Reset shadow
    ease: 'power1.out',
    duration: 0.3
  });
}

// Function to play the video on hover and show it above the content
function onCardMouseEnter(event) {
  const card = event.currentTarget;
  const video = card.querySelector('video');
  video.play();
  gsap.to(video, {
    duration: 0.5,
    opacity: 1,
    zIndex: 1, // Ensure the video is above other content
  });
}

// Function to pause the video on mouse leave and hide it
function onCardMouseLeave(event) {
  const card = event.currentTarget;
  const video = card.querySelector('video');
  video.pause();
  video.currentTime = 0; // Optional: Reset the video to start
  gsap.to(video, {
    duration: 0.5,
    opacity: 0,
    zIndex: -1, // Reset the stacking order
  });
}

// Add the event listeners to each project card
document.querySelectorAll('.project-item').forEach((card) => {
  card.addEventListener('mousemove', onCardMouseMove);
  card.addEventListener('mouseleave', onCardMouseOut);
  card.addEventListener('mouseenter', onCardMouseEnter);
  card.addEventListener('mouseleave', onCardMouseLeave);
});