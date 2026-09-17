// Horizon Architectural Films — shared site behavior
 
document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }
 
  // Contact form: submit to Formspree via fetch so the visitor stays on the
  // page and sees an inline success/error message instead of leaving the site.
  var form = document.getElementById("contact-form");
  if (form) {
    var success = document.getElementById("form-success");
    var errorBox = document.getElementById("form-error");
    var submitBtn = form.querySelector('button[type="submit"]');
 
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (success) success.classList.remove("show");
      if (errorBox) errorBox.classList.remove("show");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }
 
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            if (success) {
              success.classList.add("show");
              success.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
            form.reset();
          } else {
            if (errorBox) {
              errorBox.classList.add("show");
              errorBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
          }
        })
        .catch(function () {
          if (errorBox) {
            errorBox.classList.add("show");
            errorBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Request";
          }
        });
    });
  }
 
  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
 
