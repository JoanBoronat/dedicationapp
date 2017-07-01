import React from "react";

export default class Table extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {initialized: false};
    }


    componentDidMount() {
        $("#dedication-table").tablesorter();
    }

    componentDidUpdate() {
        if (this.props.data.length > 0 && !this.state.initialized) {
            $("#dedication-table").tablesorter();
            this.state.initialized = true;
        }
        $('#dedication-table').trigger('update');
    }

    getCount(data) {
        const [keys,values] = data.slice(1).reduce((last, now) => {
            var index = last[0].indexOf(now[0])

            if (index == -1) {
                last[0].push(now[0])
                last[1].push(now[1])
            } else {
                last[1][index] += now[1]
            }

            return last

        }, [[],[]])

        ipc.send('receive-items', keys)
        return keys.map((x,i) => [x,values[i]])
    }

    render() {

        let headers = this.props.data.slice(0,1).map((x) => (
            x.slice(0,2).map((y,i) => (
                <th key={`th.${i}`}>{y}</th>
            ))
        )) 

        let reg = this.getCount(this.props.data).map((x,i) => (
            <tr key={`tr.${i}`}> 
                {x.slice(0,2).map((y,j) => 
                    <td key={`td.${i}.${j}`}>{y}</td>    
                )} 
            </tr>
        ))

        const style = {
            borderRadius: "10px",
            borderStyle: "solid",
            padding: "10px",
            borderWidth: "1px",
            borderColor: "#1997c6",
            marginBottom: "15px"
        }

        return  ( 
            
            <div class="row" style={this.props.data.length > 0 ? style : {}}>
                <div class="table-full col-md-12">
                    <div class="table-responsive">
                        <table id="dedication-table" class="table" data-sort="table">
                            <thead>
                                <tr>
                                    {headers}
                                </tr>
                            </thead>
                            <tbody id="dedication-items">
                                {reg}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        );
    }
}