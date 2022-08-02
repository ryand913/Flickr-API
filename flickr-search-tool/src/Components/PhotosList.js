import React from 'react';
import Photos from './Photos';

const PhotosList = props => { 
  const results = props.flickrpics;
  let images = results.map(query =>
    <Photos url={`https://live.staticflickr.com/${query.server}/${query.id}_${query.secret}_c.jpg`} key={query.id} />
  )
  return(
    <> <div className="photo-container">
    <h2>Results</h2>
    <ul>
      {images}
    </ul>
    </div></> 
  );
}

export default PhotosList;