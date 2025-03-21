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
if (burgerBtn) {
  burgerBtn.addEventListener("click", () => {
    if (burgerBtn.classList.contains("open")) {
      burgerBtn.classList.remove("open");
      burgerBtn.classList.add("close");

      setTimeout(() => {
        burgerBtn.classList.remove("close");
      }, 300);
    } else {
      burgerBtn.classList.add("open");
    }
  });
}
