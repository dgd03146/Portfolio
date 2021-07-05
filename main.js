"use strict";

// Make navbar trasparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});

// Handle click on "contact me" button on home
const home__contact = document.querySelector(".home__contact");
home__contact.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Handle scrolling when tapping on the side button
const pageBtn = document.querySelector(".pageBtn");
pageBtn.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  scrollIntoView(link);
});

// Make home slowly fade to transparent as the window scrolls down
const home__container = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  home__container.style.opacity = 1 - (window.scrollY / homeHeight - 0.25);
  console.log(home.style.opacity);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
