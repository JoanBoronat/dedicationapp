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
        $('#dedication-table').trigger('sortReset');
    }

    render() {

        let headers = this.props.data.slice(0,1).map((x) => (
            x.map((y,i) => (
                <th key={`th.${i}`}>{y}</th>
            ))
        )) 

        let reg = this.props.data.slice(1).map((x,i) => (
            <tr key={`tr.${i}`}> 
                {x.map((y,j) => 
                    <td key={`td.${i}.${j}`}>{y}</td>    
                )} 
            </tr>
        ))

        return  (
            
            <div class="row">
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