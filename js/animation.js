//? GSAP
gsap.registerPlugin(ScrollTrigger);

//! HIRO SECTION
const animateHiroTitle = document.querySelector(".fade-in-hiro-title");
const animateHiroSunTitle = document.querySelector(".fade-in-hiro-sub-title");
const animateHiroText = document.querySelector(".fade-in-hiro-text");
const animateHiroButton = document.querySelector(".fade-in-hiro-button");
const animateHiroBg = document.querySelector(".fade-in-hiro-bg");
const animateHiroHeader = document.querySelector(".fade-in-hiro-header");

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
  start = "top 20%",
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
        trigger: ".staffjet", // Этот элемент будет триггером
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

//! ABOUT US SECTION

gsap.fromTo(
  ".animate-about-us-title",
  {
    y: 50,
    opacity: 0,
  },
  {
    duration: 0.6,
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: "#about-us", // Этот элемент будет триггером
      start: "top 30%", // Когда верх блока окажется на 80% экрана
      toggleActions: "play none none reverse", // Запуск анимации при появлении и возврат при уходе
    },
  }
);

const cardsAbout = document.querySelector(".about-us__cards");

let aboutUsTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#about-us", // Блок, который будем анимировать
    start: "top top", // Когда верх блока достигнет верха экрана
    end: "+=60%", // Длина анимации — высота экрана
    pin: true, // Фиксируем блок во время анимации
    scrub: 1,
    toggleActions: "play none none reverse",
  },
});

// Добавляем анимации в timeline
aboutUsTimeline.fromTo(
  cardsAbout,
  { x: "200vw" },
  {
    x: 0,
    duration: 0.3,
  }
);

//! SERVICES SECTION

gsap.fromTo(
  ".animate-services-title-1",
  { opacity: 0 },
  {
    opacity: 1,
    duration: 0.6,
    scrollTrigger: {
      trigger: ".services",
      start: "top 20%",
      toggleActions: "play none none reverse",
    },
  }
);
gsap.fromTo(
  ".animate-services-title-2",
  { opacity: 0.25 },
  {
    opacity: 1,
    duration: 1,
    delay: 0.6,
    scrollTrigger: {
      trigger: ".services",
      start: "top 20%",
      toggleActions: "play none none reverse",
    },
  }
);
gsap.fromTo(
  ".animate-services-title-3",
  { opacity: 0.25 },
  {
    opacity: 1,
    duration: 1,
    delay: 0.9,
    scrollTrigger: {
      trigger: ".services",
      start: "top 20%",
      toggleActions: "play none none reverse",
    },
  }
);
gsap.fromTo(
  ".animate-services-card",
  { y: 400, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.3,
    delay: 1.2,
    scrollTrigger: {
      trigger: ".services",
      start: "top 20%",
      toggleActions: "play none none reverse",
    },
  }
);

//! PROCESSES SECTION

const timelineProcesses = gsap.timeline({
  scrollTrigger: {
    trigger: ".processes__inner",
    start: "top 40%",
    toggleActions: "play reverse play reverse",
  },
});

timelineProcesses
  .fromTo(
    ".animate-processes-title",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1 }
  )
  .fromTo(
    ".animate-processes-text",
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1 },
    "<"
  )
  .fromTo(
    ".animate-processes-button",
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, delay: 0.2 },
    "<"
  );

//! AGENCY SECTION

// let timelineAgencyCard = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".test-a", // Контейнер с элементами
//     start: "bottom top",
//     end: "+=200%", // Длина анимации — высота экрана
//     toggleActions: "play none none reverse",
//     pin: "#agency",
//     scrub: 1,
//   },
// });

// gsap.utils.toArray(".animate-agency-card").forEach((item, index) => {
//   timelineAgencyCard.fromTo(
//     item,
//     { top: index === 0 ? 340 + 30 + 366 : "200vh", y: 0 },
//     {
//       top: 80 * (index + 1) + 366,
//       duration: 0.6,
//     },
//     index * 1 // Время появления (аналог `stagger`)
//   );
// });

let isAnimateAgencyCard = true;
let timelineAgencyCard; // Переменная для хранения timeline
let agencyCards = gsap.utils.toArray(".animate-agency-card"); // Собирам все карточки сразу

// Функция для сброса стилей элементов
function resetCardStyles() {
  agencyCards.forEach((item) => {
    gsap.set(item, { clearProps: "all" }); // Убираем все изменения стилей, сделанные через GSAP
  });
}

