const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});
