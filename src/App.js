import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Player from './player.js'
import CurrentNews from './currentNews.js'
var App = React.createClass({

  getInitialState: function() {
    return {searchTerm: '', searchUrl: ''}
  },
  handleChange: function(e) {
    this.setState({ searchTerm: e.target.value, searchUrl: "http://myservice/?search=" + this.state.searchTerm })
  },
  render: function() {
    return (
      <div>
        <header className="Header">
          <Navigation />
          <div id="search" className="Search">
            <input onChange={this.handleChange} type="search" placeholder="Search for old events." value={this.state.searchTerm}/>
          </div>
          <UserProfile img="https://scontent-frx5-1.xx.fbcdn.net/v/t31.0-8/18558873_1933286746901048_2757834064997800725_o.png?oh=555531d0d9a37822f08dca9c94cbf436&oe=599D38D1"/>
        </header>
        <Hero />
        <TitleList title="Archives" url='discover/tv?sort_by=popularity.desc&page=1' />
      </div>
    );
  }
});

var Hero = React.createClass({

  getInitialState: function() {
    return {showPlayer: false}
  },

  displayVideo: function() {
    this.setState({ showPlayer: true });
  },
  canShowPlayer: function() {
    return false;
  },
  playerContent: function () {
    if (this.state.showPlayer) {
    return (<div className="content">
      <Player showPlayer={this.state.showPlayer}/>
    </div>);
  }
  else {
    return <CurrentNews onClick={this.displayVideo}/>
  }
  },

  render: function() {
    return (
      <div id="hero" className="Hero" style={{backgroundImage: 'url(https://scontent-frx5-1.xx.fbcdn.net/v/t31.0-8/16903295_1229283810453680_2188971599911993421_o.jpg?oh=de4d86cb7bc2ca82cc87127a85e90ff2&oe=59A07BE2)'}}>
        {this.playerContent()}
      </div>
    );
  }
})


// Navigation
var Navigation = React.createClass({
  render: function() {
    return (
      <div id="navigation" className="Navigation">
        <nav>
          <ul>
            <li>Archives</li>
            <li>Upcoming</li>
            <li>Subscribe</li>
          </ul>
        </nav>
      </div>
    );
  }
});

var TitleList = React.createClass({
  apiKey: '87dfa1c669eea853da609d4968d294be',

  getInitialState: function() {
    return {data: {results: []}, mounted: false};
  },

  loadContent: function() {
    var requestUrl = 'https://api.themoviedb.org/3/' + this.props.url + '&api_key=' + this.apiKey;
    fetch(requestUrl).then((response)=> {
        return response.json();
    }).then((data)=>{
        this.setState({data : data});
    }).catch((err)=>{
        console.log("There has been an error");
    });
  },
  componentDidMount: function() {
    if(this.props.url !== ''){
      this.loadContent();
      this.setState({mounted:true});
    }

  },
  renderItems: function(title, i) {
    var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
    return <Item key={title.id} title={title.name} score={title.vote_average} overview={title.overview} backdrop={backDrop} />
  },
  stateFound: function(mounted, title) {
    return mounted
      ? <h1> {title} </h1>
      : <h1> Nothing found </h1>
  },
  render: function() {

    return(
      <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
        <div className="Title">
          {this.stateFound(this.state.mounted, this.props.title)}
          <div className="titles-wrapper">
            {
              this.state.data.results.map(this.renderItems)
            }
          </div>
        </div>
      </div>
    );
    // return(<span>{this.state.data}</span>);
  }
})

// Title List Item
var Item = React.createClass({
  render: function() {
    return (
      <div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'}} >
        <div className="overlay">
          <div className="title">{this.props.title}</div>
          <div className="plot">{this.props.overview}</div>
        </div>
      </div>
    );
  }
});

// User Profile
var UserProfile = React.createClass({
  render: function() {
    return (
      <div className="UserProfile">
        <div className="User">
          <div className="name"></div>
          <div className="image"><img src={this.props.img} alt="profile" /></div>
        </div>
      </div>
    );
  }
});
export default App;
