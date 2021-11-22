import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Repository from './Repository';

const routes = (
    <Router>
            <Route path="/repository" component={Repository} />    
    </Router>        
);

export default routes