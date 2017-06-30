import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Header from './reactComponents/Header.js'
import ConfigPage from './pages/ConfigPage'
import DedicationPage from './pages/DedicationPage'

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipc  = electron.ipcRenderer;

/*<ul>
                <li><Link to="/about">Dedications</Link></li>
                <li><Link to="/">Config</Link></li>
            </ul>*/


const Layout = () => (
    <Router>
        <div class="container">
            
            <Header />
            <Redirect to="/"/>
            <Route exact path="/" component={ConfigPage}/>
            <Route path="/about" component={DedicationPage}/>
        </div>
  </Router>
    
)

const app = document.getElementById('app');
ReactDOM.render(
    <Layout/>, app);