document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const inputs = form.querySelectorAll("input[type='text'], input[type='date']");
  const dateInput = document.getElementById("dateOrder");
  const dateError = document.getElementById("dateOrder-error");
  const formError = document.getElementById("form-error");

  formError.style.display = "none";

  // Auto-format and validate date input as DD/MM/YYYY
  if (dateInput) {
    dateInput.setAttribute("maxlength", "10");
    dateInput.addEventListener("input", () => {
      let val = dateInput.value.replace(/[^\d]/g, "");

      if (val.length > 2 && val.length <= 4) {
        val = val.slice(0, 2) + "/" + val.slice(2);
      } else if (val.length > 4) {
        val = val.slice(0, 2) + "/" + val.slice(2, 4) + "/" + val.slice(4, 8);
      }
      dateInput.value = val;

      const trimmedVal = dateInput.value.trim();

      if (trimmedVal.length === 10) {
        if (!isValidDate(trimmedVal)) {
          dateError.style.display = "block";
        }
      }

      formError.style.display = "none";
    });
  }

  function isValidDate(dateStr) {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return false;
    const [day, month, year] = dateStr.split("/").map(Number);
    if (month < 1 || month > 12) return false;
    if (day < 1) return false;

    const daysInMonth = [
      31,
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
      31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
    ];
    return day <= daysInMonth[month - 1];
  }

  // Hide error messages on input
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      const errorEl = document.getElementById(`${input.id}-error`);
      if (input.value.trim() !== "" && errorEl) {
        errorEl.classList.remove("activeError");
      }
      formError.style.display = "none";
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;
    let firstErrorElement = null;

    // Validate text/date inputs
    inputs.forEach(input => {
      const errorEl = document.getElementById(`${input.id}-error`);
      if (input.value.trim() === "") {
        if (errorEl) {
          errorEl.classList.add("activeError");
          if (!firstErrorElement) firstErrorElement = errorEl;
        }
        isValid = false;
      } else {
        if (errorEl) errorEl.classList.remove("activeError");
      }
    });

    // Validate date
    if (dateInput) {
      const dateVal = dateInput.value.trim();
      if (dateVal === "" || dateVal.length < 10 || !isValidDate(dateVal)) {
        dateError.style.display = "block";
        if (!firstErrorElement) firstErrorElement = dateError;
        isValid = false;
      } 
    }

    // Validate all radio groups
    const radioGroups = new Set();
    form.querySelectorAll('input[type="radio"]').forEach(radio => {
      radioGroups.add(radio.name);
    });

    radioGroups.forEach(groupName => {
      const radios = form.querySelectorAll(`input[name="${groupName}"]`);
      const isChecked = Array.from(radios).some(radio => radio.checked);
      const errorEl = document.getElementById(`${groupName}-error`);
      if (!isChecked) {
        if (errorEl) {
          errorEl.style.display = "block";
          if (!firstErrorElement) firstErrorElement = errorEl;
        }
        isValid = false;
      } else {
        if (errorEl) errorEl.style.display = "none";
      }
    });

    if (!isValid) {
      formError.style.display = "block";

      // Scroll to first error
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      return;
    }

    formError.style.display = "none";

    // Submit form
    const formData = new FormData(form);
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyK2_wmdj0W9wKEwZUiMw3x4DsiPW8ajuLO3d_7a24lB2MuXNY-r9aJV67Ksz_rfAr9/exec';

    fetch(scriptURL, {
      method: "POST",
      body: formData,
    })
      .then(response => {
        alert("הטופס נשלח בהצלחה!");
        form.reset();
      })
      .catch(error => {
        alert("שגיאה! " + error.message);
      });
  });
});
