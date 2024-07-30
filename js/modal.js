const bodyPage_new = document.getElementById("body-page");
const modals_active = [];
const modal_close = (modal_name = "popup-bg", is_old_close = false) => {
  const modal = document.querySelector(`#${modal_name}`);
  if (modal) modal.classList.add("hidden");
  closeAllModal(is_old_close);
  if (bodyPage_new) bodyPage_new.classList.remove("overflow-hidden");
  modals_active.length = 0;
};
const modal_open = (modal_name = "popup-bg", is_old_close = false) => {
  const modal = document.querySelector(`#${modal_name}`);
  modals_active.push(modal);

  if (modal) modal.classList.remove("hidden");
  closeAllModal(is_old_close);
  if (bodyPage_new) bodyPage_new.classList.add("overflow-hidden");
};

const closeAllModal = (is_old_close = false) => {
  if (is_old_close) {
    modals_active.forEach((item) => {
      item.classList.add("hidden");
    });
    modals_active.length = 0;
  }
};

const changeClassBlocs = (one_block_name, two_block_name, class_name) => {
  const one_block = document.querySelector(`#${one_block_name}`);
  const two_block = document.querySelector(`#${two_block_name}`);
  if (one_block && two_block && class_name) {
    one_block.classList.add(class_name);
    two_block.classList.remove(class_name);
  }
};

// закрытие модалки при нажатии на Esc
const escBtn = document.getElementById("popup-bg");

// Закрытие модального окна при нажатии клавиши "Escape"
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal_close(); // Закрыть модальное окно с помощью вашей функции modal_close
  }
});
//=======================================================================================
// --------------------------- синий фон на странице sign-up ----------------------------
// Обработчик события "DOMContentLoaded" для выполнения кода после загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
  const bacgBlue = document.getElementById("bacg-blue"); // синий фон страницы sign-up

  // Функция для проверки и обработки изменений ширины окна
  function handleWindowResize() {
    const windowWidth = window.innerWidth;

    if (windowWidth > 767.98) {
      bacgBlue.classList.add("bacg-blue");
    } else {
      bacgBlue.classList.remove("bacg-blue");
    }
  }

  // Вызываем функцию при загрузке страницы и при изменении размера окна
  handleWindowResize();
  window.addEventListener("resize", handleWindowResize);
});
//============================================================================================
//------------------------- код на глазик на инпуте пароль sign-in  ---------------------------------------------

function togglePasswordVisibility(passwordId, eyeIconId) {
  const pass = document.getElementById(passwordId);
  const eyeIcon = document.getElementById(eyeIconId);

  if (pass.type === "password") {
    pass.type = "text";
    eyeIcon.classList.remove("icon-eye");
    eyeIcon.classList.add("icon-eye-activ");
  } else {
    pass.type = "password";
    eyeIcon.classList.remove("icon-eye-activ");
    eyeIcon.classList.add("icon-eye");
  }
}
