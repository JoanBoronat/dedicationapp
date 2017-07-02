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

    render() {

        let [headers, reg] = this.props.getCount(this.props.data)

        headers = headers.map((y,i) => (
                <th key={`th.${i}`}>{y}</th>
            ))

        reg = reg.map((x,i) => (
            <tr key={`tr.${i}`}> 
                {x.map((y,j) => 
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