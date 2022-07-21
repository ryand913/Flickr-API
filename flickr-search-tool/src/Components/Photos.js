import { React, Component } from 'react';
import apiKey from '../config';
export default class Photos extends Component {
    constructor() {
        super();
        this.state = {
          photos: []
        };
      } 
      componentDidMount() {
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunset&per_page=24&format=json&nojsoncallback=1`)
          .then(response => response.json())
          .then(responseData => {
            this.setState({ photos: responseData.data });
          })
          .catch(error => {
            console.log('Error fetching and parsing data', error);
          });
      }    
    render(){
        return(
        console.log(this.state.photos)
        )
    }
}
