import React from 'react';
import Photos from './Photos';
import NotFound from './Notfound';

const PhotosList = props => { 
  let images;
  let resultsHeader;
  const results = props.flickrpics;
  //conditional logic to determine whether to show the results header, and populate url parameters to render the image successfully
  if (results.length > 0){
    resultsHeader = `Results for ${props.searchEntry}`
  }
  if(results.length > 0 ){
  images = results.map(query =>
    <Photos url={`https://live.staticflickr.com/${query.server}/${query.id}_${query.secret}_c.jpg`} key={query.id} />
  )}
  else {
    images = <NotFound />
  }
  
  return(

    <div className="photo-container">
    <h2>{resultsHeader}</h2>
    <ul>
      {images}
    </ul>
    </div>
  )
}

export default PhotosList;