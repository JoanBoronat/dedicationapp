import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Header from './reactComponents/Header.js'
import ConfigPage from './pages/ConfigPage'
import StatsPage from './pages/StatsPage'
import HelpPage from './pages/HelpPage'

const electron = window.require('electron');
const fs = electron
    .remote
    .require('fs');
const ipc = electron.ipcRenderer;

export default class Layout extends React.Component {

    constructor() {
        super()

        this.state = {
            data: [],
            path: null,
            currentPage: ipc.sendSync('current-page') || "/",
            dedicating: false,
            dedicationItem: 0,
            currentDedicationTime: 0,
            items: []
        }

    }

    getJsDateFromExcel(excelDate) {
        return new Date((excelDate - (25567 + 1)) * 86400 * 1000);
    }

    processData(excel) {

        let {data} = excel[0]

        data.slice(1).map((x) => {
                    x[2] = this
                        .getJsDateFromExcel(x[2])
                        .toLocaleDateString()
                    x[3] = this
                        .getJsDateFromExcel(x[3])
                        .toLocaleDateString()
            })

        const keys = data.slice(1).reduce((last, now) => {

                var index = last.indexOf(now[0])

                if (index == -1) last.push(now[0])
                
                return last

            }, [])

        this.setState({items: keys})
        
    
    }

    componentDidMount() {


        ipc.send('get-settings')

        ipc.on('keyEvent', () => {

            const {dedicationItem: x, items} = this.state
            let i = (x == items.length - 1 ? 0 : x + 1)
            
            this.setState({dedicationItem: i, dedicating: false})
        })

        ipc.on('startStopDedicating', () => {
            this.setState({dedicating: !this.state.dedicating})
        })

        ipc.on('get-settings', (event, data) => {
            const {files: path, file, currentPage} = data
            const excel = xlsx.parse(file);
            <Redirect to = {currentPage} /> 
            this.processData(excel)
            this.setState({path, data: excel[0].data, currentPage})
        })

        ipc.on('selected-file', (event, data) => {
            const {files: path, file} = data
            const excel = xlsx.parse(file);
            this.processData(excel)
            $("#path-file").val(path);
            this.setState({data: excel[0].data})
        })

        ipc.on('selected-directory', (event, data) => {
            const {files: path, file} = data
            const excel = xlsx.parse(file);
            this.processData(excel)
            $("#new-path-file").val(path);
            this.setState({data: excel[0].data})
        })

    }

    addToList(e) {
        const {data, items} = this.state
        data.push([e, 0])
        items.push(e)
        this.setState({data, items})
    }

    setDedicationItem(dedicationItem) {
        this.setState({dedicationItem})
    }

    startStopDedication(e) {
        this.setState({dedicating: e})
    }

    render() {

        return (
            <Router>
                <div class="container">
                    <Redirect to={this.state.currentPage}/>
                    <Header
                        dedicating={this.state.dedicating}
                        dedicationItem={this.state.items[this.state.dedicationItem]}
                        currentDedicationTime={this.state.currentDedicationTime}
                        startStopDedication={(e) => this.startStopDedication(e)}/>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            ipc.send('current-page', "/")
                            return <ConfigPage
                                data={this.state.data}
                                path={this.state.path}
                                addToList={(e) => this.addToList(e)}
                                dedicationItem={this.state.dedicationItem}
                                setDedicationItem={(i) => this.setDedicationItem(i)}/>
                        }}/>
                    <Route
                        path="/stats"
                        render={() => {
                        ipc.send('current-page', "/stats")
                        return <StatsPage data={this.state.data} keyHeader={"Number of hours dedicated"}/>
                    }}/>
                    <Route
                        path="/help"
                        render={() => {
                        ipc.send('current-page', "/help")
                        return <HelpPage/>
                    }}/>
                </div>
            </Router>
        );
    }

}

const app = document.getElementById('app');
ReactDOM.render(
    <Layout/>, app);