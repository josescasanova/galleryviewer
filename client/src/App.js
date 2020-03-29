import React from 'react';

import Header from './components/Header';
import ImageCard from './components/ImageCard';
import Grid from './components/Grid';

// TODO handle mobile
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      images: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setState({
      images: [],
      isLoading: true,
      error: null,
    });

    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then((data) => {
        // TODO handle error
        this.setState({
          images: data.images,
          isLoading: false,
        })
      })
      .catch((err) => {
        this.setState({
          images: [],
          error: err,
          isLoading: false,
        });
      })
  }

  render() {
    // TODO figure out why theres a double render
    console.log(this.state);
    return (
      <div className="container">
        <Header />
        <Grid columns={4}>
          {this.state.images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
            />
          ))}
        </Grid>

      </div>
    );
  }
}

export default App;
