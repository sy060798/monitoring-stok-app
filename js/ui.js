document.addEventListener("DOMContentLoaded", () => {
  setActiveMenu();
});

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("collapsed");
}

/* =========================
   ACTIVE MENU
========================= */
function setActiveMenu() {
  const links = document.querySelectorAll(".sidebar nav a");
  const current = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");

    if (href === current) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
