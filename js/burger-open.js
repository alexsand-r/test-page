"use strict";
(function () {
  const btnMenuBurger = document.getElementById("btn-menu-burger");
  const burgerMenu = document.getElementById("burger-menu-mobile");
  const body = document.body; // Получаем элемент body

  btnMenuBurger.addEventListener("click", function () {
    if (burgerMenu.classList.contains("burger-open")) {
      burgerMenu.classList.remove("burger-open");
      body.classList.remove("no-scroll");
    } else {
      burgerMenu.classList.add("burger-open");
      body.classList.add("no-scroll");
    }
  });
})();
