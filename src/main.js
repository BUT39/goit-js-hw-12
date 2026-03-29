import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const btnLoadMore = document.querySelector('.btn-load-more');

let query = '';
let page = 1;
const PER_PAGE = 15;
let isLoading = false;

// Обробка сабміту форми
form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements['search-text'].value.trim();
  if (query.length < 2) {
    iziToast.error({ message: 'Enter at least 2 characters', position: 'topRight' });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, PER_PAGE);

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'No images found. Try another search.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if (page * PER_PAGE >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({ message: "You've reached the end of search results.", position: 'topRight' });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({ message: 'Something went wrong', position: 'topRight' });
  } finally {
    hideLoader();
  }
});

// Логіка кнопки Load More
btnLoadMore.addEventListener('click', async () => {
  if (isLoading) return;
  isLoading = true;

  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, PER_PAGE);
    createGallery(data.hits);

    // Правильний скрол: беремо висоту елемента галереї і прокручуємо на height * 2
    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const { height } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }

    if (page * PER_PAGE >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({ message: "You've reached the end of search results.", position: 'topRight' });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({ message: 'Something went wrong', position: 'topRight' });
  } finally {
    hideLoader();
    isLoading = false;
  }
});