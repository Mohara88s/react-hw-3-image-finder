import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeydown);
  }

  hendleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  hendleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div className={styles.Overlay} onClick={this.hendleOverlayClick}>
        <div className={styles.Modal}>
          <img src={src} alt={alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
export default Modal;
