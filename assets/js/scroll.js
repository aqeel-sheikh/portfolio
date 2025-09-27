// Lenis
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Gsap

// Intro animation
gsap.from(".hero-section .fadeUp", {
  opacity: 0,
  y: 40,
  duration: 1,
  stagger: 0.1,   
  ease: "power2.out"
});
// Scroll based
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".scrollAnimate").forEach((el) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,           
      start: "top 80%",
      end: "bottom 90%",
      scrub: true,
    },
  });

  tl.to(el, {
    opacity: 1,
    y: 0,
    duration: 1,
  });
});
