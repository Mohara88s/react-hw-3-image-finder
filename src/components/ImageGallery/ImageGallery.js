import React from 'react';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ children }) => (
  <ul className={styles.ImageGallery}>{children}</ul>
);
ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ImageGallery;
