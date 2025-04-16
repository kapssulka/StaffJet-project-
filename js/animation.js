const isIOS = (() => {
  const userAgent = navigator.userAgent;
  const isAppleDevice =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return isAppleDevice && !window.MSStream;
})();

if (!isIOS) {
  //? GSAP
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      window.location.reload();
    }, 300);
  });

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

  let mmAboutUsPC = gsap.matchMedia();

  mmAboutUsPC.add("(min-width: 1201px)", () => {
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

    // title
    let fadeInAnimationTitle = gsap.fromTo(
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

    return () => {
      aboutUsTimeline.revert(); // Очищает GSAP и ScrollTrigger
      fadeInAnimationTitle.kill();
    };
  });

  // bg
  let fadeInAnimation = gsap.fromTo(
    ".fade-in-about-bg",
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      scrollTrigger: {
        trigger: "#about-us",
        start: "top 30%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // заголовок и конент (мобилки)
  let mmFadeInMobile = gsap.matchMedia();

  mmFadeInMobile.add("(max-width: 1200px)", () => {
    // cards
    const fadeInAbouMobile = fadeinSimpleBlock(
      ".animate-about-us-title-mb",
      ".animate-about-us-content-mb",
      "#about-us"
    );

    return () => {
      // Удаляем только связанные ScrollTrigger'ы
      fadeInAbouMobile?.forEach((anim) => anim?.scrollTrigger?.kill());
    };
  });

  //! SERVICES SECTION

  let mmServices = gsap.matchMedia();

  mmServices.add("(min-width: 1025px)", () => {
    function wrapTextInSpans(elementId) {
      const element = document.querySelector(elementId);

      if (!element || element.dataset.original) return;

      // Сохраняем оригинальный текст
      element.dataset.original = element.innerText;

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

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".services",
          start: "top top",
          toggleActions: "play none none reverse",
          pin: true,
          scrub: 0.1,
        },
      });

      timeline
        .fromTo(
          spans,
          { opacity: 0.25 },
          { opacity: 1, duration: 0.2, delay, stagger: 0.01 }
        )
        .fromTo(
          spans2,
          { opacity: 0.25 },
          { opacity: 1, duration: 0.2, delay, stagger: 0.01 }
        )
        .fromTo(
          spans3,
          { opacity: 0.25 },
          { opacity: 1, duration: 0.2, delay, stagger: 0.01 }
        )
        .fromTo(
          ".animate-services-card",
          { y: 400, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        );

      return timeline;
    }

    // Оборачиваем текст
    wrapTextInSpans(".animate-services-title-1");
    wrapTextInSpans(".animate-services-title-2");
    wrapTextInSpans(".animate-services-title-3");

    // Запускаем анимацию
    let timelineServices = animateText(
      ".animate-services-title-1",
      ".animate-services-title-2",
      ".animate-services-title-3",
      0.2
    );

    return () => {
      // Очистка GSAP и ScrollTrigger
      if (timelineServices) {
        timelineServices.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Восстановление текста (если был изменён)
      [
        ".animate-services-title-1",
        ".animate-services-title-2",
        ".animate-services-title-3",
      ].forEach((selector) => {
        const element = document.querySelector(selector);
        if (element && element.dataset.original) {
          element.innerText = element.dataset.original;
          delete element.dataset.original;
        }
      });
    };
  });

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

    agencyCards[0].classList.add("_active");

    let timelineAgencyCard = gsap.timeline({
      scrollTrigger: {
        trigger: ".trigger-agency-card-animate",
        start: "bottom top",
        end: "+=200%",
        toggleActions: "play none none reverse",
        pin: "#agency",
        scrub: 1,
        onUpdate: () => {
          let progress = timelineAgencyCard.scrollTrigger.progress;
          let activeIndex = Math.round(progress * (agencyCards.length - 1));

          agencyCards.forEach((card, index) => {
            card.classList.toggle("_active", index === activeIndex);
          });
        },
      },
    });

    agencyCards.forEach((item, index) => {
      timelineAgencyCard.fromTo(
        item,
        {
          top: index === 0 ? 366 : index === 1 ? 340 + 30 + 30 + 366 : "200vh",
          y: 0,
        },
        {
          top: index === 0 ? 366 : 80 * (index + 1) + 366 - 80,
          duration: 0.6,
        },
        index * 1
      );

      //? Обработчик клика для отката к элементу

      item.addEventListener("click", () => {
        // Вычисляем абсолютное время для перехода к нужному элементу
        let targetTime = index / (agencyCards.length - 1);

        // Добавляем небольшое смещение, чтобы поправить поведение
        let offset = 0.05; // Можно настроить этот коэффициент для точного перехода

        // Используем scrollTrigger, чтобы откатить анимацию в правильный момент
        timelineAgencyCard.scrollTrigger.scroll(
          timelineAgencyCard.scrollTrigger.start +
            (targetTime + offset) *
              (timelineAgencyCard.scrollTrigger.end -
                timelineAgencyCard.scrollTrigger.start)
        );

        // Удаляем _active у всех и добавляем только на кликнутый элемент
        agencyCards.forEach((card) => card.classList.remove("_active"));
        item.classList.add("_active");
      });
    });

    return () => {
      if (timelineAgencyCard.scrollTrigger) {
        timelineAgencyCard.scrollTrigger.kill();
      }
      timelineAgencyCard.kill();
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
  let mmCPAData = gsap.matchMedia();

  mmCPAData.add("(min-width: 1021px)", () => {
    // Создаем общий timeline для всех анимаций
    let timelineCPAData = gsap.timeline({
      scrollTrigger: {
        trigger: ".cpa-data",
        start: "top 20%",
        toggleActions: "play none none reverse",
        once: false, // анимации будут работать при каждом попадании в область
      },
    });

    // Добавляем анимации для каждого элемента с задержками
    timelineCPAData
      .fromTo(
        ".animate-cpa-data-card-1",
        { y: "100%" },
        { y: 0, duration: 0.6 } // Задержка для первого элемента
      )
      .fromTo(
        ".animate-cpa-data-card-2",
        { y: "100%" },
        { y: 0, duration: 0.6, delay: 0.1 },
        "<" // Задержка для второго элемента
      )
      .fromTo(
        ".animate-cpa-data-card-3",
        { y: "100%" },
        { y: 0, duration: 0.6, delay: 0.2 },
        "<" // Задержка для третьего элемента
      )
      .fromTo(
        ".animate-cpa-data-card-4",
        { y: "100%" },
        { y: 0, duration: 0.6, delay: 0.3 },
        "<" // Задержка для четвертого элемента
      );

    const animateCPATitle = gsap.fromTo(
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
          toggleActions: "play none none reverse", // Запуск анимации при появлении и возврат при уходе
        },
      }
    );

    return () => {
      timelineCPAData?.revert(); // Очищает GSAP и ScrollTrigger
      animateCPATitle?.kill(); // Удаляем анимацию при изменении размеров экрана
    };
  });

  //! TEAM SECTION

  let mmTeamSectionPC = gsap.matchMedia();

  mmTeamSectionPC.add("(min-width: 1025px)", () => {
    const animationTeamTitle = gsap.fromTo(
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
    const animationTeamContent = gsap.fromTo(
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
    return () => {
      if (animationTeamTitle.scrollTrigger) {
        animationTeamTitle.scrollTrigger.kill();
      }
      animationTeamTitle.kill(); // или .revert() — если использовался timeline

      if (animationTeamContent.scrollTrigger) {
        animationTeamContent.scrollTrigger.kill();
      }
      animationTeamContent.kill(); // или .revert()
    };
  });

  let mmTeamSectionMobile = gsap.matchMedia();

  mmTeamSectionMobile.add("(max-width: 1024px)", () => {
    const [titleAnim, contentAnim] = fadeinSimpleBlock(
      ".animate-team-title-mobile",
      ".animate-team-content",
      ".team"
    );
    return () => {
      if (titleAnim.scrollTrigger) titleAnim.scrollTrigger.kill();
      titleAnim.kill();

      if (contentAnim.scrollTrigger) contentAnim.scrollTrigger.kill();
      contentAnim.kill();
    };
  });

  //! CALL CENTER SECTION

  let mmCallCenter = gsap.matchMedia();

  mmCallCenter.add("(min-width: 1025px)", () => {
    const callCenterText = gsap.utils.toArray(".animate-call-center-text");

    const timelineCallCenter = gsap.timeline({
      scrollTrigger: {
        trigger: ".trigger-call-center-animate",
        start: "bottom top",
        end: "+=100%",
        pin: ".call-center",
        scrub: 5,
      },
    });

    // Функция для обновления активного элемента
    const updateActiveClass = () => {
      const progress =
        timelineCallCenter.progress() * (callCenterText.length - 1);
      const currentIndex = Math.round(progress);

      callCenterText.forEach((el, i) => {
        if (i === currentIndex) {
          el.classList.add("_active");
        } else {
          el.classList.remove("_active");
        }
      });
    };

    // Добавляем пустые шаги с обновлением
    callCenterText.forEach(() => {
      timelineCallCenter.to(
        {},
        {
          duration: 1,
          onUpdate: updateActiveClass,
        }
      );
    });

    return () => {
      // Очистка ScrollTrigger и таймлайна
      if (timelineCallCenter.scrollTrigger) {
        timelineCallCenter.scrollTrigger.kill();
      }
      timelineCallCenter.kill();

      // Удаление классов _active
      callCenterText.forEach((el) => el.classList.remove("_active"));
    };
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
    const titleAnim = gsap.fromTo(
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
    const contentAnim = gsap.fromTo(
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

    return [titleAnim, contentAnim];
  }

  //!  FOOTER PARALAX

  let mmParallax = gsap.matchMedia();

  mmParallax.add("(min-width: 1025px)", () => {
    // Создаем переменные для хранения ScrollTrigger
    let scrollTriggerInstanceFooter = feidInParalax(
      ".footer",
      ".contacts",
      "bottom 80%",
      -345
    );

    return () => {
      // Удаляем только связанные ScrollTrigger'ы
      scrollTriggerInstanceFooter?.kill();
    };
  });

  // функция паралакса
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

  //! BG SCALE ANIMATION

  function scaleAnimationBg(elem) {
    // bg
    return gsap.fromTo(
      elem,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: elem,
          start: "top 30%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  let bgAnimateItems = gsap.utils.toArray(".bg-scale-animation");

  let animations = bgAnimateItems.map((item) => scaleAnimationBg(item));
} else {
  const processesTitle = document.querySelector(".animate-processes-title");
  const processesText = document.querySelector(".animate-processes-text");
  const processesButton = document.querySelector(".animate-processes-button");

  if (processesTitle)
    processesTitle.classList.remove("animate-processes-title");
  if (processesText) processesText.classList.remove("animate-processes-text");
  if (processesButton)
    processesButton.classList.remove("animate-processes-button");
}
