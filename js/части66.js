let event = new Event("change", { bubbles: true });
let timeoutChangeFilterss = null;
$(function () {
  $(".filter_car_form").change(function (e) {
    let $form = $(this);
    if (timeoutChangeFilterss) {
      clearTimeout(timeoutChangeFilterss);
      timeoutChangeFilterss = null;
    }
    timeoutChangeFilterss = setTimeout(() => {
      filter_car_form(e, $form);
    }, 1000);
  });
});
function generated_mark(formData) {
  let startTime = performance.now();
  let postData = { formData: formData, markButtons: versions.markButtons++ };
  SendPostRequest(getAjaxLink("get_mark_buttons"), postData)
    .then((responseData) => {
      let menuMarkButtonsView_mine = document.querySelector(
        "#menuMarkButtonsView_mine"
      );
      menuMarkButtonsView_mine.innerHTML = responseData.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
function filter_car_form(e, $form) {
  let url = $form.attr("action");
  let formData = $form.serialize();
  formData = remove_empty_params(formData, noDataFilters);
  let breadcrumb_mine = document.querySelector(".breadcrumb_mine");
  generated_mark(formData);
  $.ajax({
    type: $form.attr("method"),
    url: url,
    headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
    data: formData,
  })
    .done(function (response) {
      let newURL =
        "auction" + "?" + remove_empty_params(formData, noDataFiltersHidden);
      history.pushState({}, "", newURL);
      let carCardList = response.html;
      let bradrumsView = response.bradrumsView;
      document.querySelector(".car_card_lis").innerHTML = carCardList;
      breadcrumb_mine.innerHTML = bradrumsView;
      getPaginate();
      console.log("Запрос выполнен");
    })
    .fail(function () {
      console.log("fail");
    });
  e.preventDefault();
}
let versions = { pagination: 0, markButtons: 0 };
function getPaginate() {
  let startTime = performance.now();
  let postData = {
    pagination: versions.pagination++,
    page_name: "page.catalog",
  };
  SendPostRequest(getAjaxLink("get_paginate"), postData)
    .then((responseData) => {
      let pagination_mine = document.querySelector("#pagination_mine");
      pagination_mine.innerHTML = responseData.dd;
      let executionTime = performance.now() - startTime;
    })
    .catch((error) => {
      console.error(error);
    });
}
function clear_url() {
  const currentURL = window.location.href;
  const url = new URL(currentURL);
  const params = url.searchParams;
  let formData = remove_empty_params(params, noDataFilters);
  let newURL;
  if (formData === "") {
    newURL = "auction";
  } else {
    newURL = "auction" + "?" + formData;
  }
  history.pushState({}, "", newURL);
}
clear_url();
function remove_empty_params(queryString, noData) {
  const params = new URLSearchParams(queryString);
  const updatedParams = new URLSearchParams();
  for (const [key, value] of params) {
    if (value !== "" && value !== null && noData[key] != value) {
      updatedParams.append(key, value);
    }
  }
  return updatedParams.toString();
}
function remove_empty_params2(queryString, noData) {
  const params = new URLSearchParams(queryString);
  let values = {};
  for (let [key, value] of params) {
    if (value !== "" && value !== null && noData[key] !== value) {
      if (key.includes("[]")) {
        key = key.replace("[]", "");
      }
      if (values[key]) {
        values[key] += "," + value;
      } else {
        values[key] = value;
      }
    }
  }
  let url = "";
  for (const name in values) {
    url += name + "=" + values[name] + "&";
  }
  url = url.slice(0, -1);
  return url;
}
function click_all_filters(clickedCheckbox) {
  let nameAttribute = clickedCheckbox.getAttribute("name");
  let checkboxesWithSameName = document.querySelectorAll(
    'input[type="checkbox"][name="' + nameAttribute + '"]'
  );
  checkboxesWithSameName.forEach(function (checkbox) {
    checkbox.checked = checkbox === clickedCheckbox;
  });
}
function make_first_checkbox_inactive(clickedCheckbox) {
  let nameAttribute = clickedCheckbox.getAttribute("name");
  let checkboxesWithSameName = document.querySelectorAll(
    'input[type="checkbox"][name="' + nameAttribute + '"]'
  );
  let count_active = 0;
  let all_check;
  checkboxesWithSameName.forEach(function (checkbox) {
    if (checkbox.value === "") {
      all_check = checkbox;
      all_check.checked = false;
    }
    if (checkbox.checked) {
      count_active++;
    }
  });
  if (count_active === checkboxesWithSameName.length - 1) {
    all_check.checked = true;
  }
}
function clear_all_filters() {
  const mark_list = document.querySelectorAll(
    ".catalog_filter_select_makes input:checked"
  );
  mark_list.forEach((item) => {
    item.checked = false;
  });
  const min_value = document.querySelector("#min-value");
  const max_value = document.querySelector("#max-value");
  min_value.value = noDataFilters["min-year"];
  max_value.value = noDataFilters["max-year"];
  let all_filters = document.querySelectorAll(".all_filters");
  all_filters[0].click();
  setTimeout(() => {
    all_filters.forEach((filter) => {
      filter.click();
    });
  }, 1000);
}
function clear_one_filters(request) {
  const filter_name = request.split("||")[0];
  const filter_value = request.split("||")[1];
  const element = document.querySelector(
    'input[name="' + filter_name + '\\[\\]"][value="' + filter_value + '"]'
  );
  element.click();
}
const searchItems = document.querySelectorAll(
  ".catalog_filter_select_makes .find_marks, .catalog_filter_select_makes .find_model"
);
const searchInput = document.querySelector("#inp-find-makes");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchString = searchInput.value.trim().toLowerCase();
    if (searchString.length > 1) {
      let temp_open_wrapper_all_models = [];
      searchItems.forEach((item) => {
        const text = item.innerText.toLowerCase();
        const find_marks_wrapper_model = item.closest(
          ".find_marks_wrapper_model"
        );
        const find_marks_wrapper_mark = item.closest(
          ".find_marks_wrapper_mark"
        );
        let temp_open = false;
        const wrapper_all_models = item.closest(".check_container");
        if (find_marks_wrapper_mark) {
          if (text.includes(searchString)) {
            find_marks_wrapper_mark.style.display = "block";
            temp_open = true;
            temp_open_wrapper_all_models.push(wrapper_all_models);
          } else {
            find_marks_wrapper_mark.style.display = "none";
          }
        } else {
          const check_container = item
            .closest(".check_container")
            .querySelector(".find_marks_wrapper_mark");
          if (text.includes(searchString)) {
            temp_open_wrapper_all_models.push(wrapper_all_models);
            check_container.style.display = "block";
            find_marks_wrapper_model.style.display = "block";
            wrapper_all_models
              .querySelector(".wrapper_all_models")
              .classList.remove("hidden");
          } else {
            if (!temp_open_wrapper_all_models.includes(wrapper_all_models)) {
              check_container.style.display = "none";
              find_marks_wrapper_model.style.display = "none";
            }
          }
        }
      });
    } else {
      searchItems.forEach((item) => {
        item.closest(".find_marks_wrapper").style.display = "block";
      });
    }
  });
}
function change_sort(sort_name, sort_orderBy) {
  const filter_form = document.querySelector("#filter_form");
  const form_sortName = filter_form.querySelector('input[name="sort"]');
  const form_orderBy = filter_form.querySelector('input[name="order_by"]');
  form_sortName.value = sort_name;
  form_orderBy.value = sort_orderBy;
  filter_form.dispatchEvent(event);
}
