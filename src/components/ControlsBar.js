import { Component } from 'react';
import { ToolbarGroup } from '@aeaton/react-prosemirror';
import PropTypes from 'prop-types';

import ControlsButton from './ControlsButton';

class ControlsBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onSubmit: props.onSubmit,
        };
    }

    render() {
        return(
            <div class="controls-bar">
                <div class="controls-buttons"></div>
                <div class="controls-buttons">
                    <ControlsButton title="Submit" onClick={this.state.onSubmit} />
                </div>
            </div>
        );
    }
}

ControlsBar.defaultProps = {
    onSubmit: () => {},
};

ControlsBar.propTypes = {
    onSubmit: PropTypes.func,
};

export default ControlsBar;