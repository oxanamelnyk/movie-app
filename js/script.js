const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "8a2dbd267e35d1060b66f5634a4d97fe",
    apiUrl: "https://api.themoviedb.org/3/",
  },
};

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

//Search Movies/Shows
async function search() {
  const queryString = window.location.search;
  console.log(queryString);

  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");

  if (global.search.term !== "" && global.search.term !== null) {
    const { results, page, total_pages, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert("No results found");
      return;
    }

    displaySearchResults(results);
    document.querySelector("#search-term").value = "";
  } else {
    showAlert("Please enter a search term");
  }
}

function displaySearchResults(results) {
  //Clear previous results
  document.querySelector("#search-results").innerHTML = "";
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";

  results.forEach((result) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("card");
    movieEl.innerHTML = `
        <a href="${global.search.type}-details.html?id=${result.id}">
        ${
          result.poster_path
            ? `<img
        src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
        class="card-img-top"
        alt="${global.search.type === "movie" ? result.title : result.name}"
      />`
            : `<img
              src="../images/no-image.jpg}"
              class="card-img-top"
              alt="${
                global.search.type === "movie" ? result.title : result.name
              }"
            />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${
          global.search.type === "movie" ? result.title : result.name
        }</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${
            global.search.type === "movie"
              ? result.release_date
              : result.first_air_date
          }
          </small>
        </p>
      </div>
        `;

    document.querySelector(
      "#search-results-heading"
    ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`;

    document.querySelector("#search-results").appendChild(movieEl);
  });

  displayPagination();
}

//Create and Display Pagination For Search
function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
    <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;

  document.querySelector("#pagination").appendChild(div);

  //Disable prev button if on first page
  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }

  if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").disabled = true;
  }

  //Next page
  document.querySelector("#next").addEventListener("click", async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });

   //Prev page
   document.querySelector("#prev").addEventListener("click", async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
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
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

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

//Make request to search
async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
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

//Show Alert
function showAlert(message, className = "error") {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
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
      search();
      break;
  }
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
