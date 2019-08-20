import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Paid from './pages/Paids/Paid';
import NewAccount from './pages/NewAccount/NewAccount';
import Opened from './pages/Opened/Opened';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
<BrowserRouter>
    <Switch>
        <Route path="/" exact={true} component={Login}/>
        <Route path="/home" component={Home}/>
        <Route path="/pagas" component={Paid}/>
        <Route path="/novousuario" component={NewAccount}/>
        <Route path="/aberto" component={Opened}/>
    </Switch>
</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
