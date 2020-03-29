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

function gatherUniqueDimentions(images) {
  const dimentions = images.map(image => `${image.height}x${image.width}`);
  let uniqueDimentions = [];
  dimentions.forEach(function (dimention) {
    let i = uniqueDimentions.findIndex(x => x == dimention);
    if (i <= -1) {
      uniqueDimentions.push(dimention);
    }
  });

  return uniqueDimentions;
}

function paginateImages(images, options) {
  console.log('options: ', options);
  const endLimit = options.page * options.offset;
  const startLimit = endLimit - options.offset;
  let paginatedImages = [];
  for (let i = startLimit; i < endLimit; i++) {
    // TODO needs to take into account 0 placement
    paginatedImages.push(images[i]);
  }

  return paginatedImages;
}

// Routes
app.get('/', (req, res) => {
  const results = [];
  const shouldShowGray = !!req.query.grayscale;

  try {
  fs.createReadStream('./data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const images = standardizeImageObjects(results, { shouldShowGray: shouldShowGray });
      const dimentions = gatherUniqueDimentions(images);
      const paginatedImages = paginateImages(images, {
        page: req.query.page || 1,
        offset: req.query.offset || 5,
      });
      res.send({
        dimentions,
        images: paginatedImages,
        count: images.length,
        error: null,
      });
    });
  } catch (err) {
    res.send({
      dimentions: [],
      images: [],
      error: err,
    });
  }
})

app.listen(port, () => console.log(`Gallery Viewer app listening on port ${port}!`))