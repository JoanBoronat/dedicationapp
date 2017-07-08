import React from "react";
import {Route, Link} from "react-router-dom";

export default class Header extends React.Component {

    constructor(props) {
        super(props) 
    }

    render() {
        return (

            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <ul class="nav nav-bordered">
                                <NavLink activeOnlyWhenExact={true} to="/" label="Configuration" />
                                <NavLink activeOnlyWhenExact={true} to="/stats" label="Statistics" />
                                <NavLink activeOnlyWhenExact={true} to="/help" label="Help" />
                        </ul>
                    </div>
                    <div class="col-md-2">
                        {this.props.dedicating ? <button class="btn btn-danger" onClick={() => this.props.startStopDedication(false)}>Stop dedication</button> : <span />}
                        {!this.props.dedicating ? <button class="btn btn-success" onClick={() => this.props.startStopDedication(true)}>Start dedicating</button> : <span />}
                    </div>
                    <div class="col-md-2">
                        <h5>Current selected item: {this.props.dedicationItem}</h5>
                    </div>
                </div>
                <hr class="m-t-0" />
            </div>
        );
    }
}


const NavLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <li class={match ? 'active' : ''}>
      <Link to={to}>{label}</Link>
    </li>
  )}/>
)