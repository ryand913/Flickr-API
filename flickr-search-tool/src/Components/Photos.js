import React from 'react';

const Photos = props => (
    <li className="photo-container">
      <img src={props.url} alt=""/>
    </li>
  );

export default Photos;
