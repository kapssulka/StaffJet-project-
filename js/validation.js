// VALIDATION FORM
const form = document.getElementById("js-form");
const formButtonWrapper = document.getElementById("js-form-btn");
const formButton = form.querySelector("button");

window.addEventListener("pageshow", () => {
  document.getElementById("js-form").reset();
});

document.addEventListener("DOMContentLoaded", () => {
  if (form) {
    const name = form.querySelector("#name");
    const tel = form.querySelector("#tel");
    const email = form.querySelector("#email");
    const checkbox = form.querySelector("#privacy_policy");

    const popup = document.getElementById("js-pop-up");

    const paternTelEl = document.getElementById("js-tel-pattern");

    // get value
    let nameValue = name.value;
    let telValue = tel.value;
    let emailValue = email.value;
    let checkboxlValue = checkbox.checked;

    formButtonWrapper.addEventListener("click", async () => {
      let isValidateName = validation(name, nameValue, "name");
      let isValidateTel = validation(tel, telValue, "tel");
      let isValidateEmail = validation(email, emailValue, "email");
      let isChecked = validation(checkbox, checkboxlValue, "checkbox");

      if (isValidateName && isValidateTel && isValidateEmail && isChecked) {
        formButton.disabled = false;

        const formData = new FormData(form);

        // ЭТОТ КОД МОЖНО УБРАТЬ КОГДА БУДЕТ ПРАВИЛЬНЫЙ ПУТЬ ДЛЯ ОТПРАВКИ fetch
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        popup.style.display = "flex";
        setTimeout(() => {
          document.body.classList.add("_hidden");
          popup.classList.add("_active");
        }, 0);

        form.reset();
        formButton.disabled = true;

        nameValue = "";
        telValue = "";
        emailValue = "";
        checkboxlValue = "";

        // ОТПРАВКА ЗАПРОСА НА СЕРВЕР (раскомментировать и указать правильный путь на файл)
        // try {
        //   const response = await fetch("server.php", {
        //     method: "POST",
        //     body: formData,
        //   });

        //   if (response.ok) {
        //     popup.style.display = "flex";
        //     setTimeout(() => {
        //       document.body.classList.add("_hidden");
        //       popup.classList.add("_active");
        //     }, 0);

        //     form.reset();
        //     formButton.disabled = true;

        //     nameValue = "";
        //     telValue = "";
        //     emailValue = "";
        //     checkboxlValue = "";
        //   }
        // } catch (error) {
        //   console.error("Ошибка запроса:", error);
        // }
      } else formButton.disabled = true;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    // валидация полей
    name.addEventListener("blur", (e) => {
      nameValue = e.target.value;
      validation(name, e.target.value, "name");
    });

    tel.addEventListener("blur", (e) => {
      telValue = e.target.value;

      paternTelEl.classList.remove("_focus");

      validation(tel, e.target.value, "tel");
    });

    email.addEventListener("blur", (e) => {
      emailValue = e.target.value;

      validation(email, e.target.value, "email");
    });

    checkbox.addEventListener("change", (e) => {
      checkboxlValue = e.target.checked;

      validation(checkbox, e.target.checked, "checkbox");
    });

    // показ паттерна
    tel.addEventListener("focus", (e) => {
      if (e.target.value.length < 1) paternTelEl.classList.add("_focus");
    });
    tel.addEventListener("input", (e) => {
      if (e.target.value.length > 0) paternTelEl.classList.remove("_focus");
      else paternTelEl.classList.add("_focus");
    });

    // HELPER
    function validation(input, inputValue = null, rule) {
      const value = inputValue || input.innerText;

      const wrapper = input.closest(".js-required-wrapper-input");

      const errorEl = wrapper.querySelector(".input-form__error");

      if (rule === "name") {
        if (value.length < 2) {
          formButton.disabled = true;
          wrapper.classList.add("_error");
          return false;
        } else {
          formButton.disabled = false;
          wrapper.classList.remove("_error");
          return true;
        }
      }

      if (rule === "tel") {
        const phonePattern =
          /^\+?\d{1,4}[\s\-]?\(?\d{1,5}\)?[\s\-]?\d{1,5}[\s\-]?\d{1,5}$/;

        if (value.length < 2) {
          formButton.disabled = true;
          wrapper.classList.add("_error");
          errorEl.innerText = "Заполните поле";
          return false;
        } else if (!phonePattern.test(value)) {
          formButton.disabled = true;
          wrapper.classList.add("_error");
          errorEl.innerText = "Заполните поле правильно";
          return false;
        } else {
          formButton.disabled = false;
          wrapper.classList.remove("_error");
          return true;
        }
      }

      if (rule === "email") {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (value.length < 2) {
          formButton.disabled = true;
          errorEl.innerText = "Заполните поле";
          wrapper.classList.add("_error");
          return false;
        } else if (!emailPattern.test(value)) {
          formButton.disabled = true;
          wrapper.classList.add("_error");
          errorEl.innerText = "Заполните поле правильно";
          return false;
        } else {
          formButton.disabled = false;
          wrapper.classList.remove("_error");
          return true;
        }
      }

      if (rule === "checkbox") {
        if (!value) {
          formButton.disabled = true;
          wrapper.classList.add("_error");
          return false;
        } else {
          formButton.disabled = false;
          wrapper.classList.remove("_error");

          return true;
        }
      }
    }
  }
});
