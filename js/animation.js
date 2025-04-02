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

let mmHiroSection = gsap.matchMedia();

mmHiroSection.add("(min-width: 768px)", () => {
  // Анимация для .fade-in-hiro-header
  let animation = gsap.fromTo(
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
            { height: 130 },
            { height: 0, duration: 0.8, delay: 0.3 }
          );
        },
      },
    }
  );

  return () => {
    animation.kill(); // Останавливаем анимацию
    gsap.set(animateHiroHeader, { clearProps: "all" }); // Убираем все инлайн-стили
  };
});

//! ABOUT US SECTION

let mmAboutUs = gsap.matchMedia();

mmAboutUs.add("(min-width: 1201px)", () => {
  // cards
  const cardsAbout = document.querySelector(".about-us__cards");

  let aboutUsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#about-us", // Блок, который будем анимировать
      start: "top top", // Когда верх блока достигнет верха экрана
      end: "+=100%", // Длина анимации — высота экрана
      pin: true, // Фиксируем блок во время анимации
      scrub: 5,
      toggleActions: "play none none reverse",
    },
  });

  aboutUsTimeline.fromTo(
    cardsAbout,
    { x: "200vw" },
    {
      x: 0,
      duration: 0.3,
    }
  );

  return () => {
    aboutUsTimeline.revert(); // Очищает GSAP и ScrollTrigger
  };
});

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
// bg
gsap.fromTo(
  ".fade-in-about-bg",
  {
    opacity: 0,
    scale: 0.8,
  },
  {
    opacity: 1,

    scale: 1,
    duration: 0.6,
    scrollTrigger: {
      trigger: "#about-us", // Этот элемент будет триггером
      start: "top 30%", // Когда верх блока окажется на 80% экрана
      toggleActions: "play none none reverse", // Запуск анимации при появлении и возврат при уходе
    },
  }
);

//! SERVICES SECTION

function wrapTextInSpans(elementId) {
  const element = document.querySelector(elementId);

  const text = element.innerText;

  const wrappedText = text
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");

  element.innerHTML = wrappedText;
}
function animateText(textElem1, textElem2, textElem3, delay) {
  const spans = document.querySelectorAll(`${textElem1} span`);
  const spans2 = document.querySelectorAll(`${textElem2} span`);
  const spans3 = document.querySelectorAll(`${textElem3} span`);

  const timelineServicesTitle = gsap.timeline({
    scrollTrigger: {
      trigger: ".services",
      start: "top top",
      toggleActions: "play none none reverse",
      pin: true,
      scrub: 1,
    },
  });

  // Анимация каждого <span> по очереди
  timelineServicesTitle
    .fromTo(
      spans,
      { opacity: 0.25 }, // Начальная прозрачность
      {
        opacity: 1, // Конечная прозрачность
        duration: 0.2, // Длительность анимации
        delay,
        stagger: 0.01, // Задержка между анимациями каждого символа
      }
    )
    .fromTo(
      spans2,
      { opacity: 0.25 }, // Начальная прозрачность
      {
        opacity: 1, // Конечная прозрачность
        duration: 0.2, // Длительность анимации
        delay,
        stagger: 0.01, // Задержка между анимациями каждого символа
      }
    )
    .fromTo(
      spans3,
      { opacity: 0.25 }, // Начальная прозрачность
      {
        opacity: 1, // Конечная прозрачность
        duration: 0.2, // Длительность анимации
        delay,
        stagger: 0.01, // Задержка между анимациями каждого символа
      }
    )
    .fromTo(
      ".animate-services-card",
      { y: 400, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
      }
    );
}

// Применяем функцию к элементу с ID "text-container"
wrapTextInSpans(".animate-services-title-1");
wrapTextInSpans(".animate-services-title-2");
wrapTextInSpans(".animate-services-title-3");

animateText(
  ".animate-services-title-1",
  ".animate-services-title-2",
  ".animate-services-title-3"
);

// card
// gsap.fromTo(
//   ".animate-services-card",
//   { y: 400, opacity: 0 },
//   {
//     y: 0,
//     opacity: 1,
//     duration: 0.3,
//     delay: 0.9,
//     scrollTrigger: {
//       trigger: ".services",
//       start: "top top",
//       toggleActions: "play none none reverse",
//     },
//   }
// );

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

gsap.fromTo(
  ".animate-agency-text",
  { y: 40, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    delay: 0.6,
    duration: 0.6,
    scrollTrigger: {
      trigger: "#agency",
      start: "top 20%",
      toggleActions: "play none play reverse",
    },
  }
);

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

//! TEAM SECTION

gsap.fromTo(
  ".animate-team-title",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: ".animate-team-content",
      start: "top 20%",
      toggleActions: "play none play reverse",
    },
  }
);
gsap.fromTo(
  ".animate-team-content",
  { opacity: 0, y: 200 },
  {
    opacity: 1,
    y: 0,
    delay: 0.3,
    duration: 0.6,
    scrollTrigger: {
      trigger: ".animate-team-content",
      start: "top 20%",
      toggleActions: "play none play reverse",
    },
  }
);

//! CALL CENTER SECTION

let callCenterText = gsap.utils.toArray(".animate-call-center-text");

let timelineCallCenter = gsap.timeline({
  scrollTrigger: {
    trigger: ".trigger-call-center-animate",
    start: "bottom top",
    end: "+=100%",
    pin: ".call-center",
    scrub: 5,
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

//! CLIENTS SECTION
fadeinSimpleBlock(
  ".animate-clients-title",
  ".animate-clients-content",
  ".clients"
);

//! MEDIA SECTION
fadeinSimpleBlock(".animate-media-title", ".animate-media-content", ".media");

//? helper for simple blocks animation
function fadeinSimpleBlock(title, content, triger, start = "top 40%") {
  gsap.fromTo(
    title,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: triger,
        start: start,
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
        start: start,
        toggleActions: "play none play reverse",
      },
    }
  );
}

//! CONTACTS PARALAX

function feidInParalax(
  elem,
  trigger,
  start = "bottom 90%",
  yStart = -300,
  duration = 0.6
) {
  gsap.fromTo(
    elem,
    { y: yStart },
    {
      y: 0,
      duration: duration,
      scrollTrigger: {
        trigger: trigger,
        start: start,
        toggleActions: "play none play reverse",
      },
    }
  );
}

feidInParalax(".contacts", ".media");

//! FOOTER PARALAX
feidInParalax(".footer", ".contacts", "bottom 60%", -340);

//? Scroll
const lenis = new Lenis({
  duration: 1, // Скорость анимации (1.5 = плавнее)
  smooth: true, // Включает плавный скролл
  smoothTouch: true, // Отключаем плавность на тач-устройствах (по желанию)
  easing: (t) => 1 - Math.pow(1 - t, 3), // Более естественное ускорение/замедление
});

// Обновляем Lenis в каждом кадре анимации
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
