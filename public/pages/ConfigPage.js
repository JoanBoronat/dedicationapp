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
        console.log("I received: " + e)
    }

    render() {
        return (
            <div>
                <SelectFileButtons />            
                <hr class="m-t-md m-b-md"/>
                <Table data={this.state.data}/>
                {this.state.data.length > 0 ? <Nav onClick={(e) => this.addToList(e)}/> : <div/>}            
            </div>
        );
    }
}

const SelectFileButtons = () => (
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <input
                    id="path-file"
                    type="text"
                    class="form-control col-12"
                    placeholder="Select file"
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
                    style={{
                    "textAlign": "center"
                }}/>
            </div>
        </div>
    </div>
)