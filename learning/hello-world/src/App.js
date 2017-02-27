import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'; 

/*class Card extends Component {
  getInitialState (){
    return {};
  };
  componentDidMount(){
   
    var component = this;
    $.get("https://api.github.com/users/petehunt", function (data) {
      document.getElementById('logger').innerHTML  = "ajax";
      component.setState(data);
    })
  };

  render() {
    return (
      <div>
        <img src={this.state.avatar_url} width="80" />
        <h3>{this.state.name}</h3>
        <hr />
      </div>
    ) 
  }
}*/


var Card = React.createClass({
  
  getInitialState: function (){
    return {};
  },
  componentDidMount: function (){
   
    var component = this;
    $.get("https://api.github.com/users/petehunt", function (data) {
      console.log("in $.get");
      document.getElementById('logger').innerHTML  = "ajax";
      component.setState(data);
    })
  },
  render: function () {
    return (
      <div>
        <img src={this.state.avatar_url} width="80" alt="Card photo"/>
        <h3>{this.state.name}</h3>
        <hr/>
      </div>
      )
  }
})

class App extends Component {
  render() {
    return (
      <div>
        <Card login="petehunt" />
      </div>
    );
  }
}

export default App;
