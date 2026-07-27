/**
 * Third Room — Main JavaScript
 *
 * Handles:
 *   1. Dark/light theme toggle (persists to localStorage)
 *   2. Mobile navigation toggle
 *   3. Site search (loads assets/data/content-index.json)
 *   4. Newsletter form placeholder
 *
 * All content lives in HTML. Edit content-index.json when adding pages.
 */

(function () {
  "use strict";

  var THEME_KEY = "thirdroom-theme";
  var searchIndex = null;

  /* -------------------------------------------------------------------------
     Theme Toggle
     ------------------------------------------------------------------------- */
  function getPreferredTheme() {
    var stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    updateThemeToggleLabel(theme);
  }

  function updateThemeToggleLabel(theme) {
    var toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    var isLight = theme === "light";
    toggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    toggle.setAttribute("title", isLight ? "Switch to dark mode" : "Switch to light mode");

    var moon = toggle.querySelector(".icon-moon");
    var sun = toggle.querySelector(".icon-sun");
    if (moon) moon.hidden = isLight;
    if (sun) sun.hidden = !isLight;
  }

  function initTheme() {
    applyTheme(getPreferredTheme());

    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme") || "dark";
        var next = current === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    }
  }

  /* -------------------------------------------------------------------------
     Mobile Navigation
     ------------------------------------------------------------------------- */
  function initNavigation() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* -------------------------------------------------------------------------
     Search — uses assets/data/content-index.json
     ------------------------------------------------------------------------- */
  function getSiteRootPrefix() {
    var link = document.querySelector('link[href*="assets/css/main.css"]');
    if (!link) return "";
    return link.getAttribute("href").replace("assets/css/main.css", "");
  }

  function resolveSiteUrl(path) {
    return getSiteRootPrefix() + path.replace(/^\//, "");
  }

  function loadSearchIndex() {
    if (searchIndex) {
      return Promise.resolve(searchIndex);
    }
    var url = resolveSiteUrl("assets/data/content-index.json");
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("Index not found");
        return res.json();
      })
      .then(function (data) {
        searchIndex = data;
        return data;
      });
  }

  function searchPages(query) {
    var q = query.toLowerCase().trim();
    if (!q || !searchIndex || !searchIndex.pages) return [];

    return searchIndex.pages.filter(function (page) {
      return (
        page.title.toLowerCase().indexOf(q) !== -1 ||
        page.topic.toLowerCase().indexOf(q) !== -1 ||
        page.type.toLowerCase().indexOf(q) !== -1
      );
    });
  }

  function renderResults(list, results, query) {
    list.innerHTML = "";
    list.classList.add("is-visible");
    list.setAttribute("role", "listbox");
    list.id = list.id || "search-results";

    if (results.length === 0) {
      var empty = document.createElement("li");
      empty.className = "search-results-empty";
      empty.textContent = 'No results for "' + query + '"';
      empty.setAttribute("role", "presentation");
      list.appendChild(empty);
      return;
    }

    results.slice(0, 8).forEach(function (page) {
      var li = document.createElement("li");
      li.setAttribute("role", "none");
      var a = document.createElement("a");
      a.href = resolveSiteUrl(page.url);
      a.setAttribute("role", "option");
      a.innerHTML = page.title + '<span class="search-result-type">' + page.type.replace("-", " ") + " · " + page.topic + "</span>";
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function initSearch() {
    var forms = document.querySelectorAll(".search-form");

    forms.forEach(function (form, i) {
      var input = form.querySelector(".search-input");
      if (!input) return;

      var list = document.createElement("ul");
      list.className = "search-results";
      list.id = "search-results-" + i;
      list.hidden = true;
      form.appendChild(list);

      input.setAttribute("aria-controls", list.id);
      input.setAttribute("aria-expanded", "false");
      input.setAttribute("autocomplete", "off");

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var query = input.value.trim();
        if (!query) return;

        loadSearchIndex()
          .then(function () {
            renderResults(list, searchPages(query), query);
            input.setAttribute("aria-expanded", "true");
          })
          .catch(function () {
            list.innerHTML = "";
            var msg = document.createElement("li");
            msg.className = "search-results-empty";
            msg.textContent = "Search requires a local server (see README).";
            list.appendChild(msg);
            list.classList.add("is-visible");
          });
      });

      input.addEventListener("input", function () {
        if (!input.value.trim()) {
          list.classList.remove("is-visible");
          list.innerHTML = "";
          input.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".search-form")) {
        document.querySelectorAll(".search-results").forEach(function (list) {
          list.classList.remove("is-visible");
        });
        document.querySelectorAll(".search-input").forEach(function (input) {
          input.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  /* -------------------------------------------------------------------------
     Newsletter Placeholder
     ------------------------------------------------------------------------- */
  function initNewsletter() {
    document.querySelectorAll(".newsletter-form").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = form.querySelector(".newsletter-input");
        if (input) {
          input.value = "";
          input.placeholder = "Newsletter coming soon.";
          setTimeout(function () {
            input.placeholder = "your@email.com";
          }, 3000);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    initTheme();
    initNavigation();
    initSearch();
    initNewsletter();
  }
})();
