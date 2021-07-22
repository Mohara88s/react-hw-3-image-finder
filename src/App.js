import React, { Component } from 'react';
import 'modern-normalize/modern-normalize.css';
import styles from './App.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './components/Button/Button';
import Loader from 'react-loader-spinner';
import Modal from './components/Modal/Modal';
import pixabayApi from './services/pixabay-api';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    largeImage: '',
    showModal: false,
    modalUrl: '',
    modalAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    this.setState({ isLoading: true });
    const { searchQuery, currentPage } = this.state;
    const options = { searchQuery, currentPage };

    pixabayApi
      .fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toogleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onClickImageGalleryItem = e => {
    this.setState({
      modalUrl: e.currentTarget.getAttribute('url'),
      modalAlt: e.currentTarget.getAttribute('alt'),
    });
    this.toogleModal();
  };
  render() {
    const { images, isLoading, error, showModal, modalAlt, modalUrl } =
      this.state;
    const souldLoadMoreButton = images.length > 0 && !isLoading;
    return (
      <div className={styles.App}>
        {error && <p color="red">{error}</p>}
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery>
          {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              alt={tags}
              src={webformatURL}
              url={largeImageURL}
              onClick={this.onClickImageGalleryItem}
            />
          ))}
        </ImageGallery>
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        )}
        {souldLoadMoreButton && <Button onClick={this.fetchImages} />}
        {showModal && (
          <Modal src={modalUrl} alt={modalAlt} onClose={this.toogleModal} />
        )}
      </div>
    );
  }
}

export default App;
