import axios from 'axios';

const myApiKey = '55152376-abc1c78727543314a3e05fe22';
axios.defaults.baseURL = 'https://pixabay.com/';

export async function getImagesByQuery(query, page = 1, per_page = 15) {
  try {
    const response = await axios.get('/api/', {
      params: {
        key: myApiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Pixabay API Error:', error);
    throw error;
  }
}