// Функция для создания анимации
function createAnimation() {
  timelineAgencyCard = gsap.timeline({
    scrollTrigger: {
      trigger: ".trigger-agency-card-animate", // Контейнер с элементами
      start: "bottom top",
      end: "+=200%", // Длина анимации — высота экрана
      toggleActions: "play none none reverse",
      pin: "#agency",
      scrub: 1,
    },
  });

  agencyCards.forEach((item, index) => {
    timelineAgencyCard.fromTo(
      item,
      { top: index === 0 ? 340 + 30 + 366 : "200vh", y: 0 },
      {
        top: 80 * (index + 1) + 366,
        duration: 0.6,
      },
      index * 1 // Время появления (аналог `stagger`)
    );
  });
}

// Обновление анимации при изменении размера окна
window.addEventListener("resize", () => {
  if (window.innerWidth <= 1024) {
    // Если анимация была создана, убираем её
    if (timelineAgencyCard) {
      timelineAgencyCard.kill(); // Убираем старую анимацию
      timelineAgencyCard = null; // Очищаем переменную
    }

    // Сбрасываем все стили, установленные через GSAP

    resetCardStyles();

    // Отключаем флаг анимации для мобильных устройств
    isAnimateAgencyCard = false;
  } else {
    isAnimateAgencyCard = true;

    // Если анимация ещё не создана, создаём её
    if (!timelineAgencyCard) {
      createAnimation(); // Функция для создания анимации
    } else {
      // Если анимация уже существует, обновляем её
      ScrollTrigger.refresh(); // Обновляем ScrollTrigger, чтобы корректно перезапустилась анимация
    }
  }
});

// Запуск анимации сразу, если размер страницы больше 1024px
if (window.innerWidth > 1024 && isAnimateAgencyCard) {
  createAnimation();
}

//! CPA SECTION

fadeinSimpleBlock(".animate-cpa-title", ".animate-cpa-content", "#cpa");

//! CPA-DATA SECTION

if (window.innerWidth > 1020) {
  gsap.fromTo(
    ".animate-cpa-data-card-1",
    { y: "100%" },
    {
      y: 0,
      duration: 0.6,
      delay: 0.2,
      scrollTrigger: {
        trigger: ".cpa-data",
        start: "top 20%",
        toggleActions: "play none none none",
      },
    }
  );
  gsap.fromTo(
    ".animate-cpa-data-card-2",
    { y: "100%" },
    {
      y: 0,
      duration: 0.6,
      delay: 0.3,
      scrollTrigger: {
        trigger: ".cpa-data",
        start: "top 20%",
        toggleActions: "play none none none",
      },
    }
  );
  gsap.fromTo(
    ".animate-cpa-data-card-3",
    { y: "100%" },
    {
      y: 0,
      duration: 0.6,
      delay: 0.4,
      scrollTrigger: {
        trigger: ".cpa-data",
        start: "top 20%",
        toggleActions: "play none none none",
      },
    }
  );
  gsap.fromTo(
    ".animate-cpa-data-card-4",
    { y: "100%" },
    {
      y: 0,
      duration: 0.6,
      delay: 0.5,
      scrollTrigger: {
        trigger: ".cpa-data",
        start: "top 20%",
        toggleActions: "play none none none",
      },
    }
  );

  gsap.fromTo(
    ".animate-cpa-data-title",
    {
      y: 50,
      opacity: 0,
    },
    {
      duration: 0.6,
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".cpa-data", // Этот элемент будет триггером
        start: "top 30%", // Когда верх блока окажется на 80% экрана
        toggleActions: "play none none none", // Запуск анимации при появлении и возврат при уходе
      },
    }
  );
}

// cpaDataCards.forEach((item, index) => {
//   let heightPercent;

//   if (index == 0) heightPercent = "70%";

//   if (index == 1) heightPercent = "80%";
//   if (index == 2) heightPercent = "90%";

//   if (index == 3) heightPercent = "100%";

//   timelineCPAData.fromTo(
//     item,
//     { height: 0 },
//     {
//       height: heightPercent,
//       duration: 0.6,
//     }
//     // index * 1 // Время появления (аналог `stagger`)
//   );
// });

// animate-cpa-data-card

//! TEAM SECTION
fadeinSimpleBlock(".animate-team-title", ".animate-team-content", ".team");

//! CLIENTS SECTION
fadeinSimpleBlock(
  ".animate-clients-title",
  ".animate-clients-content",
  ".clients"
);

//? helper for simple blocks animation
function fadeinSimpleBlock(title, content, triger) {
  gsap.fromTo(
    title,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: triger,
        start: "top 40%",
        toggleActions: "play none play reverse",
      },
    }
  );
  gsap.fromTo(
    content,
    { opacity: 0, y: 200 },
    {
      opacity: 1,
      y: 0,
      delay: 0.3,
      duration: 0.6,
      scrollTrigger: {
        trigger: triger,
        start: "top 40%",
        toggleActions: "play none play reverse",
      },
    }
  );
}
