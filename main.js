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
  console.log("hi");
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: "smooth" });
});

const home__contact = document.querySelector(".home__contact");
home__contact.addEventListener("click", () => {
  const contact = document.querySelector("#contact");
  contact.scrollIntoView({ behavior: "smooth" });
});

// Handle scrolling when tapping on the side button

const pageBtn = document.querySelector(".pageBtn");
pageBtn.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: "smooth" });
});
