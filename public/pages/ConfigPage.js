import React from "react";

import Table from '../reactComponents/Table.js'
import Nav from '../reactComponents/Nav.js'

export default class ConfigPage extends React.Component {

    constructor(props) {
        super(props)
    }

    getCount(data) {

        let headers = data.slice(0, 1)[0]
        headers = headers
            ? headers.slice(0, 2)
            : []

        const [keys,
            values] = data
            .slice(1)
            .reduce((last, now) => {
                var index = last[0].indexOf(now[0])

                if (index == -1) {
                    last[0].push(now[0])
                    last[1].push(now[1])
                } else {
                    last[1][index] += now[1]
                }

                return last

            }, [
                [], []
            ])

        return [
            headers, keys.map((x, i) => [x, values[i]])
        ]
    }

    render() {
        return (
            <div class="m-t">
                <SelectFileButtons path={this.props.path}/>
                <div class="hr-divider m-t m-b">
                    <h3 class="hr-divider-content hr-divider-heading">{this.props.data.length > 0
                            ? "PREVIEW"
                            : ""}</h3>
                </div>
                <Table
                    data={this.props.data}
                    getCount={(data) => this.getCount(data)}
                    setDedicationItem={(i) => this.props.setDedicationItem(i)}
                    dedicationItem={this.props.dedicationItem}
                    elementSelectable={true}/> {this.props.data.length > 0
                    ? <Nav onClick={this.props.addToList}/>
                    : <div/>}
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
                            placeholder={this.props.path
                            ? this.props.path
                            : "Select file"}
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
            </div>
        )
    }
}