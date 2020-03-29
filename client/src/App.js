import React from 'react';

import Header from './components/Header';
import ImageCard from './components/ImageCard';
import ControlButtons from './components/ControlButtons';
import Paginator from './components/Paginator';
import Grid from './components/Grid';

const PAGINATION_OFFSET = 6;
// TODO handle mobile
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dimentions: [],
      error: null,
      images: [],
      isLoading: false,
      isGrayscaleToggled: false,
      currentPage: 1,
      imageCount: null,
    }
  }

  componentDidMount() {
    this._handleFetchImages();
  }

  _handleFetchImages = (filters) => {
    this.setState({
      dimentions: [],
      images: [],
      isLoading: true,
      error: null,
    });

    let requestUrl = `http://localhost:3001/?p=${this.state.currentPage}&offset=${PAGINATION_OFFSET}`;

    if (this.state.isGrayscaleToggled) {
      requestUrl += '&grayscale=true';
    }

    fetch(requestUrl)
      .then(res => res.json())
      .then((data) => {
        // TODO handle error
        this.setState({
          dimentions: data.dimentions,
          images: data.images,
          imageCount: data.count,
          isLoading: false,
        })
      })
      .catch((err) => {
        this.setState({
          dimentions: [],
          error: err,
          isLoading: false,
        });
      })
  }

  handleDimentionsToggle = () => {
    this._handleFetchImages({ dimentions: 'x' });
  }

  handleClickImage = () => {

  }

  handleClickPageButton = (page) => {
    this.setState({ currentPage: page }, this._handleFetchImages);
  }

  handleGrayScaleToggle = () => {
    // TODO push ?grayscale
    this.setState({
      isGrayscaleToggled: !this.state.isGrayscaleToggled,
    }, this._handleFetchImages);
  }

  render() {
    // TODO figure out why theres a double render
    console.log(this.state);
    // TODO loader // blank state
    return (
      <div className="container">
        <Header />
        <ControlButtons
          dimentions={this.state.dimentions}
          isGrayscaleToggled={this.state.isGrayscaleToggled}
          onDimentionsToggle={this.handleDimentionsToggle}
          onGrayScaleToggle={this.handleGrayScaleToggle}
        />
        <Grid columns={3}>
          {this.state.images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
            />
          ))}
        </Grid>
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
