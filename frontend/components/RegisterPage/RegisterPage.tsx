import * as React from "react";
import "./RegisterPage.scss";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { ConnectedAlertBar } from "../AlertBar";

class RegisterPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            submitted: false
        };
        this.inputChange = this.inputChange.bind(this);
        this.register = this.register.bind(this);
    }

    inputChange(e: any) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    register(e: any) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { name, email, password } = this.state;
        const { dispatch } = this.props;

        // console.log("Registering with name: " + name + " email: " + email + " pass: " + password);
        dispatch(register({
            name: name,
            email: email,
            password: password
        }));
    }

    render() {
        const { name, email, password, submitted } = this.state;

        return (
            <div className="container inner-bg">
                <div className="row">
                    <div className="col-sm-6 form-box">
                        <div className="form-top">
                            <div className="form-top-left">
                                <h3>Sign up</h3>
                                <p>Fill in the form below to get instant access:</p>
                            </div>
                            <div className="form-top-right">
                                <i className="fa fa-pencil"></i>
                            </div>
                        </div>
                        <ConnectedAlertBar />
                        <div className="form-bottom">
                            <form className="registration-form" role="form" onSubmit={this.register}>
                                <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
                                    <label className="sr-only" htmlFor="form-name">Name</label>
                                    <input className="form-name form-control" id="form-name"
                                        type="text" name="name" placeholder="Name..."
                                        value={name} onChange={this.inputChange} />
                                    {submitted && !name && <div className="help-block">Your name is required</div>}
                                </div>
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
                                    <button className="btn" type="submit">Sign me up!</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    const { auth } = state;
    return {
        auth
    };
}

export const ConnectedRegisterPage = connect(mapStateToProps)(RegisterPage);
