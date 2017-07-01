import React from "react";

export default class Nav extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $("#dedication-input")
            .keyup(function (event) {
                if (event.keyCode == 13) {
                    $("#add-to-list").click();
                }
            });
    }

    addToList() {
        this.props.onClick($('#dedication-input').val())
        $('#dedication-input').val('')
    }

    render() {
        return (

            //<nav class="navbar navbar-fixed-bottom">
                <div class="flextable">
                    <div class="flextable-item flextable-primary">
                        <input
                            id="dedication-input"
                            type="text"
                            class="form-control"
                            placeholder="Dedication item"/>
                    </div>
                    <div class="flextable-item">
                        <div class="btn-group">
                            <button
                                id="add-to-list"
                                type="button"
                                class="btn btn-primary-outline"
                                onClick={() => this.addToList()}>
                                <span class="icon icon-add-to-list"></span>
                            </button>
                            <button id="delete-input" type="button" class="btn btn-primary-outline" onClick={() => $('#dedication-input').val('')}>
                                <span class="icon icon-erase"></span>
                            </button>
                        </div>
                    </div>
                </div>
            //</nav>

        );
    }
}