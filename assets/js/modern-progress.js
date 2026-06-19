// Modern Progress Bar Animations
document.addEventListener("DOMContentLoaded", function () {
  // Initialize progress bars with animation on scroll
  const progressBars = document.querySelectorAll(".modern-progress-fill");

  // Function to initialize progress bar
  function initializeProgressBar(progressBar) {
    const targetWidth = progressBar.getAttribute("data-width");
    progressBar.style.setProperty("--target-width", targetWidth + "%");

    setTimeout(() => {
      progressBar.classList.add("animated");
      animateCounter(progressBar, targetWidth);
    }, 100);
  }

  // Intersection Observer for scroll-based animations
  const progressObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;

          // Only animate if not already animated
          if (!progressBar.classList.contains("animated")) {
            initializeProgressBar(progressBar);
          }

          // Unobserve after animation
          observer.unobserve(progressBar);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe all progress bars
  progressBars.forEach((bar) => {
    progressObserver.observe(bar);
  });

  // Counter animation function
  function animateCounter(progressBar, targetValue) {
    const counterElement = progressBar
      .closest(".modern-progress")
      .querySelector(".skill-percent");
    if (!counterElement) return;

    let currentValue = 0;
    const increment = targetValue / 60; // 60 frames for smooth animation
    const duration = 2000; // 2 seconds
    const frameRate = duration / 60;

    const counter = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(counter);
      }
      counterElement.textContent = Math.round(currentValue) + "%";
    }, frameRate);
  }

  // Add ripple effect on click
  function addRippleEffect(e) {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const ripple = document.createElement("span");

    ripple.className = "ripple";
    ripple.style.left = e.clientX - rect.left + "px";
    ripple.style.top = e.clientY - rect.top + "px";

    progressBar.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Add click event for ripple effect
  document.querySelectorAll(".modern-progress-bar").forEach((bar) => {
    bar.addEventListener("click", addRippleEffect);
    bar.style.cursor = "pointer";
  });

  // Add skill icons based on skill name
  function addSkillIcons() {
    const skills = document.querySelectorAll(".skill-name");
    const iconMap = {
      "web design": "🎨",
      "graphic design": "🖼️",
      photoshop: "📷",
      "c#": "💻",
      typescript: "📝",
      "windows forms": "🖥️",
      "sql server": "🗄️",
      "flex box": "📦",
      javascript: "⚡",
      "html 5": "🌐",
      css3: "🎨",
      python: "🐍",
      sass: "💎",
      "vue js": "💚",
      github: "🐙",
      "adobe illustrator": "🎭",
      tailwindcss: "🌊",
      bootstrap: "🅱️",
      "adobe xd": "📐",
      wordpress: "📝",
      django: "🎸",
      "django rest framework": "🔗",
      docker: "🐳",
      pyscript: "📜",
      "ai chat": "🤖",
      "machine learning": "🧠",
      devops: "⚙️",
      "tech lead": "👑",
      "unit test": "🧪",
      seo: "🔍",
      git: "📊",
      figma: "🎨",
      go: "🐹",
      "prompt for generative ai": "💡",
      "next.js": "▲",
    };

    skills.forEach((skill) => {
      const skillText = skill.textContent.toLowerCase().trim();
      const icon = iconMap[skillText] || "💼";

      if (!skill.querySelector(".skill-icon")) {
        const iconElement = document.createElement("span");
        iconElement.className = "skill-icon";
        iconElement.textContent = icon;
        skill.prepend(iconElement);
      }
    });
  }

  // Initialize skill icons
  addSkillIcons();

  // Add random animation delays for staggered effect
  progressBars.forEach((bar, index) => {
    bar.style.animationDelay = index * 0.1 + "s";
  });
});

// CSS for ripple effect
const rippleCSS = `
    .modern-progress-bar {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Inject ripple CSS
const style = document.createElement("style");
style.textContent = rippleCSS;
document.head.appendChild(style);
