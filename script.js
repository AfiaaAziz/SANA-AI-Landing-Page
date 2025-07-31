document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initMobileMockup();
  initTestimonialSlider();
  initAdvancedScrollAnimations();
  initFaqAccordion();
  initDemoModal();
  initHeroParallax();
});

function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger-menu");
  if (!hamburger) return;
  const navLinks = document.querySelector(".nav-links");
  const hamburgerIcon = hamburger.querySelector("i");
  if (!navLinks || !hamburgerIcon) return;
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const isActive = navLinks.classList.contains("active");
    hamburgerIcon.className = isActive ? "fas fa-times" : "fas fa-bars";
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburgerIcon.className = "fas fa-bars";
    });
  });
}

function initMobileMockup() {
  const answerButton = document.getElementById("answer-button");
  const playButton = document.getElementById("play-button");
  const callScreen = document.getElementById("call-screen");
  const playScreen = document.getElementById("play-screen");
  const playingScreen = document.getElementById("playing-screen");
  const audio = document.getElementById("sana-audio");
  const currentTimeEl = document.getElementById("current-time");
  const totalTimeEl = document.getElementById("total-time");

  if (answerButton) {
    answerButton.addEventListener("click", () => {
      callScreen.classList.remove("active");
      playScreen.classList.add("active");
    });
  }
  if (playButton) {
    playButton.addEventListener("click", () => {
      playScreen.classList.remove("active");
      playingScreen.classList.add("active");
      if (audio) audio.play().catch(console.error);
    });
  }
  if (audio) {
    audio.addEventListener("ended", () => {
      playingScreen.classList.remove("active");
      callScreen.classList.add("active");
    });
    audio.addEventListener("timeupdate", () => {
      if (isNaN(audio.duration)) return;
      const formatTime = (time) =>
        `${Math.floor(time / 60)}:${Math.floor(time % 60)
          .toString()
          .padStart(2, "0")}`;
      if (currentTimeEl)
        currentTimeEl.textContent = formatTime(audio.currentTime);
      if (totalTimeEl && !totalTimeEl.textContentSet) {
        totalTimeEl.textContent = formatTime(audio.duration);
        totalTimeEl.textContentSet = true;
      }
    });
  }
}

function initHeroParallax() {
  const heroImage = document.querySelector(".mobile-mockup");
  const hero = document.querySelector(".hero");
  if (!heroImage || !hero) return;

  hero.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const { offsetWidth, offsetHeight } = hero;
    const xPos = (clientX / offsetWidth - 0.5) * 30;
    const yPos = (clientY / offsetHeight - 0.5) * 30;

    heroImage.style.transform = `rotateY(${xPos}deg) rotateX(${-yPos}deg) translateZ(20px)`;
  });

  hero.addEventListener("mouseleave", () => {
    heroImage.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0)";
  });
}

function initTestimonialSlider() {
  const wrapper = document.querySelector(".testimonial-wrapper");
  const slides = document.querySelectorAll(".review-slide");
  const prevBtn = document.getElementById("prev-testimonial");
  const nextBtn = document.getElementById("next-testimonial");

  if (!wrapper || !prevBtn || !nextBtn || slides.length === 0) return;

  let currentIndex = 0;
  const showTestimonial = (index) => {
    wrapper.style.transform = `translateX(-${index * 100}%)`;
  };

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showTestimonial(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showTestimonial(currentIndex);
  });

  showTestimonial(0);
}

function initAdvancedScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".content-section, .feature-card, .step-card, .result-card"
  );
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.style.transitionDelay || "0");

          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px", // Trigger a bit earlier
    }
  );

  animatedElements.forEach((el) => {
    el.classList.add("animate-on-scroll");
  });

  const grids = document.querySelectorAll(
    ".features-grid, .steps-grid, .results-grid"
  );
  grids.forEach((grid) => {
    const items = grid.querySelectorAll(".animate-on-scroll");
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 100}ms`;
    });
  });

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  const style = document.createElement("style");
  style.innerHTML = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .animate-on-scroll.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}

function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length === 0) return;
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach((other) => other.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

function initDemoModal() {
  const openModalBtn = document.getElementById("open-demo-modal");
  const modalOverlay = document.getElementById("demo-modal");
  if (!openModalBtn || !modalOverlay) return;

  const closeModalBtn = modalOverlay.querySelector(".modal-close-btn");
  const demoForm = document.getElementById("demo-form");
  const formContainer = document.getElementById("form-container");
  const successMessage = document.getElementById("success-message");
  const submitBtn = document.getElementById("submit-btn");
  const errorMessage = document.getElementById("form-error");
  const dateInput = document.getElementById("date");

  const googleScriptURL =
    "https://script.google.com/macros/s/AKfycby0_9PMfhKJnlvUutKO7ugr0Vi5cwCPxetWuq5omwUWvymH-p2hEhcUVZwPw95dl_ED/exec";

  const emailApiURL = "https://53082e1ef006.ngrok-free.app/send-confirmation";
  if (dateInput) {
    dateInput.min = new Date().toISOString().split("T")[0];
  }

  const openModal = () => modalOverlay.classList.add("active");
  const closeModal = () => modalOverlay.classList.remove("active");

  openModalBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) closeModal();
  });

  demoForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    errorMessage.style.display = "none";

    const formData = new FormData(demoForm);
    const userName = formData.get("name");
    const userEmail = formData.get("email");

    try {
      const googleResponse = await fetch(googleScriptURL, {
        method: "POST",
        body: formData,
      });
      const googleResult = await googleResponse.json();

      if (googleResult.result !== "success") {
        if (googleResult.error === "duplicate") {
          throw new Error("This email has already been registered for a demo.");
        }
        throw new Error("Failed to save your request. Please try again.");
      }

      try {
        await fetch(emailApiURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: userName, email: userEmail }),
        });
      } catch (emailError) {
        console.error("Email API Error:", emailError);
      }

      formContainer.style.display = "none";
      successMessage.style.display = "block";
      demoForm.reset();
    } catch (error) {
      console.error("Submission Error:", error);
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Request";
    }
  });
}
