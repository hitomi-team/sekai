import { Component } from 'react';
import WorkEditor from "./WorkEditor";
import OptionsBar, { defaultOptions } from "./OptionsBar";
import { newGenerator } from './Generator';
import { initIndexedDB, checkLocalStorage } from './Storage';
import Login from './Login';
import './App.css';

export var currentOptions = null;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workText: '<p></p>',
            options: defaultOptions,
            authenticated: false,
        };
        this.onOptionsChange = this.onOptionsChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
        currentOptions = this.state.options;
    }

    componentDidMount() {
        initIndexedDB();
        if (!checkLocalStorage('token')) {
            this.setState({
                authenticated: false,
            });
        } else {
            newGenerator(currentOptions.serverOptions.serverAddress, currentOptions.serverOptions.username, currentOptions.serverOptions.password);
        }
    }

    onOptionsChange(options) {
        this.setState({options: options});
        currentOptions = options;
    }

    onLogin = (token) => {
        if (token !== undefined) {
            this.setState({authenticated: true});
        }
    }

    render() {
        // check if the user is authenticated
        if (!this.state.authenticated) {
            return (
                <Login onLogin={this.onLogin}/>
            )
        } else {
            return (
            <div className="app-defaults" style={{position: 'absolute', left: 0, top: 0}}>
                <WorkEditor value={this.state.workText} onSubmit={this.onSubmit}/>
                <OptionsBar onChange={this.onOptionsChange}/>
            </div>
            );
        }
    }
}

export default App;