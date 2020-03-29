import React from 'react';
import './ImageCard.css';

class ImageCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasLoaded: false,
    }
  }

  handleImageLoaded = () => {
    this.setState({ hasLoaded: true });
  }

  render() {
    const props = this.props;
    const image = props.image;
    const ratio = image.width / image.height;
    const height = image.width / ratio;
    const imageUrl = `https://${image.domain}/id/${image.id}/300/${height}${image.params}`;
    return (
      <div className="image-card fadeIn">
        <img
          alt={'Image from ' + image.domain}
          src={imageUrl}
          onLoad={this.handleImageLoaded}
        />
        {this.state.hasLoaded ? null : (
          <div className="loader">Loading</div>
        )}
        <div className="image-card__footer">
          <a
            href={image.imageUrl}
            target="_blank"
            rel="noopener noreferrer">
            View original ({image.height}x{image.width})
          </a>
        </div>
      </div>
    );
  }
}

export default ImageCard;
