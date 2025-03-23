import axios from 'axios';

export const fetchImages = async (searchQuery, page) => {
  const API_KEY = '48010442-005cbb84b5a65166ca3b031bb';
  const URL = `https://pixabay.com/api/`;

  try {
    const response = await axios.get(URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });

    return {
      images: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    console.log('Error fetching images:', error);
    return {
      images: [],
      totalHits: 0,
    };
  }
};