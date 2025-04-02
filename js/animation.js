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

let mmAgency = gsap.matchMedia();

mmAgency.add("(min-width: 1025px)", () => {
  let agencyCards = gsap.utils.toArray(".animate-agency-card");

  let timelineAgencyCard = gsap.timeline({
    scrollTrigger: {
      trigger: ".trigger-agency-card-animate",
      start: "bottom top",
      end: "+=200%",
      toggleActions: "play none none reverse",
      pin: "#agency",
      scrub: 1,
    },
  });

  agencyCards.forEach((item, index) => {
    timelineAgencyCard.fromTo(
      item,
      { top: index === 0 ? 340 + 30 + 366 : "200vh", y: 0 },
      { top: 80 * (index + 1) + 366, duration: 0.6 },
      index * 1
    );
  });

  return () => {
    timelineAgencyCard.revert(); // Очищает GSAP и ScrollTrigger
  };
});

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

//! CALL CENTER SECTION

// let callCenterText = gsap.utils.toArray(".animate-call-center-text");

// let timelineCallCenter = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".trigger-call-center-animate",
//     start: "bottom top",
//     end: "+=200%",
//     toggleActions: "play none none reverse",
//     pin: ".call-center",
//     scrub: 3,
//     toggleClass: { targets: item, className: "_active" },
//   },
// });

// callCenterText.forEach((item, index) => {
//   timelineCallCenter.fromTo(
//     item,
//     {},
//     {
//       onStart: () => {
//         console.log("Начало");

//         item.classList.add("_active");
//       },
//       onComplete: () => {
//         console.log("Конец");

//         item.classList.remove("_active");
//       },

//       onReverseStart: () => {
//         console.log("Реверс: Начало");

//         item.classList.add("_active");
//       },
//       onReverseComplete: () => {
//         console.log("Реверс: Конец");

//         item.classList.remove("_active");
//       },
//     }
//     // index * 1
//   );
// });

let callCenterText = gsap.utils.toArray(".animate-call-center-text");

let timelineCallCenter = gsap.timeline({
  scrollTrigger: {
    trigger: ".trigger-call-center-animate",
    start: "bottom top",
    end: "+=200%",
    pin: ".call-center",
    scrub: 3,
  },
});

callCenterText.forEach((item, index) => {
  timelineCallCenter.to(
    {},
    {
      duration: 1, // Время смены активного элемента
      onUpdate: function () {
        let progress =
          timelineCallCenter.progress() * (callCenterText.length - 1);
        let currentIndex = Math.round(progress);

        callCenterText.forEach((el, i) => {
          if (i === currentIndex) {
            el.classList.add("_active");
          } else {
            el.classList.remove("_active");
          }
        });
      },
    }
  );
});

// callCenterText.forEach((item) => {
//   gsap.set(item, {
//     scrollTrigger: {
//       trigger: ".trigger-call-center-animate",
//       start: "bottom top",
//       end: "+=200%",
//       toggleActions: "play none none reverse",
//       pin: ".call-center",
//       scrub: 3,
//       toggleClass: { targets: item, className: "_active" },
//     },
//   });
// });

// trigger-call-center-animate

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
