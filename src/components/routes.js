import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import App from '../App';
import Repository from './Repository';

function routes() {
    <Router>
            <Route path="/"  component={App} /> 
            <Route path="/repository" component={Repository} />    
    </Router>        
};

export default routes;