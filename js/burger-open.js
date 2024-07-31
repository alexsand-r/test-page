"use strict";

(function () {
  const iconSearchBtn = document.getElementById("icon-search-btn"); // иконка поиска
  const btnMenuBurger = document.getElementById("btn-menu-burger"); // иконка бургера на мобилке
  const btnTablet = document.getElementById("btn-tablet"); // кнопка бургера на планшете
  const burgerMenu = document.getElementById("burger-menu-mobile"); // сам бургер
  const body = document.body; // Получаем элемент body

  function handleMenu() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 767) {
      // Если ширина экрана меньше или равна 767 пикселей (мобильное меню)
      burgerMenu.style.top = "60px";
      burgerMenu.style.paddingBottom = "50px";
      toggleMenu();
    } else if (screenWidth > 767 && screenWidth <= 1020) {
      // Если ширина экрана больше 767 пикселей и меньше или равна 1020 пикселей (планшетное меню)
      burgerMenu.style.top = "115px";
      burgerMenu.style.paddingBottom = "100px";
      toggleMenu();
    } else {
      // Если ширина экрана больше 1020 пикселей
      burgerMenu.classList.remove("burger-open");
      body.classList.remove("no-scroll");
    }
  }

  function toggleMenu() {
    if (burgerMenu.classList.contains("burger-open")) {
      burgerMenu.classList.remove("burger-open");
      body.classList.remove("no-scroll");
    } else {
      burgerMenu.classList.add("burger-open");
      body.classList.add("no-scroll");
    }
  }

  // Добавляем обработчики событий
  btnMenuBurger.addEventListener("click", handleMenu);
  iconSearchBtn.addEventListener("click", handleMenu);
  btnTablet.addEventListener("click", handleMenu);
})();
