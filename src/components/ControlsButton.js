import { Component } from 'react';
import PropTypes from 'prop-types';

class ControlsButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: props.defaultTitle,
            onClick: props.onClick,
        };
    }

    render() {
        return(
            <button class="controls-button" aria-label={this.state.title} onClick={this.state.onClick}>
                {this.props.title}
            </button>
        );
    }
}

ControlsButton.defaultProps = {
    defaultTitle: 'New Button',
    onClick: () => {},
};

ControlsButton.propTypes = {
    defaultTitle: PropTypes.string,
    onClick: PropTypes.func,
};

export default ControlsButton;