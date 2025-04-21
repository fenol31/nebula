document.addEventListener("DOMContentLoaded", function () {
  const starField = document.querySelector(".star-field");
  const numStars = 150;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    starField.appendChild(star);
  }
});