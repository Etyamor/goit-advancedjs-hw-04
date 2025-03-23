const generateGalleryMarkup = images => {
  return images.reduce(
    (
      acc,
      { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    ) => {
      return (
        acc +
        `<li class="gallery-card">
              <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <ul class="gallery-card-info">
                  <li>
                    <p>Likes</p>
                    <p>${likes}</p>
                  </li>
                  <li>
                    <p>Views</p>
                    <p>${views}</p>
                  </li>
                  <li>
                    <p>Comments</p>
                    <p>${comments}</p>
                  </li>
                  <li>
                    <p>Downloads</p>
                    <p>${downloads}</p>
                  </li>
                </ul>
              </a>
            </li>`
      );
    },
    ''
  );
};

export default generateGalleryMarkup;
