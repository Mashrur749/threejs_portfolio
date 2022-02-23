import gsap from "gsap";

const timeline = gsap.timeline({
  defaults: {
    duration: 1,
  },
});

timeline
  .from(".ripple", {
    x: -0,
    y: -120,
  })
  .from(
    ".ripple",
    {
      opacity: 0,
      height: 0,
      width: 0,
      opacity: 1,
      ease: "Sine.easeOut",
      duration: 3,
      stagger: 0.15,
      delay: 0.5,
    },
    "<.3"
  )
  .to(
    "#loader",
    {
      opacity: 0,
      visibility: "hidder",
      duration: 2,
    },
    "<"
  )
  .from(
    "nav a",
    {
      y: -100,
      opacity: 0,
    },
    "<.5"
  )
  .from(
    "#headshot",
    {
      opacity: 0,
    },
    "<.8"
  )
  .from(
    "#site-header",
    {
      y: 100,
      opacity: 0,
    },
    "<"
  )
  .from(
    "#arrow-icon",
    {
      opacity: 0,
    },
    "<.5"
  )
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
