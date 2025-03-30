//? ПОЭКРАННЫЙ ПЕРЕХОД

//
const sectionTitleWith900height = document.querySelectorAll(
  ".scroll-section-900"
);

function setScrollSections(items, height) {
  if (window.innerHeight <= height) {
    items.forEach((item) => {
      item.classList.add("scroll-section");
    });
  } else {
    items.forEach((item) => {
      item.classList.remove("scroll-section");
    });
  }
}

setScrollSections(sectionTitleWith900height, 900);

window.addEventListener("resize", () => {
  setScrollSections(sectionTitleWith900height, 900);
});

$(function () {
  $.scrollify({
    section: ".scroll-section",
    scrollSpeed: 600, // Скорость прокрутки (в миллисекундах)
    easing: "easeOutExpo", // Тип easing для плавности (можно использовать разные: easeInOutCubic, easeOutQuad, и другие)
    scrollbars: false, // Показывать или скрывать полосы прокрутки

    sectionName: true, // Это поможет идентифицировать секции
    sectionName: "section-name", // Опцион

    setHeights: false, // Отключает автоматическое изменение высоты секций
    overflowScroll: true, // Разрешает прокрутку внутри секции, если она не помещается

    afterResize: function () {
      $.scrollify.update(); // Обновление Scrollify при изменении размера окна
    },

    interstitialSection: ".background", // Дополнительные секции, которые прокручиваются параллельно
    touchScroll: true, // Включить поддержку прокрутки для мобильных устройств
  });
});

// Обработчик кликов на якорные ссылки (для синхронизации прокрутки)
$(".js-section-scroll-link").on("click", function (e) {
  e.preventDefault(); // Отключаем стандартное поведение якоря

  let targetId = $(this).attr("href"); // Получаем ID секции из ссылки
  let sectionIndex = $(targetId).index(".scroll-section"); // Находим индекс секции в Scrollify

  if (sectionIndex !== -1) {
    $.scrollify.move(sectionIndex); // Принудительно скроллим к нужной секции
  }
});

// GSAP

gsap.registerPlugin(ScrollTrigger);

// Найдем элемент для анимации

// FIRST SECTION
const animateHiroTitle = document.querySelector(".fade-in-hiro-title");
const animateHiroSunTitle = document.querySelector(".fade-in-hiro-sub-title");
const animateHiroText = document.querySelector(".fade-in-hiro-text");
const animateHiroButton = document.querySelector(".fade-in-hiro-button");
const animateHiroBg = document.querySelector(".fade-in-hiro-bg");
const animateHiroHeader = document.querySelector(".fade-in-hiro-header");

// Настроим анимацию с использованием ScrollTrigger

animateHiroFadeIn(animateHiroTitle, 3.8, 0.8);
animateHiroFadeIn(animateHiroSunTitle, 4.3, 0.2, 0, 10);
animateHiroFadeIn(animateHiroText, 4, 0.2);
animateHiroFadeIn(animateHiroButton, 4.1, 0.2, 0, 20);

function animateHiroFadeIn(
  element,
  delay = 3.8,
  duration = 1,
  opacity = 0,
  y = 40,
  start = "top 100%",
  trigger = element
) {
  gsap.fromTo(
    element,
    { opacity, y }, // Начальные значения
    {
      opacity: 1, // Конечное значение
      delay: delay,
      y: 0,
      duration: duration,
      scrollTrigger: {
        trigger: trigger, // Этот элемент будет триггером
        start: start, // Когда верх блока окажется на 80% экрана
        toggleActions: "play none none reverse", // Запуск анимации один раз

        onEnterBack: () => {
          // Возвращаем элемент к анимации при обратном входе в зону видимости
          gsap.fromTo(
            element,
            { opacity, y },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
          );
        },
      },
    }
  );
}

// Анимация для .fade-in-hiro-bg
gsap.fromTo(
  animateHiroBg,
  { scale: 0.8 }, // Начальные значения
  {
    scale: 1,
    delay: 3.8,
    duration: 1.2,
    scrollTrigger: {
      trigger: animateHiroBg,
      start: "top 100%",
      toggleActions: "play none none reverse",
      onEnterBack: () => {
        // Анимация для обратного входа
        gsap.fromTo(
          animateHiroBg,
          {
            scale: 0.8,
          },
          { scale: 1, duration: 1.2, delay: 0.3 }
        );
      },
    },
  }
);

// Анимация для .fade-in-hiro-header
gsap.fromTo(
  animateHiroHeader,
  { height: 130 }, // Начальные значения
  {
    height: 0,
    delay: 4,
    duration: 0.8,
    scrollTrigger: {
      trigger: animateHiroHeader,
      start: "top 80%",
      toggleActions: "play none none reverse",
      onEnterBack: () => {
        // Анимация для обратного входа

        gsap.fromTo(
          animateHiroHeader,
          {
            height: 130,
          },
          { height: 0, duration: 0.8, delay: 0.3 }
        );
      },
    },
  }
);

// готовая анимация fadein
function fadeInElem(elem) {
  gsap.fromTo(
    elem,
    {
      y: 50,
      opacity: 0,
    },
    {
      delay: 0.6,
      duration: 0.6,
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: elem, // Этот элемент будет триггером
        start: "top 80%", // Когда верх блока окажется на 80% экрана
        toggleActions: "play none none none", // Запуск анимации при появлении и возврат при уходе
        onEnterBack: () => {
          // Возвращаем элемент к анимации при обратном входе в зону видимости
          console.log(window.scrollY);

          gsap.fromTo(
            elem,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.3,
              scrollTrigger: { start: "top" },
            }
          );
        },
        onEnter: () => {
          // Возвращаем элемент к анимации при обратном входе в зону видимости
          console.log(window.scrollY);

          gsap.fromTo(
            elem,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
          );
        },
        onLeaveBack: () => {
          gsap.to(elem, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: 0,
          });
        },
      },
    }
  );
}
