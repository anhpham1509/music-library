import * as React from "react";
import { connect } from "react-redux";
import { login, logout } from "../../actions";
import { history } from "../../configs/browser";
import { ConnectedAlertBar } from "../AlertBar";

class LoginPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        if (this.props.auth.token) {
            history.push("/");
        }

        this.inputChange = this.inputChange.bind(this);
        this.login = this.login.bind(this);
    }

    inputChange(e: any) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    login(e: any) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;

        if (email && password) {
            // console.log("Logging in with email: " + email + " pass: " + password);

            dispatch(login({
                email: email,
                password: password
            }));
        }
    }

    render() {
        const { email, password, submitted } = this.state;

        return (
            <div className="container inner-bg">
                <div className="row">
                    <div className="col-sm-6 form-box">
                        <div className="form-top">
                            <div className="form-top-left">
                                <h3>Sign in</h3>
                                <p>Enter your email and password to log on:</p>
                            </div>
                            <div className="form-top-right">
                                <i className="fa fa-lock"></i>
                            </div>
                        </div>
                        <ConnectedAlertBar />
                        <div className="form-bottom">
                            <form className="login-form">
                                <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                    <label className="sr-only" htmlFor="form-email">Email</label>
                                    <input className="form-control" id="form-email"
                                        type="email" name="email" placeholder="Email..."
                                        value={email} onChange={this.inputChange} />
                                    {submitted && !email && <div className="help-block">Email is required</div>}
                                </div>
                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                    <label className="sr-only" htmlFor="form-password">Password</label>
                                    <input className="form-password form-control" id="form-password"
                                        type="password" name="password" placeholder="Password..."
                                        value={password} onChange={this.inputChange} />
                                    {submitted && !password && <div className="help-block">Password is required</div>}
                                </div>
                                <div className="form-group">
                                    <button className="btn" onClick={this.login}>Sign in!</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state: any) => {
    const { auth } = state;
    return {
        auth
    };
}

export const ConnectedLoginPage = connect(mapStateToProps)(LoginPage);
