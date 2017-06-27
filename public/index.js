import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Layout = () => (
    <div class="container">

        <div class="col-md-12 m-b-md" style={{textAlign: "center"}}>
        <h1>DEDICATION APP</h1>
        </div>
        <div class="row">
        <div class="col-md-12">
            <div class="row">
            <input id="path-file" type="text" class="form-control col-12" placeholder="Select file" style={{textAlign: "center"}}/>
            </div>
            <div class="hr-divider m-t m-b">
            <h3 class="hr-divider-content hr-divider-heading">
                OR
            </h3>
            </div>
            <div class="row">
            <input id="new-path-file" type="text" class="form-control" placeholder="Create new file" style={{"textAlign": "center"}}/>
            </div>
        </div>
        </div>

        <hr class="m-t-md m-b-md" />
        <div class="row">
        <div class="table-full col-md-12">
            <div class="table-responsive">
            <table id="dedication-table" class="table" data-sort="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Dedication Items</th>
                </tr>
                </thead>
                <tbody id="dedication-items">
                </tbody>
            </table>
            </div>
        </div>
        </div>


        <nav class="navbar navbar-fixed-bottom">
            <div class="container flextable">
            <div class="flextable-item flextable-primary">
                <input id="dedication-input" type="text" class="form-control" placeholder="Dedication item"/>
            </div>
            <div class="flextable-item">
                <div class="btn-group">
                <button id="add-to-list" type="button" class="btn btn-primary-outline">
                    <span class="icon icon-add-to-list"></span>
                </button>
                <button id="delete-input" type="button" class="btn btn-primary-outline">
                    <span class="icon icon-erase"></span>
                </button>
                </div>
            </div>
            </div>
        </nav>
    </div>
)

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);


