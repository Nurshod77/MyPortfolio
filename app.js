// Custom cursor
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mouseX = 0,
  mouseY = 0;
let ringX = 0,
  ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document
  .querySelectorAll(
    "a, button, .project-card, .service-item, .testimonial-card",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.opacity = "0.3";
      cursor.style.transform += " scale(1.5)";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.opacity = "0.5";
    });
  });

// Nav scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => observer.observe(el));

// Skill bar animation
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const pct = e.target.dataset.pct;
        e.target.style.setProperty("--pct", pct + "%");
        skillObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 },
);
document
  .querySelectorAll(".skill-item")
  .forEach((el) => skillObserver.observe(el));

// Form submit
document.getElementById("submit-btn").addEventListener("click", () => {
  const name = document.getElementById("f-name").value;
  const email = document.getElementById("f-email").value;
  const btn = document.getElementById("submit-btn");
  const txt = document.getElementById("submit-text");

  if (!name || !email) {
    btn.style.background = "var(--red)";
    txt.textContent = "Maydonlarni to'ldiring!";
    setTimeout(() => {
      btn.style.background = "";
      txt.textContent = "Yuborish →";
    }, 2000);
    return;
  }

  btn.classList.add("sent");
  txt.textContent = "Yuborildi ✓";
  setTimeout(() => {
    btn.classList.remove("sent");
    txt.textContent = "Yuborish →";
    document.getElementById("f-name").value = "";
    document.getElementById("f-email").value = "";
    document.getElementById("f-service").value = "";
    document.getElementById("f-message").value = "";
  }, 3000);
});

// Smooth scroll for nav
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Count up animation
document.querySelectorAll(".stat-num").forEach((el) => {
  const text = el.innerHTML;
  const match = text.match(/(\d+)/);
  if (!match) return;
  const target = parseInt(match[1]);
  let current = 0;
  const duration = 2000;
  const step = target / (duration / 16);

  const statObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.innerHTML = text.replace(/\d+/, Math.floor(current));
          if (current >= target) clearInterval(timer);
        }, 16);
        statObserver.unobserve(el);
      }
    },
    { threshold: 0.5 },
  );
  statObserver.observe(el);
});