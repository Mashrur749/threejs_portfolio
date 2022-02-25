import gsap from "gsap";

const formContainer = document.querySelector("#form-container");

const hideForm = (e) => {
  if (e.target.classList.toString().includes("hide-form")) {
    let t1 = gsap.timeline({
      onComplete: () => {
        formContainer.style.display = "none";
      },
    });
    t1.to(formContainer, {
      opacity: 0,
      duration: 0.5,
    }).to(
      formContainer,
      {
        zIndex: -1,
      },
      "<"
    );
  }
};

const showForm = (e) => {
  if (
    e.target.id.toLowerCase() === "nav-contact-btn" ||
    e.target.id === "nav-contact-icon"
  ) {
    formContainer.style.display = "flex";
    let t1 = gsap.timeline();
    t1.to(formContainer, {
      opacity: 1,
      duration: 0.5,
    }).to(
      e.target,
      {
        zIndex: 10,
      },
      "<"
    );
  }
};

document.querySelector(".contact").addEventListener("click", showForm);

formContainer.addEventListener("click", hideForm);

document.querySelector("#close-form").addEventListener("click", hideForm);

const timeline = gsap.timeline({
  defaults: {
    duration: 1,
  },
});

timeline
  .from(".ripple", {
    x: -0,
    y: -150,
    delay: 0.3,
    border: 15,
    opacity: 1,
  })
  .from(".ripple", {
    opacity: 0,
    height: 0,
    width: 0,
    border: 30,
    opacity: 0.7,
    ease: "Sine.easeOut",
    duration: 3,
    stagger: 0.15,
    delay: 0.5,
  })
  .to(
    "#loader",
    {
      opacity: 0,
      visibility: "hidder",
      duration: 2,
      zIndex: -10,
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
