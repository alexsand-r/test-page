"use strict";

// --------------- слайдер цена ----------------------------
const range = document.getElementById("range");

if (range) {
  // Получаем ссылки на элементы
  const slider = document.getElementById("slider");
  const minValue = document.getElementById("min-value");
  const maxValue = document.getElementById("max-value");

  // Создаем слайдер с помощью noUiSlider
  noUiSlider.create(slider, {
    start: [1996, 2024], // Значения по умолчанию
    connect: true, // Связываем оба ползунка
    range: {
      min: 1996,
      max: 2023,
    },
    format: {
      to: (value) => Math.round(value), // Форматируем значения до целых чисел
      from: (value) => parseInt(value),
    },
  });

  // Обновляем значения текстовых полей при изменении слайдера
  slider.noUiSlider.on("update", (values, handle) => {
    if (handle === 0) {
      minValue.value = values[handle];
    } else if (handle === 1) {
      maxValue.value = values[handle];
    }
  });

  // Обновляем слайдер при изменении значений в текстовых полях
  minValue.addEventListener("change", () => {
    slider.noUiSlider.set([minValue.value, null]);
  });

  maxValue.addEventListener("change", () => {
    slider.noUiSlider.set([null, maxValue.value]);
  });

  // Функция для проверки текущей ширины экрана и переключения видимости элементов
  function toggleElements() {
    const dropdownMobile = document.getElementById("dropdownMobile");
    const dropdownDesktop = document.getElementById("dropdownDesktop");

    if (dropdownMobile && dropdownDesktop) {
      // Проверяем существование обоих элементов
      if (window.innerWidth < 768) {
        dropdownMobile.classList.remove("hidden");
        dropdownDesktop.classList.add("hidden");
      } else {
        dropdownMobile.classList.add("hidden");
        dropdownDesktop.classList.remove("hidden");
      }
    }
  }
}
//выводит в консоль ползунки и год
slider.noUiSlider.on("end", (values, handle) => {
  if (handle === 0) {
    console.log("Первый ползунок отпущен");
    const startYear = parseInt(values[0]);
    console.log(`Год выпуска автомобиля (первый ползунок): ${startYear}`);
    // Ваш код для первого ползунка
  } else if (handle === 1) {
    console.log("Второй ползунок отпущен");
    const endYear = parseInt(values[1]);
    console.log(`Год выпуска автомобиля (второй ползунок): ${endYear}`);
    // Ваш код для второго ползунка
  }
});

// // Определите функцию для обработки события "end" слайдера
// function handleSliderEnd(values, handle) {
//   if (handle === 0) {
//    // console.log("Первый ползунок отпущен");
//     const startYear = parseInt(values[0]);
//     console.log(`Год выпуска автомобиля (первый ползунок): ${startYear}`);
//     // Ваш код для первого ползунка
//   } else if (handle === 1) {
//    // console.log("Второй ползунок отпущен");
//     const endYear = parseInt(values[1]);
//    // console.log(`Год выпуска автомобиля (второй ползунок): ${endYear}`);
//     // Ваш код для второго ползунка
//   }
// }

// Экспортируйте функцию, чтобы её можно было вызывать из другого файла
//export function handleSliderEnd;

// Используйте эту функцию в другом файле, импортируя её

//=================================================================================================================
//------------------------------- на странице каталога смена крестика на крыжик ------------------------------------
const blockSearch = document.querySelectorAll(".box-search"); // блок с поисками
const input = document.querySelectorAll(".inp-search"); // поле инпут
const buttonBtn = document.querySelector(".button-btn"); // крестик
const btnCross = document.querySelector(".button-btn-cross"); // кнопка закрыть

// Функция для показа блоков поиска и скрытия кнопок
function showSearchBlocks() {
  blockSearch.forEach((blockElement) => {
    blockElement.classList.remove("hidden");
  });
  buttonBtn.classList.add("hidden");
  btnCross.classList.remove("hidden");
}

