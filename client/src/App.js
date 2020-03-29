import React from 'react';

import Header from './components/Header';
import Image from './components/Image';

// TODO temp
const images = [
'https://picsum.photos/id/12/300/200',
'https://picsum.photos/id/434/300/200',
'https://picsum.photos/id/966/300/200',
'https://picsum.photos/id/637/300/200',
'https://picsum.photos/id/180/300/200',
'https://picsum.photos/id/342/300/200',
'https://picsum.photos/id/467/300/200',
'https://picsum.photos/id/389/300/200',
'https://picsum.photos/id/525/300/200',
'https://picsum.photos/id/385/300/200',
'https://picsum.photos/id/256/100/100',
'https://picsum.photos/id/70/100/100',
'https://picsum.photos/id/844/100/100',
'https://picsum.photos/id/130/100/100',
'https://picsum.photos/id/328/100/100',
'https://picsum.photos/id/886/100/100',
'https://picsum.photos/id/218/100/100',
'https://picsum.photos/id/29/100/100',
'https://picsum.photos/id/639/100/100',
'https://picsum.photos/id/396/100/100',
'https://picsum.photos/id/20/250/250',
'https://picsum.photos/id/925/250/250',
'https://picsum.photos/id/872/250/250',
'https://picsum.photos/id/629/250/250',
'https://picsum.photos/id/1074/250/250',
'https://picsum.photos/id/341/250/250',
'https://picsum.photos/id/267/250/250',
'https://picsum.photos/id/1021/250/250',
'https://picsum.photos/id/928/250/250',
'https://picsum.photos/id/238/250/250',
'https://picsum.photos/id/385/400/200',
'https://picsum.photos/id/319/400/200',
'https://picsum.photos/id/1059/400/200',
'https://picsum.photos/id/71/400/200',
'https://picsum.photos/id/637/400/200',
'https://picsum.photos/id/118/400/200',
'https://picsum.photos/id/634/400/200',
'https://picsum.photos/id/1065/400/200',
'https://picsum.photos/id/1073/400/200',
'https://picsum.photos/id/323/400/200',
'https://picsum.photos/id/660/300/300',
'https://picsum.photos/id/511/300/300',
'https://picsum.photos/id/339/300/300',
'https://picsum.photos/id/693/300/300',
'https://picsum.photos/id/198/300/300',
'https://picsum.photos/id/964/300/300',
'https://picsum.photos/id/59/300/300',
'https://picsum.photos/id/160/300/300',
'https://picsum.photos/id/737/300/300',
'https://picsum.photos/id/891/300/300',
];

function App() {
  return (
    <div className="container">
      <Header />
      {images.map((image) => (
        <div className="row" key={image}>
          <div className="column">
            <Image source={image} />
          </div>
        </div>
      ))}

    </div>
  );
}

export default App;
