 document.addEventListener("DOMContentLoaded", function () {
      const form = document.getElementById("form");
      const inputs = form.querySelectorAll("input");
      const dateInput = document.getElementById("dateOrder");
      const dateError = document.getElementById("dateOrder-error");
      const formError = document.getElementById("form-error");

      formError.style.display = "none";

      // Auto-format date input as DD/MM/YYYY
      if (dateInput) {
        dateInput.setAttribute("maxlength", "10");
        dateInput.addEventListener("input", () => {
          let val = dateInput.value.replace(/[^\d]/g, ""); // only digits

          if (val.length > 2 && val.length <= 4) {
            val = val.slice(0, 2) + "/" + val.slice(2);
          } else if (val.length > 4) {
            val = val.slice(0, 2) + "/" + val.slice(2, 4) + "/" + val.slice(4, 8);
          }
          dateInput.value = val;

          // Hide error if input is complete and valid format
          if (val.length === 10) {
            dateError.style.display = "none";
          }
          // Also hide the general form error when typing in date
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

        if (day > daysInMonth[month - 1]) return false;

        return true;
      }

      // Hide errors on input
      inputs.forEach(input => {
        input.addEventListener("input", () => {
          const errorEl = document.getElementById(`${input.id}-error`);
          if (input.value.trim() !== "" && errorEl) {
         errorEl.classList.remove('activeError')
          }
          formError.style.display = "none";
        });
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        inputs.forEach(input => {
          const errorEl = document.getElementById(`${input.id}-error`);
     
          if (input.value.trim() === "") {
            if (errorEl) errorEl.classList.add('activeError')
            isValid = false;
          } else {
            if (errorEl) errorEl.classList.remove('activeError')
          }
        });

        if (dateInput && dateInput.value.trim() !== "") {
          if (!isValidDate(dateInput.value.trim())) {
            dateError.style.display = "block";
            dateInput.focus();
            isValid = false;
          } else {
            dateError.style.display = "none";
          }
        }

        if (!isValid) {
          formError.style.display = "block";
          return;
        } else {
          formError.style.display = "none";
        }

        // All good — do your fetch or submit here:
        const formData = new FormData(form);
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyiTQwQbefgFW9I6ch_VFhrydcYDY6LdvifVPPtUMDxrWAzvUmkFvAtdJo5mo1pepXC/exec';

        fetch(scriptURL, {
          method: "POST",
          body: formData
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