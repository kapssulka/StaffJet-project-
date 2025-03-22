// TIME ZONE
const timezoneSpan = document.getElementById("js-timezone");

if (timezoneSpan) {
  function updateTime() {
    timezoneSpan.innerText = getTime();
  }

  updateTime();

  // Вычисляем, сколько осталось до следующей минуты
  const now = new Date();
  const msToNextMinute = (60 - now.getSeconds()) * 1000;

  setTimeout(() => {
    updateTime();
    setInterval(updateTime, 60000);
  }, msToNextMinute);
}
function getTime() {
  const options = {
    timeZone: "Europe/Kaliningrad",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const time = new Date()
    .toLocaleString("ru-RU", options)
    .replace(/^(\d):/, "0$1");

  return time;
}

// BURGER MENU

const burgerBtn = document.getElementById("js-burger");
const burgerNav = document.getElementById("js-burger-nav");
const burgerNavLinks = document.querySelectorAll(".burger-nav__link");

if (burgerBtn) {
  burgerBtn.addEventListener("click", () => {
    if (burgerBtn.classList.contains("_open")) {
      removeBurgerNav();

      burgerBtn.classList.add("_close");

      setTimeout(() => {
        burgerBtn.classList.remove("_close");
      }, 300);
    } else openBurgerNav();
  });
}

// links
if (burgerNavLinks.length > 0) {
  burgerNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");

      removeBurgerNav();

      if (typeof href === "string" && href.startsWith("#") && href.length > 1) {
        const targetElement = document.getElementById(href.slice(1)); // Ищем по ID

        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }
      }
    });
  });
}

function openBurgerNav() {
  burgerBtn.classList.add("_open");
  burgerNav.classList.add("_open");
  document.body.classList.add("_hidden");
}
function removeBurgerNav() {
  burgerBtn.classList.remove("_open");
  burgerNav.classList.remove("_open");
  document.body.classList.remove("_hidden");
}

// FIXED HEADER

const header = document.getElementById("js-header");
let lastScrollTop = window.scrollY;

if (header) {
  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY;

    if (
      scrollTop < lastScrollTop &&
      (scrollTop > 200) & (window.innerWidth < 768)
    ) {
      header.classList.add("_fixed");
    } else {
      header.classList.remove("_fixed");
    }

    lastScrollTop = scrollTop;
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 767) {
    // УБИРАЕМ БУРГЕР НАВИГАЦИЮ
    removeBurgerNav();

    // УБИРАЕМ ФИКСАЦИЮ
    header.classList.remove("_fixed");
  }
});

// ANIMATE SERVICES SWIPE

const servicesCards = document.querySelectorAll("#js-services-card");

if (servicesCards.length > 0) {
  servicesCards.forEach((card) => {
    const cardButton = card.querySelector(".card-services__button");

    cardButton.addEventListener("click", () => {
      if (card.classList.contains("_open")) {
        card.classList.remove("_open");

        card.classList.add("_close");
        setTimeout(() => {
          card.classList.remove("_close");
        }, 600);
      } else {
        card.classList.add("_open");
      }
    });
  });
}
