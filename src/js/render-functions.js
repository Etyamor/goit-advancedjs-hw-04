import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const renderImages = (images) => {
  const gallery = document.querySelector('.gallery');
  if (images?.length === 0) {
    iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  images.forEach((image) => {
    const imageElement = document.createElement('div');
    imageElement.classList.add('image-card');
    imageElement.innerHTML = `
      <a href="${image.largeImageURL}" class="gallery-link">
        <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" />
      </a>
      <div class="image-info">
        <p><strong>Likes</strong> <span>${image.likes}</span></p>
        <p><strong>Views</strong> <span>${image.views}</span></p>
        <p><strong>Comments</strong> <span>${image.comments}</span></p>
        <p><strong>Downloads</strong> <span>${image.downloads}</span></p>
      </div>
    `;
    gallery.appendChild(imageElement);
  });

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
};

export const showLoader = () => {
  const loader = document.querySelector('.loader');
  loader.classList.add('active');
};

export const hideLoader = () => {
  const loader = document.querySelector('.loader');
  loader.classList.remove('active');
};
