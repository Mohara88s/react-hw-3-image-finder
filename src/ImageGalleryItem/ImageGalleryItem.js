import React from 'react';
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ alt, src, url, onClick }) => (
  <li className={styles.ImageGalleryItem}>
    <img
      onClick={onClick}
      src={src}
      alt={alt}
      className={styles.ImageGalleryItem__image}
      url={url}
    />
  </li>
);
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
