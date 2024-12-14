const global = {
  currentPage: window.location.pathname,
};

const navLinkMovies = document.querySelector("#navLinkMovies");
const navLinkShows = document.querySelector("#navLinkShows");

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("card");
    movieEl.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    ${
      movie.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />`
        : `<img
          src="../images/no-image.jpg}"
          class="card-img-top"
          alt="${movie.title}"
        />`
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${movie.release_date}
     
      </small>
    </p>
  </div>
    `;

    document.querySelector("#popular-movies").appendChild(movieEl);
  });
}

async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");
  results.forEach((show) => {
    const showEl = document.createElement("div");
    showEl.classList.add("card");
    showEl.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
    ${
      show.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
      class="card-img-top"
      alt="${show.original_name}"
    />`
        : `<img
            src="../images/no-image.jpg}"
            class="card-img-top"
            alt="${show.original_name}"
          />`
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${show.original_name}</h5>
    <p class="card-text">
      <small class="text-muted">Aired: ${show.first_air_date}</small>
    </p>
  </div>
      `;

    document.querySelector("#popular-shows").appendChild(showEl);
  });
}

//Display movie details
async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];

  const movie = await fetchAPIData(`movie/${movieId}`);

  //Overlay to background image
  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    movie.poster_path
      ? `<img
  src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
  class="card-img-top"
  alt="${movie.title}"
/>`
      : `<img
        src="../images/no-image.jpg}"
        class="card-img-top"
        alt="${movie.title}"
      />`
  }
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"${movie.vote_average.toFixed(1)}></i>
      8 / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}X</p>
    <p>
    ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
  ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
</ul>
    <a href="${
      movie.homepage
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${addComasToNumber(
      movie.budget
    )}</li>
    <li><span class="text-secondary">Revenue:</span> $${addComasToNumber(
      movie.revenue
    )}</li>
    <li><span class="text-secondary">Runtime:</span> ${
      movie.runtime
    } minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
  ${movie.production_companies
    .map((company) => ` <span">${company.name}</span>`)
    .join(", ")}
    </div>
    </div>

`;

  document.querySelector("#movie-details").appendChild(div);
}

//Display movie details
async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];

  const show = await fetchAPIData(`tv/${showId}`);

  //Overlay to background image
  displayBackgroundImage("tv", show.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
    <div class="details-top">
    <div>
    ${
      show.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
    class="card-img-top"
    alt="${show.name}"
  />`
        : `<img
          src="../images/no-image.jpg}"
          class="card-img-top"
          alt="${show.name}"
        />`
    }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"${show.vote_average.toFixed(1)}></i>
        8 / 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
      ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
    ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
  </ul>
      <a href="${
        show.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Number of episods:</span> ${
        show.number_of_episodes
      }</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${
        show.last_episode_to_air.air_date
      }</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${show.production_companies
      .map((company) => ` <span">${company.name}</span>`)
      .join(", ")}
      </div>
      </div>
  
  `;

  document.querySelector("#show-details").appendChild(div);
}

//Display Slider Movies
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    <img src="http://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
  </a>
  <h4 class="swiper-rating">
    <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
  </h4>
    `;

    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

//Display Backdrop On Details Page
function displayBackgroundImage(type, backdrop_path) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(http://image.tmdb.org/t/p/original/${backdrop_path})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = " 0.1";

  type === "movie"
    ? document.querySelector("#movie-details").appendChild(overlayDiv)
    : document.querySelector("#show-details").appendChild(overlayDiv);
}

//Fetch data from TMDB
async function fetchAPIData(endpoint) {
  const API_KEY = "8a2dbd267e35d1060b66f5634a4d97fe";
  const API_URL = "https://api.themoviedb.org/3/"; // змінено URL

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

//Highlight active link
function highlightActiveLink() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.getAttribute("href") === global.currentPage &&
      link.classList.add("active");
  });
}

function addComasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displaySlider();
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayShowDetails();
      break;
    case "/search.html":
      break;
  }
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
