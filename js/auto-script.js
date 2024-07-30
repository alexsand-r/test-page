"use strict";

if (document.querySelector(".product-card")) {
  // Инициализируем первый свайпер
  let thumbsSwiper = new Swiper(".images-product__slider", {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    grabCursor: true,
    spaceBetween: 40,
    speed: 800,
    //loop: true,
    thumbs: {
      swiper: {
        el: ".images-preview__slider",
        slidesPerView: 8,
      },
    },
    navigation: {
      prevEl: ".swiper-button-prev-1",
      nextEl: ".swiper-button-next-1",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Инициализируем второй свайпер
  new Swiper(".images-preview__slider", {
    observer: true,
    observeParents: true,
    grabCursor: true,
    spaceBetween: 17,
    speed: 800,
    //loop: true,
    slideToClickedSlide: true,
    controller: {
      control: thumbsSwiper, // Указываем, что это контролирующий свайпер
    },
    breakpoints: {
      320: {
        slidesPerView: 4,
        spaceBetween: 6,
      },
      450: {
        slidesPerView: 5,
        spaceBetween: 6,
      },
      768: {
        slidesPerView: 8,
        spaceBetween: 6,
      },
      992: {
        slidesPerView: 8,
        spaceBetween: 6,
      },
    },
  });
}

//=====================================================================================================
// -------------------- кнопка показать больше в auto блок Overview блок Additional information:
const boxText = document.querySelector(".box-text"); // блок с текстом
const expandBtn = document.getElementById("expand-btn"); // кнопка more
const hideBtn = document.getElementById("hide-btn"); // кнопка show
function openBlock() {
  if (boxText) {
    boxText.classList.toggle("box-text");
    expandBtn.classList.toggle("hidden");
    hideBtn.classList.toggle("hidden");
  }
}

//------------------------------- кнопка показать больше в auto блок Overview ----------------------------------------------------

// ======= код через  onclick="openText()"
const boxPost = document.querySelector(".box__post"); // блок с текстом
const btnMore = document.getElementById("btn-more"); // кнопка more
const btnShow = document.getElementById("btn-show"); // кнопка show
function openText() {
  if (boxPost) {
    boxPost.classList.toggle("box__post");
    btnMore.classList.toggle("hidden");
    btnShow.classList.toggle("hidden");
  }
}

//=================================================================================================================
//----------------------------- галерея модальное окн
// Проверяем, есть ли на странице элемент с классом "gallery"
const galleryExists = document.querySelector(".gallery");
const btnClose = document.getElementById("btn-close");
// Если элемент с классом "gallery" существует, то добавляем обработчик клика
if (galleryExists) {
  // Получаем ссылки на все элементы слайдера
  const sliderElements = document.querySelectorAll(".product-images__picture");
  const clasSect = document.querySelectorAll(".clas-sect");

  // Получаем ссылку на контейнер галереи
  const gallery = document.getElementById("gallery");

  // Добавляем обработчик клика на каждый элемент слайдера
  sliderElements.forEach((sliderElement) => {
    sliderElement.addEventListener("click", () => {
      // Проверяем текущую ширину экрана
      if (window.innerWidth < 991.98) {
        // Показываем галерею при клике
        gallery.style.display = "block";

        // Добавляем класс "hidden" к элементам с классом "clas-sect"
        clasSect.forEach((element) => {
          element.classList.add("hidden");
        });
      }
    });
  });
  btnClose.addEventListener("click", () => {
    gallery.style.display = "none";
    // Добавляем класс "hidden" к элементам с классом "clas-sect"
    clasSect.forEach((element) => {
      element.classList.remove("hidden");
    });
  });
}

// страница auto-pop блоки показать скрыть Vehicle configuration based on decoding data from the VIN =
// ======= код через  onclick="viewContent(this)"

function viewContent(element) {
  var elementsToToggle = [];
  var currentElement = element.previousElementSibling;

  // Находим все элементы до следующей кнопки
  while (currentElement && !currentElement.classList.contains("click-btn")) {
    if (currentElement.classList.contains("block-hid")) {
      elementsToToggle.push(currentElement);
    }
    currentElement = currentElement.previousElementSibling;
  }

  // Удаляем класс "hidden" у найденных элементов
  elementsToToggle.forEach(function (el) {
    el.classList.toggle("hidden");
  });

  const viewText = element.querySelector(".view-text"); // текст на кнопке

  if (viewText.innerText === "Close") {
    viewText.innerText = "View All"; // Change the text to "View All" if it was "Close"
  } else {
    viewText.innerText = "Close"; // Change the text to "Close" if it was "View All"
  }
}
