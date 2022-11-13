import './css/styles.css';
import Notiflix from 'notiflix';


const galleryElem = document.querySelector('.gallery');
const searchQueryElem = document.querySelector('.search-form input[name=searchQuery]');
const searchForm = document.querySelector('.search-form');
const viewMoreButton = document.querySelector('.button-wrapper button');

let pageNumber = 1;

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchQuery = searchQueryElem.value;

  pageNumber = 1;
  galleryElem.innerHTML = '';
  viewMoreButton.style.visibility = 'hidden';

  await pixabaySearch(searchQuery)
});


viewMoreButton.addEventListener('click', async (event) => {
  await pixabaySearch(searchQueryElem.value)
});



function insertPhoto(photo, galleryElem) {

  galleryElem.insertAdjacentHTML('beforeend', `
  <div class="photo-card">
    <div class="photo-wrapper">
      <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy">
    </div>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span class="info-likes-value">${photo.likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        <span class="info-views-value">${photo.views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <span class="info-comments-value">${photo.comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <span class="info-downloads-value">${photo.downloads}</span>
      </p>
    </div>
  </div>
  `)
};

async function pixabaySearch(searchQuery) {
  const url = `https://pixabay.com/api/?key=18560920-43dc5d459925a8bdd6b74555c&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`;

  const response = await fetch(url);
  const json = await response.json();
  const hits = json.hits;

  if (hits.length === 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  } else {
    pageNumber = pageNumber + 1;
    viewMoreButton.style.visibility = 'visible';
    
    for (const hit of hits) {
      insertPhoto(hit, galleryElem);
    }
  }
}
