const sidebarToggleBtns = document.querySelectorAll(".sidebar-toggle");
const sidebar = document.querySelector(".sidebar");
const searchForm = document.querySelector(".search-form");
const menuLinks = document.querySelectorAll(".menu-link");

sidebarToggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
});

searchForm.addEventListener("click", () => {
  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
    searchForm.querySelector("input").focus();
  }
});

menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    document.querySelector(".menu-link.active")?.classList.remove("active");
    link.classList.add("active");
  });
});

if (window.innerWidth > 768) sidebar.classList.remove("collapsed");
