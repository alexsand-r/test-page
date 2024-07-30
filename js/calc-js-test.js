"use strict";

const auctionFeeElement = document.getElementById("auction-fee"); // Auction fee
const deliveryPriceElement = document.getElementById("delivery-price"); // Delivery price
const totalElement = document.getElementById("total"); // Total
const defaultSearchElement = document.getElementById("default-search-1"); // поле поиска Bid
const finalPriceElement = document.getElementById("final-price"); // поле для отображения итоговой цены
const tableTotalElement = document.getElementById("table-total"); // спан для отображения в таблице
const btnPlus = document.querySelectorAll(".btn-plus"); // кнопка +
const btnMinus = document.querySelectorAll(".btn-minus"); // кнопка -
const countrySelect = document.getElementById("countries"); // Выбор страны
const checkboxElement = document.querySelector("input[type='checkbox']"); // Чекбокс

// Функция для форматирования числа с разделителем тысяч в виде точки
function formatNumberWithDotSeparator(number) {
  if (number >= 10000) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return number.toString();
  }
}

// Функция для обновления значений
function updateValues() {
  // Получаем текущее значение из инпута и убираем символы, оставляя только цифры
  const inputValue = defaultSearchElement.value;
  let defaultSearchValue = parseFloat(inputValue.replace(/[^0-9]/g, ""));

  // Убеждаемся, что значение не NaN, и если так, устанавливаем его в 0
  if (isNaN(defaultSearchValue)) {
    defaultSearchValue = 0;
  }

  // Получаем значение выбранной страны из элемента <select>
  const selectedCountryValue = parseFloat(
    countrySelect.options[countrySelect.selectedIndex].value.replace(
      /[^0-9.]/g,
      ""
    )
  );

  // Обновляем сумму доставки
  deliveryPriceElement.textContent =
    "$" + formatNumberWithDotSeparator(selectedCountryValue);

  //! Обновляем сумму аукционного сбора
  const auctionFeeValue = Math.round((5 / 100) * defaultSearchValue);
  auctionFeeElement.textContent =
    "$" + formatNumberWithDotSeparator(auctionFeeValue);

  // Обновляем итоговую цену с учетом состояния чекбокса
  let finalPriceValue = defaultSearchValue;

  if (checkboxElement.checked) {
    finalPriceValue *= 1.03; // Увеличиваем на 3% при включенном чекбоксе
    finalPriceValue = Math.round(finalPriceValue); //! Округляем до целого числа
  }

  finalPriceElement.textContent =
    "$" + formatNumberWithDotSeparator(finalPriceValue);

  // Обновляем общую сумму
  const deliveryPrice = parseFloat(
    deliveryPriceElement.textContent
      .replace("$", "")
      .replace(/\./g, "")
      .replace(",", ".")
  );

  const totalSum = auctionFeeValue + finalPriceValue + deliveryPrice;

  totalElement.textContent = "$" + formatNumberWithDotSeparator(totalSum);
  tableTotalElement.textContent = "$" + formatNumberWithDotSeparator(totalSum);
}

// Добавляем обработчик события для кнопки "+"
btnPlus.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Получаем текущее значение из инпута и увеличиваем его на 100
    const inputValue = defaultSearchElement.value;
    let defaultSearchValue = parseFloat(inputValue.replace(/[^0-9]/g, ""));
    defaultSearchValue += 100;

    // Обновляем значение в инпуте с новым значением
    defaultSearchElement.value =
      formatNumberWithDotSeparator(defaultSearchValue);

    // Обновляем все остальные значения
    updateValues();
  });
});

// Добавляем обработчик события для кнопки "-"
btnMinus.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Получаем текущее значение из инпута и уменьшаем его на 100, но не меньше 0
    const inputValue = defaultSearchElement.value;
    let defaultSearchValue = parseFloat(inputValue.replace(/[^0-9]/g, ""));
    defaultSearchValue -= 100;
    if (defaultSearchValue < 0) {
      defaultSearchValue = 0;
    }

    // Обновляем значение в инпуте с новым значением
    defaultSearchElement.value =
      formatNumberWithDotSeparator(defaultSearchValue);

    // Обновляем все остальные значения
    updateValues();
  });
});

// Добавляем обработчик события для изменения выбора страны
countrySelect.addEventListener("change", () => {
  // Обновляем все значения при изменении выбора страны
  updateValues();
});

// Добавляем обработчик события для чекбокса
checkboxElement.addEventListener("change", () => {
  // Обновляем итоговую цену при изменении состояния чекбокса
  updateValues();
});

// Добавляем обработчик события для инпута
defaultSearchElement.addEventListener("input", () => {
  // Вызываем функцию для обновления значений при вводе данных в инпут
  updateValues();
});

const inputElement = document.getElementById("default-search-1");

// Добавляем обработчик события при фокусировке на инпуте
inputElement.addEventListener("click", () => {
  // Задаем тайм-аут для перемещения курсора в конец значения инпута
  setTimeout(function () {
    inputElement.setSelectionRange(
      inputElement.value.length,
      inputElement.value.length
    );
  }, 0);
});

// Вызываем функцию для инициализации значений
updateValues();
