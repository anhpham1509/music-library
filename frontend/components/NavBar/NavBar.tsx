import * as React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import { connect } from "react-redux";
import { logout } from "../../actions";
import { withRouter } from "react-router";

const NonAuthRightNavBar = () => (
    <ul className="nav navbar-nav navbar-right">
        <li>
            <Link to="/login">Login</Link>
        </li>
        <li>
            <Link to="/register">Register</Link>
        </li>
    </ul>
);

interface AuthProps {
    name: String;
    logout: any;
}

class AuthRightNavBar extends React.Component<AuthProps, any> {
    constructor(props: AuthProps) {
        super(props);
    }

    render() {
        return (
            <ul className="nav navbar-nav navbar-right">
                <li className="title-left">Hello, <b>{this.props.name}</b>!</li>
                <li className="logout-left">
                    <a href="#" onClick={this.props.logout}>Logout</a>
                </li>
            </ul>
        );
    }
};

class NavBar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        const { dispatch } = this.props;

        this.props.dispatch(logout());
    }

    render() {
        return (
            <nav className="navbar navbar-inverse navbar-bg" role="navigation"> {/*navbar-fixed-top*/}
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#top-navbar-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">Music Library</a>
                    </div>
                    {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                    <div className="collapse navbar-collapse" id="top-navbar-1">
                        {this.props.auth.name ? <AuthRightNavBar name={this.props.auth.name} logout={this.logout} /> : <NonAuthRightNavBar />}
                    </div>
                </div>
            </nav >
        );
    }
};

const mapStateToProps = (state: any) => {
    const { auth } = state;
    return {
        auth
    };
}

export const ConnectedNavBar = connect(mapStateToProps)(NavBar);