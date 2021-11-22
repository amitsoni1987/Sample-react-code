import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

class Repository extends React.Component {
    render() {
        return (
           <div>
              <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
              </ul>
              {this.props.children}
           </div>
        )
     }
  
}

export default Repository;