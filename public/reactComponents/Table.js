import React from "react";

export default class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
        };
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

    handleClick(i) {
        this.setState({activeItem: i})
        this.props.setDedicationItem(i)
    }

    render() {

        let [headers,
            reg] = this
            .props
            .getCount(this.props.data)

        headers = headers.map((y, i) => (
            <th key={`th.${i}`}>{y}</th>
        ))

        reg = reg.map((x, i) => (
            <tr
                class={"table-element-active" + (this.props.dedicationItem == i ? " table-element-selected" : "")}
                key={`tr.${i}`}
                onClick={this.props.elementSelectable ? () => this.handleClick(i) : null}>
                {x.map((y, j) => <td key={`td.${i}.${j}`}>{y}</td>)}
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

        return (

            <div
                class="row"
                style={this.props.data.length > 0
                ? style
                : {}}>
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