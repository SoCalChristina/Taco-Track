import React, {Component} from 'react';

import './App.css';
//add an image to react. Source: https://stackoverflow.com/questions/37644265/correct-path-for-img-on-react-js
import logo from './images/taco-truck.png';
import Locations from './data/Locations.json';
import MapDisplay from './components/MapDisplay';
import ListDrawer from './components/ListDrawer';

class App extends Component {
    state = {
      //set neighborhood with latitude and longitude values
        lat: 34.1975048,
        lon: -119.1770516,
        all: Locations,
        //enlarge map display
        zoom: 12,
        open: false
    }

    styles = {
        menuButton: {
            marginLeft: 10,
            marginRight: 20,
            position: "absolute",
            left: 10,
            top: 40,
            background: "#fff",
            padding: 5
        },
        hide: {
            display: 'none'
        },
        header: {
            marginTop: "0px"
        }
      };
      //https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/birth/post_mount_with_component_did_mount.html
      componentDidMount = () => {
        //https://facebook.github.io/react-native/docs/state.html
        this.setState({
          ...this.state,
          filtered: this.filterLocations(this.state.all, "")
        });
        window.gm_authFailure = () => {
           alert("We're sorry. Google Map is not available. Please try again later")
      }
  }
      toggleDrawer = () => {
        // Toggle the value controlling whether the drawer is displayed//
          this.setState({
              open: !this.state.open
          });
      }

      updateQuery = (query) => {
        // filter business location info return by query input
          this.setState({
              ...this.state,
              selectedIndex: null,
              filtered: this.filterLocations(this.state.all, query)
          });
      }

      filterLocations = (Locations, query) => {
          // Filter locations to match query string
          return Locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
      }

      clickListItem = (index) => {
          // Set the state to reflect the selected location array index
          this.setState({ selectedIndex: index, open: !this.state.open })
      }

      render = () => {
          return (
              <div className="App">
                  {/*TODO create and install components for menu button, header, map display, and footer.*/}
                  <div className="header" tabIndex="0">
                  <button onClick={this.toggleDrawer} style={this.styles.menuButton} tabIndex="0">
                          <i className="fa fa-bars"></i>
                      </button>
                      <h1>Oxnard Taco Track</h1>
                      <img src={logo} className="App-logo" alt={"taco truck logo"}/>
                  </div>
                  <MapDisplay
                      lat={this.state.lat}
                      lon={this.state.lon}
                      zoom={this.state.zoom}
                      Locations={this.state.filtered}
                      selectedIndex={this.state.selectedIndex}
                      clickListItem={this.clickListItem}/>
                  <ListDrawer
                      Locations={this.state.filtered}
                      open={this.state.open}
                      toggleDrawer={this.toggleDrawer}
                      filterLocations={this.updateQuery}
                      clickListItem={this.clickListItem}/>
                  </div>
                  //TODO add footer with copyright and contact info
              );
          }
      }


export default App;
