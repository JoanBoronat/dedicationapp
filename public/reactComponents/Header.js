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
                    <div class="col-md-4">
                        <h3>DEDICATIONAPP</h3>
                    </div>

                    <div class="col-md-6">
                        <ul class="nav nav-bordered">
                                <NavLink activeOnlyWhenExact={true} to="/" label="Configuration" />
                                <NavLink activeOnlyWhenExact={true} to="/stats" label="Statistics" />
                                <NavLink activeOnlyWhenExact={true} to="/help" label="Help" />
                                
                        </ul>
                        
                    </div>
                    <div class="col-md-2">
                        {this.props.dedicating ? <button class="btn btn-danger">Stop dedication</button> : <span />}
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