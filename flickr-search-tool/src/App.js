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
      naturepics:[]
    };
  } 
  componentDidMount() {
    this.flickrCall();
    this.flickrCall('bears');
    this.flickrCall('nature');
    this.flickrCall('pyramids');
  }


  flickrCall = (search) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        if(search === 'bears'){
          this.setState({bearpics: responseData.photos.photo});
        }
        else if (search === 'pyramids'){
          this.setState({pyramidpics: responseData.photos.photo});
        }
        else if(search === 'nature'){
          this.setState({naturepics: responseData.photos.photo});
        }
        else{
        this.setState({ pics: responseData.photos.photo });
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
          <Route exact path="/" render= {() => <PhotosList flickrpics={this.state.pics} />} />
          <Route path="/:search" render= {() => <PhotosList flickrpics={this.state.pics} search={this.state.search}/>} />
          <Route path="*" render={() => <Notfound />} />
          <Route exact path='/pyramids' render={() => <PhotosList flickrpics={this.state.pyramidpics} />} />         
          <Route exact path='/nature' render={() => <PhotosList flickrpics={this.state.naturepics} />} /> 
          <Route exact path='/bears' render={() => <PhotosList flickrpics={this.state.bearpics} /> } /> 
        </Switch>
      </div>
    </BrowserRouter>
  );
}
}

