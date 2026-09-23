/* =====================================================================
   SYED ABDULLAH SHAMSI — PORTFOLIO SCRIPT
   -----------------------------------------------------------------------
   Sections:
     1. Navbar scroll state + active link highlighting
     2. Back-to-top button
     3. Mobile nav: close menu after a link is tapped
     4. Portfolio page: project filtering
     5. Contact form: client-side validation + submit handling
     6. Footer year
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* -------------------------------------------------------------
     1. Navbar: add a stronger background once the page is scrolled,
        and highlight the nav link matching the section in view.
  ------------------------------------------------------------- */
  var nav = document.querySelector(".site-nav");
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav-links a[href^='#'], .nav-links a[href*='#']");

  function onScroll() {
    if (!nav) return;

    // Slightly denser glass once scrolled, so text underneath doesn't clash
    if (window.scrollY > 40) {
      nav.style.background = "rgba(10, 14, 22, 0.78)";
    } else {
      nav.style.background = "rgba(10, 14, 22, 0.55)";
    }

    // Back-to-top visibility
    var toTop = document.querySelector(".to-top");
    if (toTop) {
      if (window.scrollY > 600) toTop.classList.add("show");
      else toTop.classList.remove("show");
    }

    // Active section highlighting (home page only — sections live there)
    if (sections.length) {
      var scrollPos = window.scrollY + 140;
      sections.forEach(function (sec) {
        var top = sec.offsetTop;
        var height = sec.offsetHeight;
        var id = sec.getAttribute("id");
        var link = document.querySelector(".nav-links a[href='#" + id + "']");
        if (!link) return;
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (l) { l.classList.remove("active"); });
          link.classList.add("active");
        }
      });
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll();

  /* -------------------------------------------------------------
     2. Back-to-top button click
  ------------------------------------------------------------- */
  var toTopBtn = document.querySelector(".to-top");
  if (toTopBtn) {
    toTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -------------------------------------------------------------
     3. Mobile nav: auto-close the collapsed menu after tapping a link
  ------------------------------------------------------------- */
  var collapseEl = document.querySelector(".navbar-collapse");
  if (collapseEl) {
    document.querySelectorAll(".navbar-collapse a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (collapseEl.classList.contains("show") && window.bootstrap) {
          var bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl);
          bsCollapse.hide();
        }
      });
    });
  }

  /* -------------------------------------------------------------
     4. Portfolio page: filter project cards by category.
        Each .project-card has a data-category attribute.
        Each .filter-btn has a data-filter attribute matching it,
        or "all" to show everything.
  ------------------------------------------------------------- */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll("[data-category]");

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");

        var filter = btn.getAttribute("data-filter");
        projectCards.forEach(function (card) {
          var cat = card.getAttribute("data-category");
          var show = filter === "all" || cat === filter;
          card.closest(".col-filter-item").style.display = show ? "" : "none";
        });
      });
    });
  }

  /* -------------------------------------------------------------
     5. Contact form
        This form is wired to Formspree (https://formspree.io) — a
        free service that emails form submissions to you without
        needing your own backend, which makes the form work on any
        static host (GitHub Pages, Netlify, Vercel, etc.).

        TO ACTIVATE:
          1. Create a free account at https://formspree.io
          2. Create a new form and copy its endpoint URL
          3. Replace the placeholder "YOUR_FORM_ID" in the form's
             action attribute (in index.html) with your real ID
        Until you do that, the form will still validate client-side
        and show a friendly message, but won't deliver anywhere.
  ------------------------------------------------------------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      var status = document.getElementById("formStatus");
      var nameField = form.querySelector("#name");
      var emailField = form.querySelector("#email");
      var messageField = form.querySelector("#message");

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var isValid = true;
      var problems = [];

      if (!nameField.value.trim()) { isValid = false; problems.push("your name"); }
      if (!emailField.value.trim() || !emailPattern.test(emailField.value.trim())) {
        isValid = false; problems.push("a valid email");
      }
      if (!messageField.value.trim()) { isValid = false; problems.push("a message"); }

      if (!isValid) {
        e.preventDefault();
        status.textContent = "Please add " + problems.join(", ") + " before sending.";
        status.className = "form-status show err";
        return;
      }

      // If the Formspree ID hasn't been set yet, don't attempt the real
      // network request — show guidance instead so the demo still feels
      // complete before deployment.
      if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
        e.preventDefault();
        status.textContent = "Form looks good! Connect a Formspree ID in index.html to start receiving messages (see README).";
        status.className = "form-status show ok";
        return;
      }

      // Otherwise let the form submit normally to Formspree.
      status.textContent = "Sending...";
      status.className = "form-status show ok";
    });
  }

  /* -------------------------------------------------------------
     6. Footer year
  ------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
