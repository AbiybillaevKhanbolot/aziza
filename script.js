document.addEventListener("DOMContentLoaded", () => {
  // Page enter animation
  requestAnimationFrame(() => {
    document.body.classList.add("page-ready");
  });

  // Navigation with fade-out
  function navigateWithTransition(url) {
    document.body.classList.add("page-leave");
    setTimeout(() => {
      window.location.href = url;
    }, 420);
  }

  document.querySelectorAll("[data-next-page]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const url = btn.getAttribute("data-next-page");
      if (url) navigateWithTransition(url);
    });
  });

  // Simple parallax effect
  const shell = document.querySelector(".page-shell");
  if (shell) {
    const strength = 18;
    shell.addEventListener("mousemove", (e) => {
      const rect = shell.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      const floatables = shell.querySelectorAll(
        ".profile-wrapper, .flower-strip, .slider-window, .content-column"
      );
      floatables.forEach((el, idx) => {
        const factor = 1 + idx * 0.28;
        const tx = -relX * strength * factor;
        const ty = -relY * strength * factor;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });
    });

    shell.addEventListener("mouseleave", () => {
      const floatables = shell.querySelectorAll(
        ".profile-wrapper, .flower-strip, .slider-window, .content-column"
      );
      floatables.forEach((el) => {
        el.style.transform = "";
      });
    });
  }

  // Floating hearts random positions
  const heartContainer = document.querySelector(".floating-hearts");
  if (heartContainer) {
    const hearts = heartContainer.querySelectorAll(".heart");
    hearts.forEach((heart, index) => {
      const left = Math.random() * 100;
      const delay = -(index * 4 + Math.random() * 3);
      const duration = 16 + Math.random() * 10;
      heart.style.left = `${left}%`;
      heart.style.animationDelay = `${delay}s`;
      heart.style.animationDuration = `${duration}s`;
    });
  }

  // Slider (page 4)
  const sliderTrack = document.querySelector("[data-slider-track]");
  const sliderDots = document.querySelectorAll("[data-slider-dot]");
  const sliderCounter = document.querySelector("[data-slider-counter]");

  if (sliderTrack && sliderDots.length) {
    let current = 0;
    const total = sliderDots.length;

    function goTo(index) {
      current = (index + total) % total;
      const offset = -current * 100;
      sliderTrack.style.transform = `translateX(${offset}%)`;
      sliderDots.forEach((d, i) =>
        d.classList.toggle("active", i === current)
      );
      if (sliderCounter) {
        sliderCounter.textContent = `${current + 1} / ${total}`;
      }
    }

    sliderDots.forEach((dot, index) => {
      dot.addEventListener("click", () => goTo(index));
    });

    // Auto-advance every 7 seconds
    let auto = setInterval(() => goTo(current + 1), 7000);

    const slider = document.querySelector(".slider-window");
    if (slider) {
      ["mouseenter", "touchstart"].forEach((evt) => {
        slider.addEventListener(evt, () => {
          clearInterval(auto);
          auto = null;
        });
      });
    }

    goTo(0);
  }
});

