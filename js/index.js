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

if (burgerNavLinks.length > 0) {
  burgerNavLinks.forEach((link) => {
    link.addEventListener("click", () => removeBurgerNav());
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 767) removeBurgerNav();
});

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
