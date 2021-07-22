import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

class Button extends Component {
  componentDidMount() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }
  render() {
    const { onClick } = this.props;
    return (
      <button type="button" onClick={onClick} className={styles.Button}>
        Load more
      </button>
    );
  }
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
