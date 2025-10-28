
const sections = document.querySelectorAll(".section");
let sectionIndex;

window.addEventListener("scroll", trackSectionOnScroll);
window.addEventListener("load", trackSectionOnScroll);

function trackSectionOnScroll() {
  for (let i = 0; i < sections.length; i++) {
    if (
      sections[i].getBoundingClientRect().top < window.innerHeight / 1.8 &&
      sections[i].getBoundingClientRect().bottom > window.innerHeight / 1.6
    ) {
      sectionIndex = i;
      hightlightCurrentSection();
    }
  }
}
function hightlightCurrentSection() {
  const sideNavItems = document.querySelectorAll(".side-nav a");
  for (let i = 0; i < sideNavItems.length; i++) {
    if (sideNavItems[i].classList.contains("active")) {
      sideNavItems[i].classList.remove("active");
    }
  }
  if (!sideNavItems[sectionIndex].classList.contains("active")) {
    sideNavItems[sectionIndex].classList.add("active");
  }
}
const form = document.getElementById("my-form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.style.display = "block";
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML =
          "Thanks for reaching out! I'll get back to you soon.";
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});
// Typed.js
const typed = new Typed(".dynamic-title", {
  strings: ["Crafting modern, user-friendly web experiences.", "Turning ideas into clean, responsive code.", "Building sleek interfaces with attention to detail."],
  typeSpeed: 100,
  backSpeed: 100,
  loop: true,
});

// Theme
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector(".theme-icon")
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('theme-dark');
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('theme-light')) {
        body.classList.remove('theme-light');
        themeIcon.src = "../assets/images/icons/sun.svg"
        localStorage.setItem('theme', 'theme-dark'); 
      } else {
        body.classList.add('theme-light');
        themeIcon.src = "../assets/images/icons/moon.png"
        localStorage.setItem('theme', 'theme-light'); 
    }
});