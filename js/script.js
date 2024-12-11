const global = {
  currentPage: window.location.pathname,
};

const navLinkMovies = document.querySelector("#navLinkMovies");
const navLinkShows = document.querySelector("#navLinkShows");

//Highlight active link
function highlightActiveLink() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.getAttribute("href") === global.currentPage &&
      link.classList.add("active");
  });
}
//Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      console.log("Home");
      break;
    case "/shows.html":
      console.log("Shows");
      break;
    case "/movie-details.html":
      console.log("Movie details");
      break;
    case "/tv-details.html":
      console.log("TV details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
