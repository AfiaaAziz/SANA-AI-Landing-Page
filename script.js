document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initMobileMockup();
  initTestimonialSlider();
  initAdvancedScrollAnimations();
  initFaqAccordion();
  initDemoModal();
  initHeroParallax();
  initChatbot();
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
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

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

  animatedElements.forEach((el, index) => {
    el.classList.add("animate-on-scroll");
    el.style.transitionDelay = `${(index % 6) * 100}ms`;
    observer.observe(el);
  });
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
  const emailApiURL = "http://35.200.238.100:8004/send-confirmation";

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
        throw new Error(
          googleResult.error === "duplicate"
            ? "This email has already been registered."
            : "Failed to save your request. Please try again."
        );
      }

      fetch(emailApiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, email: userEmail }),
      }).catch((emailError) => console.error("Email API Error:", emailError));

      formContainer.style.display = "none";
      successMessage.style.display = "block";
      demoForm.reset();
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Request";
    }
  });
}

function initChatbot() {
  const chatbotLogoContainer = document.getElementById(
    "chatbot-logo-container"
  );
  const chatContainer = document.getElementById("chat-container");
  const welcomeScreen = document.getElementById("welcome-screen");
  const chatScreen = document.getElementById("chat-screen");
  const contactBtn = document.getElementById("contact-btn");
  const contactNavBtn = document.getElementById("contact-nav-btn");
  const backBtn = document.getElementById("back-btn");
  const homeBtn = document.getElementById("home-btn");
  const minimizeWelcome = document.getElementById("minimize-welcome");
  const minimizeChat = document.getElementById("minimize-chat");
  const dotsBtn = document.getElementById("dots-btn");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const clearChatBtn = document.getElementById("clear-chat-btn");
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const typingIndicator = document.getElementById("typing-indicator");

  if (!chatContainer) return;

  let chatHistory = [];
  const endUserId = generateUUID();

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const openChat = () => {
    chatContainer.classList.add("open");
    chatbotLogoContainer.style.display = "none";
  };

  const closeChat = () => {
    chatContainer.classList.remove("open");
    chatbotLogoContainer.style.display = "flex";
  };

  const showWelcomeScreen = () => {
    welcomeScreen.classList.add("active");
    chatScreen.classList.remove("active");
    homeBtn.classList.add("active");
    contactNavBtn.classList.remove("active");
  };

  const showChatScreen = () => {
    welcomeScreen.classList.remove("active");
    chatScreen.classList.add("active");
    homeBtn.classList.remove("active");
    contactNavBtn.classList.add("active");
    if (chatBox.children.length === 0) {
      initializeChat();
    }
  };

  const clearChat = () => {
    chatBox.innerHTML = "";
    chatHistory = [];
    initializeChat();
    dropdownMenu.classList.remove("show");
  };

  const initializeChat = () => {
    displayMessage(
      "Hi there! 👋 I’m Sana, your AI assistant from EMRChains, here to support you!",
      "bot-message"
    );
  };

  function displayMessage(message, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.innerHTML = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function sendMessage() {
    const messageText = userInput.value.trim();
    if (messageText === "") return;

    displayMessage(messageText, "user-message");
    chatHistory.push(`User: ${messageText}`);
    userInput.value = "";
    typingIndicator.style.display = "flex";

    const botMessageDiv = document.createElement("div");
    botMessageDiv.classList.add("message", "bot-message");
    chatBox.appendChild(botMessageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    let botResponseText = "";

    try {
      const response = await fetch("https://sana.emrchains.com/api3/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain; charset=utf-8",
        },
        body: JSON.stringify({
          query: messageText,
          unique_id: "PHC-ISB-2025",
          end_user_id: endUserId,
          history: chatHistory.slice(-10),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        botResponseText += decoder.decode(value, { stream: true });
        botMessageDiv.innerHTML = botResponseText;
        chatBox.scrollTop = chatBox.scrollHeight;
      }

      chatHistory.push(`Assistant: ${botResponseText}`);
    } catch (error) {
      console.error("Chat API Error:", error);
      botMessageDiv.innerHTML =
        "Error: Unable to get a response. Please try again.";
    } finally {
      typingIndicator.style.display = "none";
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  chatbotLogoContainer.addEventListener("click", openChat);
  minimizeWelcome.addEventListener("click", closeChat);
  minimizeChat.addEventListener("click", closeChat);
  contactBtn.addEventListener("click", showChatScreen);
  contactNavBtn.addEventListener("click", showChatScreen);
  backBtn.addEventListener("click", showWelcomeScreen);
  homeBtn.addEventListener("click", showWelcomeScreen);
  clearChatBtn.addEventListener("click", clearChat);
  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
  });

  dotsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
  });

  window.addEventListener("click", () => {
    if (dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
    }
  });
}
