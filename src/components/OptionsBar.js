import { Component } from "react";
import PropTypes from 'prop-types';
import OptionTextSelection from "./OptionTextSelection";
import OptionNumberSelection from "./OptionNumberSelection";

import './OptionsBar.css'

export const defaultOptions = {
    workOptions: {
        title: "New Work",
        description: "",
        memory: "",
        authorNote: "[ A/N: ]",
    },
    genOptions: {
        responseLength: 40,
        samplingTemperature: 0.5,
        topPSampling: 1.0,
        topKSampling: 0,
        tailFreeSampling: 0.993,
        repetitionPenalty: 3.875,
        repetitionPenaltySlope: 0.18,
        repetitionPenaltyRange: 2048,
    },
    serverOptions: {
        serverAddress: "http://lit.kuro.mu:8000/",
        username: "test",
        password: "test",
    },
};

// Collapsible component
export default class OptionsBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: defaultOptions,
            onChange: props.onChange,
            optionsOpen: true,
            justOpened: false,
        }
        this.openOptions = this.openOptions.bind(this);
        this.closeOptionsBar = this.closeOptionsBar.bind(this);
        this.openOptionsBar = this.openOptionsBar.bind(this);
    }

    openOptions(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "flex";
        evt.currentTarget.className += " active";
    }

    closeOptionsBar() {
        var sidebar = document.getElementById("options-sidebar");
        sidebar.style.display = "none";
        var open_options = document.getElementById("open-options");
        open_options.style.display = "flex";
        this.setState({
            optionsOpen: false,
        });
    }

    openOptionsBar() {
        var sidebar = document.getElementById("options-sidebar");
        sidebar.style.display = "flex";
        var open_options = document.getElementById("open-options");
        open_options.style.display = "none";
        this.setState({
            optionsOpen: true
        });
    }

    componentDidMount() {
        document.getElementById("tab-default").click();
        document.getElementById("open-options").click();
    }

    // call the onChange function with the new options when changes are made, the onChange function in the Options return the value
    render() {
            return (
                <div>
                <div className="tablinks" style={{zIndex: 100}} id="open-options" onClick={() => {this.openOptionsBar();}}>Options</div>
                <div className="options-sidebar" id="options-sidebar">
                    <div className="closebtn-container" onClick={() => {this.closeOptionsBar();}} ><div className="closebtn" /></div>
                    <div className="options-links-container">
                        <div className="options-sidebar-links">
                            <div id="tab-default" className="tablinks" onClick={(e) => (this.openOptions(e, 'tab-work'))}>Work</div>
                            <div className="tablinks" onClick={(e) => (this.openOptions(e, 'tab-settings'))}>Settings</div>
                            <div className="tablinks" onClick={(e) => (this.openOptions(e, 'tab-server'))}>Server</div>
                        </div>
                        <div className="tabcontent" id="tab-work">
                            <OptionTextSelection defaultTitle="Title" defaultValue={defaultOptions.workOptions.title} onChange={(v) => {this.setState({options: {...this.state.options, workOptions: {...this.state.options.workOptions, title: v}}}, () => {this.state.onChange(this.state.options)})}} />
                            <OptionTextSelection defaultTitle="Description" defaultValue={defaultOptions.workOptions.description} onChange={(v) => {this.setState({options: {...this.state.options, workOptions: {...this.state.options.workOptions, description: v}}}, () => {this.state.onChange(this.state.options)})}} />
                            <OptionTextSelection defaultTitle="Memory" defaultValue={defaultOptions.workOptions.memory} onChange={(v) => {this.setState({options: {...this.state.options, workOptions: {...this.state.options.workOptions, memory: v}}}, () => {this.state.onChange(this.state.options)})}} />
                            <OptionTextSelection defaultTitle="Author's Note" defaultValue={defaultOptions.workOptions.authorNote} onChange={(v) => {this.setState({options: {...this.state.options, workOptions: {...this.state.options.workOptions, authorNote: v}}}, () => {this.state.onChange(this.state.options)})}} />
                        </div>
                        <div className="tabcontent" id="tab-settings">
                            <div className="option-selection">Generation Options</div>
                            <OptionNumberSelection defaultTitle="Response Length" defaultDescription="The amount of tokens being generated." defaultValue={defaultOptions.genOptions.responseLength} rangeSliderMax={100} rangeSliderMin={1} rangeSliderStep={1} onChange={(v) => {this.setState({options: {...this.state.options, genOptions: {...this.state.options.genOptions, responseLength: v}}}, () => {this.state.onChange(this.state.options)})}} />
                            <OptionNumberSelection defaultTitle="Sampling Temperature" defaultDescription="The higher the temperature, the more random the generated results." defaultValue={defaultOptions.genOptions.samplingTemperature} rangeSliderMax={2.0} rangeSliderMin={0.0} rangeSliderStep={0.01} onChange={(v) => {this.setState({options: {...this.state.options, genOptions: {...this.state.options.genOptions, samplingTemperature: v}}}, () => {this.state.onChange(this.state.options)})}} />
                            <OptionNumberSelection defaultTitle="Top-P Sampling" defaultDescription="A higher value means more diverse results." defaultValue={defaultOptions.genOptions.topPSampling} rangeSliderMax={1.0} rangeSliderMin={0.1} rangeSliderStep={0.01} onChange={(v) => {this.setState({options: {...this.state.options, genOptions: {...this.state.options.genOptions, topPSampling: v}}}, () => {this.state.onChange(this.state.options)})}} />
                            <OptionNumberSelection defaultTitle="Top-K Sampling" defaultDescription="Higher values create more creative results, while lower values create consistent results." defaultValue={defaultOptions.genOptions.topKSampling} rangeSliderMax={350.0} rangeSliderMin={1} rangeSliderStep={1} onChange={(v) => {this.setState({options: {...this.state.options, genOptions: {...this.state.options.genOptions, topKSampling: v}}}, () => {this.state.onChange(this.state.options)})}} />
                            <OptionNumberSelection defaultTitle="Tail-Free Sampling" defaultDescription="Decreases diversity through pruning the worst tokens. Higher values would result in consistent results." defaultValue={defaultOptions.genOptions.tailFreeSampling} rangeSliderMax={1.0} rangeSliderMin={0.1} rangeSliderStep={0.01} onChange={(v) => {this.setState({options: {...this.state.options, genOptions: {...this.state.options.genOptions, tailFreeSampling: v}}}, () => {this.state.onChange(this.state.options)})}} />
                            <OptionNumberSelection defaultTitle="Repetition Penalty" defaultDescription="Applies a penalty on repeated tokens, higher values would result in less repetitiveness." defaultValue={defaultOptions.genOptions.repetitionPenalty} rangeSliderMax={5.0} rangeSliderMin={1.0} rangeSliderStep={0.01} onChange={(v) => {this.setState({options: {...this.state.options, genOptions: {...this.state.options.genOptions, repetitionPenalty: v}}}, () => {this.state.onChange(this.state.options)})}} />
                            <OptionNumberSelection defaultTitle="Repetition Penalty Slope" defaultDescription="Applies a curve to how the repetition penalty is applied from the final token." defaultValue={defaultOptions.genOptions.repetitionPenaltySlope} rangeSliderMax={5.0} rangeSliderMin={0.0} rangeSliderStep={0.01} onChange={(v) => {this.setState({options: {...this.state.options, genOptions: {...this.state.options.genOptions, repetitionPenaltySlope: v}}}, () => {this.state.onChange(this.state.options)})}} />
                            <OptionNumberSelection defaultTitle="Repetition Penalty Range" defaultDescription="The range in which the repetition penalty is applied from the final token." defaultValue={defaultOptions.genOptions.repetitionPenaltyRange} rangeSliderMax={2048} rangeSliderMin={1} rangeSliderStep={1} onChange={(v) => {this.setState({options: {...this.state.options, genOptions: {...this.state.options.genOptions, repetitionPenaltyRange: v}}}, () => {this.state.onChange(this.state.options)})}} />
                        </div>
                        <div className="tabcontent" id="tab-server">
                            <OptionTextSelection defaultTitle="Server Address" defaultValue={defaultOptions.serverOptions.serverAddress} onChange={(v) => {this.setState({options: {...this.state.options, serverOptions: {...this.state.options.serverOptions, serverAddress: v}}}, () => {this.state.onChange(this.state.options)})}} />
                            <OptionTextSelection defaultTitle="Username" defaultValue={defaultOptions.serverOptions.username} onChange={(v) => {this.setState({options: {...this.state.options, serverOptions: {...this.state.options.serverOptions, username: v}}}, () => {this.state.onChange(this.state.options)})}} />
                            <OptionTextSelection defaultTitle="Password" defaultValue={defaultOptions.serverOptions.password} onChange={(v) => {this.setState({options: {...this.state.options, serverOptions: {...this.state.options.serverOptions, password: v}}}, () => {this.state.onChange(this.state.options)})}} />
                        </div>
                    </div>
                </div>
                </div>
            );
    }
}

OptionsBar.defaultProps = {
    onChange: () => {},
};

OptionsBar.propTypes = {
    onChange: PropTypes.func,
};
