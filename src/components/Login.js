
import { newGenerator, authenticate } from './Generator';
import { Component } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import './OptionsBar.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            onLogin: props.onLogin,
            error: false,
        };
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin = () => {
        newGenerator('http://c1.kuro.mu:8000', this.state.username, this.state.password);
        authenticate(this.state.username, this.state.password).then(token => {
            if (token !== undefined) {
                this.state.onLogin(token);
            } else {
                this.setState({error: true});
            }
        });
    }

    render() {
        return (
            <div className="login">
                <form className="loginbox">
                    <div>Login To Sekai</div>
                    <div><label htmlFor="username" className="option-title">E-Mail</label></div>
                    <input id="username" type="email" required="" onChange={(event) => {this.setState({username: event.target.value})}}/>
                    <div><label htmlFor="password" className="option-title">Password</label></div>
                    <input id="password" type="password" required="" onChange={(event) => {this.setState({password: event.target.value})}}/>
                    <div className="tablinks" onClick={this.onLogin}>Login</div>
                    <div className="loginerror">{this.state.error ? 'Invalid username or password' : ''}</div>
                </form>
            </div>
        );
    }
}

Login.defaultProps = {
    onLogin: () => {},
};

Login.propTypes = {
    onLogin: PropTypes.func,
};

export default Login;