const express = require('express');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());

// Helpers
function standardizeImageObjects(data) {
  const images = data.map(image => {
    const imageUrl = image.url;
    return {
      imageUrl: imageUrl,
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

// Routes
app.get('/', (req, res) => {
  const results = [];

  try {
  fs.createReadStream('./data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const images = standardizeImageObjects(results);
      res.send({ images, error: null });
    });
  } catch (err) {
    res.send({ images: [], error: err });
  }
})

app.listen(port, () => console.log(`Gallery Viewer app listening on port ${port}!`))