const express = require('express');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());

// Helpers
function standardizeImageObjects(data, filters) {
  const shouldShowGray = filters.shouldShowGray;
  const images = data.map(image => {
    const imageUrl = image.url;
    return {
      baseUrl: image.url,
      imageUrl: shouldShowGray ? `${image.url}?grayscale=true` : image.url,
      domain: imageUrl.split('/')[2],
      id: imageUrl.split('/')[4],
      width: imageUrl.split('/')[5],
      height: imageUrl.split('/')[6],
    }
  });

  // Get rid of duplicate images
  let uniqueImages = [];
  images.forEach(function (image) {
    let i = uniqueImages.findIndex(x => x.id == image.id);
    if (i <= -1) {
      uniqueImages.push(image);
    }
  });

  return uniqueImages;
};

function gatherUniqueDimensions(images) {
  const dimensions = images.map(image => `${image.height}x${image.width}`);
  let uniqueDimensions = [];
  dimensions.forEach(function (dimension) {
    let i = uniqueDimensions.findIndex(x => x == dimension);
    if (i <= -1) {
      uniqueDimensions.push(dimension);
    }
  });

  return uniqueDimensions;
}

function paginateImages(images, options) {
  const endLimit = options.page * options.offset;
  const startLimit = endLimit - options.offset;
  let paginatedImages = [];
  for (let i = startLimit; i < endLimit; i++) {
    // TODO needs to take into account 0 placement
    paginatedImages.push(images[i]);
  }

  return paginatedImages;
}

function filterImages(images, options) {
  return images;
}

// Routes
app.get('/', (req, res) => {
  console.log('Fetching results...');
  const results = [];
  const shouldShowGray = !!req.query.grayscale;
  console.log('Query Params: ', req.query);

  try {
  fs.createReadStream('./data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const images = standardizeImageObjects(results, { shouldShowGray: shouldShowGray });
      const dimensions = gatherUniqueDimensions(images);
      const filteredImages = filterImages(images);
      const paginatedImages = paginateImages(filteredImages, {
        page: req.query.page || 1,
        offset: req.query.offset || 6,
      });
      res.send({
        dimensions,
        images: paginatedImages,
        count: images.length,
        error: null,
      });
    });
  } catch (err) {
    res.send({
      dimensions: [],
      images: [],
      error: err,
    });
  }
})

app.listen(port, () => console.log(`Gallery Viewer app listening on port ${port}!`))