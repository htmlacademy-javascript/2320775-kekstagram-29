import { showBigPictures } from './show-big-pictures.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const makeOneThumbnail = (data) => {
  const { comments, description, likes, url, id } = data;
  const thumbnail = pictureTemplate.cloneNode(true);
  const thumbnailPictureImg = thumbnail.querySelector('.picture__img');
  thumbnailPictureImg.src = url;
  thumbnailPictureImg.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPictures(data);
  });

  return thumbnail;
};

const makeAllThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = makeOneThumbnail(picture);
    fragment.append(thumbnail);
  });

  picturesContainer.append(fragment);
};

export { makeAllThumbnails };
