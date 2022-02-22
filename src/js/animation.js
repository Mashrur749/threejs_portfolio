import gsap from "gsap";

const timeline = gsap.timeline({
  defaults: {
    duration: 1,
  },
});

timeline
  .from("nav", {
    y: -100,
    opacity: 0,
    delay: 2,
  })
  .from("#headshot", {
    y: -100,
    opacity: 0,
  })
  .from(
    "#site-header",
    {
      y: 100,
      opacity: 0,
    },
    "<"
  )
  .from("#arrow-icon", {
    opacity: 0,
  })
  .from(
    "#arrow-icon",
    {
      y: 20,
      ease: "power3",
      repeat: -1,
      yoyo: true,
    },
    "<"
  );
