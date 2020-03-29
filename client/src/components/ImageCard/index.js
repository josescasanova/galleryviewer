import React from 'react';
import './ImageCard.css';

function ImageCard(props) {
  const image = props.image;
  return (
    <img
      alt={'Image from ' + image.domain}
      className="image-card"
      src={image.imageUrl}
    />
  );
}

export default ImageCard;
