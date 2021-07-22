import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
class Searchbar extends Component {
  state = {
    query: '',
  };
  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };
  hendleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.hendleSubmit}>
          <button type="submit" className={styles.SearchForm__button}>
            <span className={styles.SearchForm__button__label}></span>
          </button>

          <input
            className={styles.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