// Функция для скрытия блоков поиска и показа кнопок
function hideSearchBlocks() {
  blockSearch.forEach((blockElement) => {
    blockElement.classList.add("hidden");
  });
  buttonBtn.classList.remove("hidden");
  btnCross.classList.add("hidden");
}

// Добавляем обработчик клика к input
input.forEach((inputElement) => {
  inputElement.addEventListener("click", (e) => {
    e.stopPropagation(); // Отменяем всплытие события
    showSearchBlocks();
  });
});

// Добавляем обработчик клика к кнопке закрыть
btnCross.addEventListener("click", (e) => {
  e.stopPropagation(); // Отменяем всплытие события
  hideSearchBlocks();
  input.forEach((inputElement) => {
    inputElement.value = ""; // Очищаем значение поля ввода
    inputElement.blur(); // Убираем фокус с поля ввода
  });
});

// Добавляем обработчик клика к документу для скрытия блоков поиска
document.addEventListener("click", () => {
  hideSearchBlocks();
  input.forEach((inputElement) => {
    inputElement.value = ""; // Очищаем значение поля ввода
    inputElement.blur(); // Убираем фокус с поля ввода
  });
});

// Добавляем обработчик клика к блокам поиска, чтобы предотвратить всплытие события
blockSearch.forEach((blockElement) => {
  blockElement.addEventListener("click", (e) => {
    e.stopPropagation(); // Отменяем всплытие события
  });
});

//---------------------------- код на выпадашку внутри make -----------------------------------------------
const inpMakeDiv = document.querySelectorAll(".inp-make-div");
const inpMake = document.querySelectorAll(".inp-make");
const checkMake = document.querySelectorAll(".check-make");
//const checkboxes = select.querySelectorAll('input[type="checkbox"]');

inpMake.forEach((inputElement, index) => {
  inputElement.addEventListener("click", () => {
    // Используйте toggle, чтобы класс "hidden" добавлялся и убирался при каждом клике
    checkMake[index].classList.toggle("hidden");
  });
});
inpMakeDiv.forEach((inputElement, index) => {
  inputElement.addEventListener("click", () => {
    // Используйте toggle, чтобы класс "hidden" добавлялся и убирался при каждом клике
    checkMake[index].classList.toggle("hidden");
  });
});

const checkLabel = document.querySelectorAll(".check-label");

checkLabel.forEach((item) => {
  item.addEventListener("click", () => {
    let parent = item.previousElementSibling;
    while (parent && !parent.classList.contains("chec-flag")) {
      parent = parent.previousElementSibling;
    }

    if (parent && parent.classList.contains("chec-flag")) {
      // Вы можете обращаться к prevTot здесь
      console.log("Найден элемент с классом 'chec-flag':", prevTot);
    } else {
      console.log("Элемент с классом 'chec-flag' не найден.");
    }
  });
});

//========================================================================================================
//--------------------------- код на кнопки all  live  sold ----------------------------------------------

const tabuBtn = document.querySelectorAll(".tabu-body__item");

tabuBtn.forEach((item) => {
  item.addEventListener("click", function () {
    tabuBtn.forEach(function (element) {
      element.classList.remove("_activ");
    });
    item.classList.add("_activ");
  });
});

//===================================================================================================================
function setupDropdown(dataDropdownSelector, dropdownId) {
  const dataDropdown = document.querySelector(dataDropdownSelector);
  const noneBreadcrumb = document.getElementById(dropdownId);

  dataDropdown.addEventListener("click", (event) => {
    event.stopPropagation();
    noneBreadcrumb.classList.toggle("none-breadcrumb");
  });

  document.addEventListener("click", (event) => {
    if (
      !noneBreadcrumb.contains(event.target) &&
      event.target !== dataDropdown
    ) {
      noneBreadcrumb.classList.add("none-breadcrumb");
    }
  });
}

setupDropdown("[data-dropdow-1]", "item-1");
setupDropdown("[data-dropdow-2]", "item-2");
//=========================================================================
