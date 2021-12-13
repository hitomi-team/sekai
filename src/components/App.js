import { Component } from 'react';
import WorkEditor from "./WorkEditor";
import OptionsBar, { defaultOptions } from "./OptionsBar";
import { newGenerator } from './Generator';
import './App.css';

export var currentOptions = null;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workText: '<p></p>',
            options: defaultOptions,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onOptionsChange = this.onOptionsChange.bind(this);
        currentOptions = this.state.options;
        newGenerator(currentOptions.serverOptions.serverAddress, currentOptions.serverOptions.username, currentOptions.serverOptions.password);
    }

    onSubmit(workText) {
    }

    onOptionsChange(options) {
        console.log(options);
        this.setState({options: options});
        currentOptions = options;
    }

    render() {
        console.log(this.state.workText);
        return (
        <div class="app-defaults" style={{position: 'absolute', left: 0, top: 0}}>
            <WorkEditor value={this.state.workText} onSubmit={this.onSubmit}/>
            <OptionsBar onChange={this.onOptionsChange}/>
        </div>
        );
    }
}

export default App;