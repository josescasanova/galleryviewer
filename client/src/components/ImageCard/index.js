import React from 'react';
import './ImageCard.css';

function ImageCard(props) {
  const image = props.image;
  const ratio = image.width / image.height;
  const height = image.width / ratio;
  const imageUrl = `https://${image.domain}/id/${image.id}/300/${height}${image.params}`;
  return (
    <div className="image-card">
      <img
        alt={'Image from ' + image.domain}
        src={imageUrl}
      />
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

export default ImageCard;
