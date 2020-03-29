import React from 'react';

import Header from './components/Header';
import ImageCard from './components/ImageCard';
import ControlButtons from './components/ControlButtons';
import Paginator from './components/Paginator';
import Grid from './components/Grid';

const PAGINATION_OFFSET = 6;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: [],
      error: null,
      images: [],
      isLoading: false,
      isGrayscaleToggled: window.location.search.indexOf('grayscale') > 0,
      currentPage: 1,
      imageCount: null,
      selectedDimension: '',
    }
  }

  componentDidMount() {
    this._handleFetchImages();
  }

  _handleFetchImages = () => {
    this.setState({
      isLoading: true,
      error: null,
    });

    let requestUrl = `http://localhost:3001/?page=${this.state.currentPage}&offset=${PAGINATION_OFFSET}`;

    if (this.state.isGrayscaleToggled) {
      requestUrl += '&grayscale=true';
    }

    if (this.state.selectedDimension) {
      requestUrl += `&dimension=${this.state.selectedDimension}`;
    }

    fetch(requestUrl)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          dimensions: data.dimensions,
          images: data.images,
          imageCount: data.count,
          isLoading: false,
        })
      })
      .catch((err) => {
        this.setState({
          dimensions: [],
          error: err,
          isLoading: false,
        });
      })
  }

  handleDimensionsToggle = (selectedDimension) => {
    this.setState({
      selectedDimension,
      currentPage: 1,
    }, this._handleFetchImages);
  }

  handleClickPageButton = (currentPage) => {
    this.setState({ currentPage }, this._handleFetchImages);
  }

  handleGrayScaleToggle = () => {
    const baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    let url = baseUrl;
    if (this.state.isGrayscaleToggled) {
      url = baseUrl;
    } else {
      url = baseUrl + '?grayscale';
    }

    window.history.pushState({ path: url }, '', url);

    this.setState({
      isGrayscaleToggled: !this.state.isGrayscaleToggled,
      currentPage: 1,
    }, this._handleFetchImages);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container">
          <Header />
          <h2>
            :( an error has occured.
          </h2>
          <h4>{this.state.error.toString() || 'Is the server running?'}</h4>
        </div>
      )
    }


    if (!this.state.isLoading && this.state.images.length === 0) {
      return (
        <div className="container">
          <Header />
          <h2>
            No images found :(
          </h2>
        </div>
      )
    }

    return (
      <div className={`container ${this.state.isGrayscaleToggled ? 'grey-theme' : ''}`}>
        <Header />
        <ControlButtons
          dimensions={this.state.dimensions}
          isGrayscaleToggled={this.state.isGrayscaleToggled}
          onDimensionsToggle={this.handleDimensionsToggle}
          onGrayScaleToggle={this.handleGrayScaleToggle}
          selectedDimension={this.state.selectedDimension}
        />
        {this.state.isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <Grid columns={3}>
            {this.state.images.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
              />
            ))}
          </Grid>
        )}
        <Paginator
          count={this.state.imageCount}
          offset={PAGINATION_OFFSET}
          onClickPageButton={this.handleClickPageButton}
          currentPage={this.state.currentPage}
        />
      </div>
    );
  }
}

export default App;
