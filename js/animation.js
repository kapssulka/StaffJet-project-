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

// Обработчик кликов на якорные ссылки
$(".js-section-scroll-link").on("click", function (e) {
  e.preventDefault(); // Отключаем стандартное поведение якоря

  let targetId = $(this).attr("href"); // Получаем ID секции из ссылки
  let sectionIndex = $(targetId).index(".scroll-section"); // Находим индекс секции в Scrollify

  if (sectionIndex !== -1) {
    $.scrollify.move(sectionIndex); // Принудительно скроллим к нужной секции
  }
});
