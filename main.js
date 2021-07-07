"use strict";

// navbar toggle
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
const navbarMenu = document.querySelector(".navbar__menu");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
  document.body.classList.toggle("disabled");
});

// Make navbar trasparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
    navbarToggleBtn.style.top = "14px";
  } else {
    navbar.classList.remove("navbar--dark");
    navbarToggleBtn.style.top = "24px";
  }
});

// Handle scrolling when tapping on the navbar menu
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  document.body.classList.toggle("disabled");
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
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector("#home");
const home__container = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  home__container.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const upArrow = document.querySelector(".upArrow");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    upArrow.classList.add("visible");
  } else {
    upArrow.classList.remove("visible");
  }
});

upArrow.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Fiter projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (event) => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;
  // dataset에 필터가 없으면 parent node의 필터를 쓴다.
  if (filter === null) {
    return;
  }
  // Remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    event.target.nodeName === "BUTTON" ? event.target : event.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });

    projectContainer.classList.remove("anim-out");
  }, 300);
});

// scollIntoView
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
