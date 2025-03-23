import iziToast from 'izitoast';
import axios from 'axios';

const API_KEY = '48010442-005cbb84b5a65166ca3b031bb';
const API_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = API_URL;

const fetchApiData = (queryValue, page, perPage) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: queryValue.trim(),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  });

  return axios.get(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      if (response.status != 200) {
        console.log(response);
        iziToast.error({
          message:
            'Something went wrong. Please try again later',
          position: 'topRight',
        });
        throw new Error(response.status);
      }
      console.log(typeof response);
      console.log(response);
      return response.data;
    })
    .then(data => {
      if (!data.total) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return [];
      }

      return {
        images: data.hits,
        total: data.totalHits,
      };
    })
    .catch(error => {
      iziToast.error({
        message:
          'Something went wrong. Please try again later',
        position: 'topRight',
      });
      console.log(error);
      return [];
    });
};

export default fetchApiData;
