"use strict";

// Make navbar trasparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
const closeMenuBtn = document.querySelector(".navbar__close-btn");

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
    navbarToggleBtn.style.top = "14px";
  } else {
    navbar.classList.remove("navbar--dark");
    navbarToggleBtn.style.top = "24px";
  }
});

// navbar toggle
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
const navbarMenu = document.querySelector(".navbar__menu");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");

  document.body.classList.add("disabled");
});

// closeMenu
closeMenuBtn.addEventListener("click", () => {
  navbarMenu.classList.remove("open");
  document.body.classList.remove("disabled");
});

// Handle scrolling when tapping on the navbar menu
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
  document.body.classList.toggle("disabled");
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

// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

// 관찰해야하는 모든 섹션요소들 가지고 온다.
const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map(
  (id) => document.querySelector(`[data-key="${id}"]`) // 네비게이션 메뉴아이템 받아오기
);

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected; // 해당하는 navItem을 가져온다.
  selectedNavItem.classList.add("active");
}

// scollIntoView
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      // 빠져나갈때(진입하지 않을때)
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        // 페이지가 내려가는 경우
        selectedNavIndex = index - 1;
      }
    }
  }); // 콜백안에서 해당하는 메뉴를 찾아서 navbar메뉴 활성화 시켜줘야한다.
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  // 사용자가 마우스나 트랙패드를 이용해서 스크롤하는 경우 발생
  if (window.scrollY === 0) {
    // 제일 위에있다면
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    // 젤 밑으로 도달했다면. scrollY + 현재 윈도우창의 높이 === 전체적인 높이와 동일하다면
    selectedNavIndex = navItems.length - 1; // 젤 마지막 인덱스를 가르킨다.
  }
  selectNavItem(navItems[selectedNavIndex]);
}); // 스크롤링이 될때마다 해당하는 메뉴 선택
