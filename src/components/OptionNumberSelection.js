import { Component } from "react";
import PropTypes from 'prop-types';

class OptionNumberSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
            defaultValue: props.defaultValue,
            description: props.defaultDescription,
            title: props.defaultTitle,
            rangeSliderMin: props.rangeSliderMin,
            rangeSliderMax: props.rangeSliderMax,
            rangeSliderStep: props.rangeSliderStep,
            onChange: props.onChange,
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange = (event) => {
        this.setState({
            value: event.target.value,
        });
        this.state.onChange(event.target.value);
    }

    render() {
        return(
            <div class="option-selection">
                <div class="option-title">
                    {this.state.title}
                </div>
                <div class="option-description">
                    {this.state.description}
                </div>
                <div class="option-value">
                    <input type="number" value={this.state.value} onChange={this.onChange} />
                </div>
                <div class="option-default" onClick={() => {this.setState({value: this.state.defaultValue})}}>
                    Default: {this.props.defaultValue}
                </div>
                <input class="slider" type="range" min={this.state.rangeSliderMin} max={this.state.rangeSliderMax} step={this.state.rangeSliderStep} value={this.state.value} onChange={this.onChange} />
            </div>
        );
    }
}

// default props
OptionNumberSelection.defaultProps = {
    defaultTitle: 'New Value',
    defaultValue: 0.0,
    defaultDescription: 'New Description',
    rangeSliderMax: 1.0,
    rangeSliderMin: 0.0,
    rangeSliderStep: 0.1,
    onChange: () => {},
};

OptionNumberSelection.propTypes = {
    defaultTitle: PropTypes.string,
    defaultDescription: PropTypes.string,
    defaultValue: PropTypes.number,
    rangeSliderMax: PropTypes.number,
    rangeSliderMin: PropTypes.number,
    rangeSliderStep: PropTypes.number,
    onChange: PropTypes.func,
};

export default OptionNumberSelection;