import { Component } from 'react';
import WorkEditor from "./WorkEditor";
import OptionsBar, { defaultOptions } from "./OptionsBar";
import './App.css';
import { Sukima_API } from "./Generator";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workText: '<p></p>',
            options: defaultOptions,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onOptionsChange = this.onOptionsChange.bind(this);
        this.generator = new Sukima_API('http://0.0.0.0:8080', 'test', 'test');
    }

    onSubmit(workText) {
        console.log(workText);
        this.setState({workText: workText});
        let args = this.state.options;
        args.work = workText;
        this.generator.generate(args).then(response => {
            this.setState({workText: response});
            console.log(this.state.workText);
        });
    }

    onOptionsChange(options) {
        console.log(options);
        this.setState({options: options});
    }

    render() {
        console.log(this.state.workText);
        return (
        <div class="app-defaults" style={{left:0},{top:0}}>
            <WorkEditor value={this.state.workText} onSubmit={this.onSubmit}/>
            <OptionsBar onChange={this.onOptionsChange}/>
        </div>
        );
    }
}

export default App;