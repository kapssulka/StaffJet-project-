import Lenis from "./librarys/lenis.mjs"; // Правильный путь к файлу

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
