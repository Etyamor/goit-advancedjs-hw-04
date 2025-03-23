import SimpleLightbox from 'simplelightbox';
import fetchApiData from './js/pixabay-api';
import generateGalleryMarkup from './js/render-functions';
import iziToast from 'izitoast';

let page = 1, lastQuery = '';

const perPage = 15,
  loadMoreGap = 44,
  formElement = document.querySelector('.js-form'),
  loaderElement = document.querySelector('.js-loader'),
  loadMoreBtn = document.querySelector('.load-more'),
  galleryContainer = document.querySelector('.js-gallery'),
  simpleLightboxInstance = new SimpleLightbox('.js-gallery a.gallery-link', {
    captionDelay: 250,
    overlayOpacity: 0.8,
  }),
  submitHandler = event => {
    event.preventDefault();
    if (lastQuery === query && page == 1) {
      return;
    }

    loaderElement.style.display = 'flex';
    var query = event.target.elements['user-query'].value;
    lastQuery = query;
    page = 1;

    fetchApiData(query, page, perPage)
      .then(response => {
        if (response.length == 0) {
          galleryContainer.innerHTML = '';
          loadMoreBtn.style.display = 'none';
          return;
        }
        let images = response.images;
        galleryContainer.innerHTML = generateGalleryMarkup(images);
        simpleLightboxInstance.refresh();
        loadMoreBtn.style.display = (response.total > perPage) ? 'block' : 'none';
      })
      .finally(() => {
        formElement.reset();
        loaderElement.style.display = 'none';
      });
  },
  loadMoreHandler = async () => {
    page += 1;
    loaderElement.style.display = 'flex';
    fetchApiData(lastQuery, page, perPage)
      .then(response => {
        let images = response.images;
        galleryContainer.insertAdjacentHTML('beforeend', generateGalleryMarkup(images));
        simpleLightboxInstance.refresh();
        let totalShownElements = page * perPage;
        if (totalShownElements >= response.total) {
          loadMoreBtn.style.display = 'none';
          iziToast.info({
            message:
              "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
          });
        }
      })
      .finally(() => {
        formElement.reset();
        setTimeout(() => {
          const galleryCards = document.querySelectorAll('.gallery-card');
          const lastGalleryCard = galleryCards[galleryCards.length - 1];
          const height = lastGalleryCard.offsetHeight;
          loaderElement.style.display = 'none';
          window.scrollBy({
            top: height * 2 - loadMoreGap,
            behavior: 'smooth',
          });
        }, 500);
      });
  }

formElement.addEventListener('submit', submitHandler);

loadMoreBtn.addEventListener('click', loadMoreHandler);
