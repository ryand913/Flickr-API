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
import LoadingPage from './Components/LoadingPage'

const braze = require("@braze/web-sdk");

braze.initialize('5f2e3faa-be09-4763-9dd2-5973c63d0272', {
  baseUrl: "sondheim.braze.com"
});

braze.openSession();




const GUID = Math.random() * 9000
braze.changeUser(GUID.toString());


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      pics: [],
      bearpics:[],
      pyramidpics:[],
      naturepics:[],
      searchItem: [],
      loading: true
    };
  } 

  //preload search terms in the nav bar
  componentDidMount() {
    this.flickrCall('bears');
    this.flickrCall('nature');
    this.flickrCall('pyramids');

  }




//use logic to set state based on a free search versus clicking the nav bar
  flickrCall = (search = 'pyramids') => {
    this.setState({loading:true});
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        if(search === 'pyramids'){
          this.setState({pyramidpics: responseData.photos.photo, searchItem: "pyramids", loading: false});
          // this.setState({searchItem: "pyramids"});
        }
        else if (search === 'nature'){
          this.setState({naturepics: responseData.photos.photo, searchItem: "nature", loading: false});
          // this.setState({searchItem: "nature"});
        }
        else if(search === 'bears'){
          this.setState({bearpics: responseData.photos.photo, searchItem: "bears", loading: false});
          // this.setState({searchItem: "bears"});
        }
        else{
        this.setState({ pics: responseData.photos.photo, searchItem: search, loading: false});
        braze.getUser().setCustomUserAttribute(
          "whatDidUserSearch",
          `${search}`
          
        );

        braze.logCustomEvent("clicked-the-search-button");

        // this.setState({searchItem: search})
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }  
  
//establish routes, dynamic routing and not found page
render(){

  return (
    <BrowserRouter>
      <div className="container">
      <Search onSearch={this.flickrCall} />
      <Categories />
      {/* learned about syntax for rendering components conditionally here: https://stackoverflow.com/questions/48497510/simple-conditional-routing-in-reactjs */}
      {this.state.loading ? (
         <LoadingPage />
        ):
      <Switch>
          <Route exact path="/" render= {() => <PhotosList flickrpics={this.state.pics} searchEntry={this.state.searchItem} />} />
          <Route exact path="/pyramids" render={() => <PhotosList flickrpics={this.state.pyramidpics} searchEntry={this.state.searchItem} />} />         
          <Route exact path="/nature" render={() => <PhotosList flickrpics={this.state.naturepics} searchEntry={this.state.searchItem} />} /> 
          <Route exact path="/bears" render={() => <PhotosList flickrpics={this.state.bearpics} searchEntry={this.state.searchItem} /> } /> 
          <Route path="/:search" render= {() => <PhotosList flickrpics={this.state.pics} searchEntry={this.state.searchItem} />} />
          <Route path="*" render={() => <Notfound />} />
        </Switch>
      }
      </div>
    </BrowserRouter>
  );
}
}

// const button = document.querySelector(".search-button")
// button.addEventListener("click", () => {
//   braze.requestPushPermission()
// });

