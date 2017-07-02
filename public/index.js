import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Header from './reactComponents/Header.js'
import ConfigPage from './pages/ConfigPage'
import StatsPage from './pages/StatsPage'
import HelpPage from './pages/HelpPage'


const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipc  = electron.ipcRenderer;

export default class Layout extends React.Component {

    constructor() { 
        super()

        this.state = {
            data: [],
            path: null,
            currentPage: "/"
        }
        
    }

    componentDidMount() {

        var _self = this;

        ipc.send('get-settings')

        ipc.on('get-settings', function (event, data) {
            const {files: path, file, currentPage} = data
            const excel = xlsx.parse(file);
            <Redirect to={currentPage} />
            _self.setState({path, data: excel[0].data, currentPage})
        })

        ipc.on('selected-file', function (event, data) {
            const {files: path, file} = data
            const excel = xlsx.parse(file);
            $("#path-file").val(path);
            _self.setState({data: excel[0].data})
        })

        ipc.on('selected-directory', function (event, data) {
            const {files: path, file} = data
            const excel = xlsx.parse(file);
            $("#new-path-file").val(path);
            _self.setState({data: excel[0].data})
        })

    }

    addToList(e) {
        const data = this.state.data
        data.push([e,0])
        this.setState({data})
    }
    
    render () {
        return ( 
            <Router>
                <div class="container">
                    <Redirect to="/"/>
                    <Header />
                    <Route exact path="/" render={() => (
                        <ConfigPage data={this.state.data} path={this.state.path} addToList={(e) => this.addToList(e)} />
                    )}/>
                    <Route path="/stats" render={() => (
                        <StatsPage data={this.state.data}/>
                    )}/>
                    <Route path="/help" component={HelpPage}/>
                </div>
            </Router> 
        );
    }
    
}

const app = document.getElementById('app');
ReactDOM.render(
    <Layout/>, app);