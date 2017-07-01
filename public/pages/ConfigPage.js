import React from "react";

import Table from '../reactComponents/Table.js'
import Nav from '../reactComponents/Nav.js'

export default class ConfigPage extends React.Component {
    
    constructor() {
        super()

        this.state = {
            data: []
        }
        
    }

    componentDidMount() {

        var _self = this;

        ipc.send('get-file')

        ipc.on('get-file', function (event, data) {
            const {files: path, file} = data
            const excel = xlsx.parse(file);
            _self.setState({path, data: excel[0].data})
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

    render() {
        return (
            <div>
                <SelectFileButtons path={this.state.path}/>            
                <div class="hr-divider m-t m-b">
                    <h3 class="hr-divider-content hr-divider-heading">{this.state.data.length > 0 ? "PREVIEW" : ""}</h3>
                </div>
                <Table data={this.state.data}/>
                {this.state.data.length > 0 ? <Nav onClick={(e) => this.addToList(e)}/> : <div/>}            
            </div>
        );
    }
}


class SelectFileButtons extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <input
                        id="path-file"
                        type="text"
                        class="form-control col-12"
                        placeholder={this.props.path ? this.props.path : "Select file"}
                        onClick={() => ipc.send('open-file-dialog')}
                        style={{
                        textAlign: "center"
                    }}/>
                </div>
                <div class="hr-divider m-t m-b">
                    <h3 class="hr-divider-content hr-divider-heading">OR</h3>
                </div>
                <div class="row">
                    <input
                        id="new-path-file"
                        type="text"
                        class="form-control col-12"
                        placeholder="Create new file"
                        onClick={() => ipc.send('open-dir-dialog')}
                        style={{
                        "textAlign": "center"
                    }}/>
                </div>
            </div>
        </div>)
    }
}