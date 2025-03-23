import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showLoader, hideLoader } from './js/render-functions.js';

let searchQuery = '';
let currentPage = 1;
let totalHits = 0;

const form = document.querySelector('.form');
const input = form.querySelector('input[type="text"]');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('#load-more-button');
const loader = document.querySelector('.loader');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  searchQuery = input.value.trim();

  if (!searchQuery) return;

  currentPage = 1;
  showLoader();
  loadMoreButton.style.display = 'none';
  loader.style.display = 'block';
  gallery.innerHTML = '';

  const { images, totalHits: total } = await fetchImages(searchQuery, currentPage);
  renderImages(images);

  totalHits = total;  // Update the totalHits variable
  hideLoader();
  loader.style.display = 'none';
  loadMoreButton.style.display = currentPage * 15 >= totalHits ? 'none' : 'block';
});

loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  const { images, totalHits: total } = await fetchImages(searchQuery, currentPage);
  renderImages(images);

  totalHits = total;  // Update the totalHits variable
  if (currentPage * 15 >= totalHits) {
    loadMoreButton.style.display = 'none';
    alert("We're sorry, but you've reached the end of search results.");
  }

  scrollPage();
});

const scrollPage = () => {
  const cardHeight = document.querySelector('.image-card').getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2, 
    behavior: 'smooth',
  });
};