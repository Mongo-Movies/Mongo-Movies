window.onload = function () {
    const searchHeaderText = document.querySelector('.search-text');
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        searchHeaderText.textContent = "What would you like to watch this morning?";
    } else if (currentHour < 17) {
        searchHeaderText.textContent = "What would you like to watch this afternoon?";
    } else if (currentHour < 20) {
        searchHeaderText.textContent = "What would you like to watch this evening?";
    } else {
        searchHeaderText.textContent = "What would you like to watch tonight?";
    }
}

const searchInput = document.querySelector('.search-input');
const loadingContainer = document.querySelector('.loading-container');
const moviesContainer = document.getElementById('movies-container');

let currentSearchQuery = '';
let timeoutId = null;

let selectedRoute = 'vidsrc'; // Default route selection

const routeSelect = document.getElementById('route-select');

routeSelect.addEventListener('change', function () {
    selectedRoute = this.value;
});

searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim();

    if (query === '') {
        loadingContainer.style.display = 'none';
        moviesContainer.innerHTML = '';
        return;
    }

    if (query !== currentSearchQuery) {
        currentSearchQuery = query;

        moviesContainer.innerHTML = '';
        loadingContainer.style.display = 'block';

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(async function () {
            if (searchInput.value.trim() === '') {
                loadingContainer.style.display = 'none';
                moviesContainer.innerHTML = '';
                return;
            }

            try {
                const response = await fetch(`/search?query=${query}`);
                const movies = await response.json();

                if (searchInput.value.trim() === '') {
                    loadingContainer.style.display = 'none';
                    moviesContainer.innerHTML = '';
                    return;
                }

                movies.forEach(movie => {
                    const movieBox = document.createElement('div');
                    movieBox.classList.add('movie-box');

                    let movieImage;
                    if (movie.poster_path) {
                        movieImage = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                    } else {
                        movieImage = 'none';
                    }

                    const movieUrl = `${routeMap[selectedRoute]}/${movie.id}`;

                    movieBox.innerHTML = `
                        <div class="movie-image" style="background-image: url('${movieImage}'); background-color: #1f1f1f;" onclick="window.location.href = '${movieUrl}'"></div>
                        <div class="movie-info">
                            <h3>${movie.title}</h3>
                        </div>
                    `;

                    moviesContainer.appendChild(movieBox);
                });

            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                loadingContainer.style.display = 'none';
            }
        }, 1000);
    }
});