import React, { Component } from 'react'
import './index.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Search from './Components/Search';
import Notfound from './Components/Notfound';
import apiKey from './config';
import PhotosList from './Components/PhotosList';
import Categories from './Components/Categories';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      pics: [],
      bearpics:[],
      pyramidpics:[],
      naturepics:[],
      searchItem: []
    };
  } 
  componentDidMount() {
    this.flickrCall();
    this.flickrCall('bears');
    this.flickrCall('nature');
    this.flickrCall('pyramids');
  }



  flickrCall = (search = 'pyramids') => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        if(search === 'pyramids'){
          this.setState({pyramidpics: responseData.photos.photo});
          this.setState({searchItem: "pyramids"});
        }
        else if (search === 'nature'){
          this.setState({naturepics: responseData.photos.photo});
          this.setState({searchItem: "nature"});
        }
        else if(search === 'bears'){
          this.setState({bearpics: responseData.photos.photo});
          this.setState({searchItem: "bears"});
        }
        else{
        this.setState({ pics: responseData.photos.photo });
        this.setState({searchItem: search})
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }    
render(){
  return (
    <BrowserRouter>
      <div className="container">
      <Search onSearch={this.flickrCall} />
      <Categories />
        <Switch>
          <Route exact path="/" render= {() => <PhotosList flickrpics={this.state.pics} searchEntry={this.state.searchItem} />} />
          <Route exact path="/pyramids" render={() => <PhotosList flickrpics={this.state.pyramidpics} searchEntry={this.state.searchItem} />} />         
          <Route exact path="/nature" render={() => <PhotosList flickrpics={this.state.naturepics} searchEntry={this.state.searchItem} />} /> 
          <Route exact path="/bears" render={() => <PhotosList flickrpics={this.state.bearpics} searchEntry={this.state.searchItem} /> } /> 
          <Route path="/:search" render= {() => <PhotosList flickrpics={this.state.pics} searchEntry={this.state.searchItem} />} />
          <Route path="*" render={() => <Notfound />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
}

