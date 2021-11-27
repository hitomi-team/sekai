import { Component } from "react";
import PropTypes from 'prop-types';

class OptionTextSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
            title: props.defaultTitle,
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
                <input type="text" value={this.state.value} onChange={this.onChange} />
            </div>
        );
    }
}

// default props
OptionTextSelection.defaultProps = {
    defaultTitle: 'New Value',
    defaultValue: '',
    onChange: () => {},
};

OptionTextSelection.propTypes = {
    defaultTitle: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
};

export default OptionTextSelection;