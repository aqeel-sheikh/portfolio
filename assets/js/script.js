const swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const sections = document.querySelectorAll(".section")
let sectionIndex;

window.addEventListener("scroll", trackSectionOnScroll);
window.addEventListener("load", trackSectionOnScroll)

function trackSectionOnScroll () {
    for(let i = 0; i < sections.length; i++){
        if(sections[i].getBoundingClientRect().top < window.innerHeight / 1.8 && sections[i].getBoundingClientRect().bottom > window.innerHeight / 1.6){
            sectionIndex = i
            hightlightCurrentSection()
        }
    }
}
function hightlightCurrentSection(){
    const sideNavItems = document.querySelectorAll(".side-nav a");
    for(let i = 0; i < sideNavItems.length; i++){
        if(sideNavItems[i].classList.contains("active")){
            sideNavItems[i].classList.remove("active")
        }
    }
    if(!sideNavItems[sectionIndex].classList.contains("active")){
        sideNavItems[sectionIndex].classList.add("active")
    }
}
const form = document.getElementById('my-form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.style.display = "block"
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Thanks for reaching out! I'll get back to you soon.";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});