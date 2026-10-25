const header = document.querySelector(".site-header");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);

  let currentId = "home";
  sections.forEach((section) => {
    const top = section.offsetTop - 130;
    if (window.scrollY >= top) currentId = section.id;
  });

  navItems.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`
    );
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

function setError(id, message) {
  document.querySelector(`#${id}Error`).textContent = message;
}

function clearErrors() {
  setError("name", "");
  setError("email", "");
  setError("message", "");
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();

  let valid = true;

  if (name.length < 2) {
    setError("name", "Please enter your name.");
    valid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "Please enter a valid email address.");
    valid = false;
  }

  if (message.length < 10) {
    setError("message", "Message should contain at least 10 characters.");
    valid = false;
  }

  if (!valid) {
    formStatus.textContent = "Please correct the highlighted fields.";
    return;
  }

  formStatus.textContent =
    "Message validated successfully. Demo mode: no email was sent.";
  formStatus.classList.add("success");
  contactForm.reset();
});
