import { Schema } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { history, undo, redo } from 'prosemirror-history';
import { HtmlEditor, Editor } from '@aeaton/react-prosemirror';
import { Component } from 'react';
import PropTypes from 'prop-types';

import ControlsBar from './ControlsBar';

import './WorkEditor.css';

const docSchema = new Schema({
    nodes: {
        text: {},
        doc: {
            content: 'paragraph+'
        },
        paragraph: {
            content: 'text*',
            parseDOM: [{ tag: 'p' }],
            toDOM: () => ['p', 0]
        },
        marks: {
            break: {
                parseDOM: [{ tag: 'br' }],
                toDOM: () => ['br']
            }
        }
    }
});

const plugins = [
    keymap({
        'Mod-z': undo,
        'Mod-y': redo,
    }),
    keymap(baseKeymap),
    history()
];

class WorkEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoMsg: '',
            infoClass: '',
            value : props.value,
            onSubmit: props.onSubmit,
        }
        this.handleChange = this.handleChange.bind(this);
        this.info = this.info.bind(this);
        this.error = this.error.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    error(msg) {
        this.setState({
            infoMsg: msg,
            infoClass: 'error'
        });
    }

    info(msg) {
        this.setState({
            infoMsg: msg,
            infoClass: 'info'
        });
    }

    handleChange(value) {
        this.setState({ value: value });
        this.info('Saved');
    }

    onSubmit() {
        this.state.onSubmit(this.state.value);
    }

    render() {
        return (
            <div class="editor">
                <div class={this.state.infoClass}>{this.state.infoMsg}</div>
                <HtmlEditor plugins={plugins} schema={docSchema} value={this.state.value} handleChange={this.handleChange} debounce={250}>
                    <Editor />
                </HtmlEditor>
                <div class="controls-content" style={{margin: '10px'}}>
                    <ControlsBar onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}

// set default props
WorkEditor.defaultProps = {
    value: '<p></p>',
    onSubmit: () => {},
};

WorkEditor.propTypes = {
    value: PropTypes.string,
    onSubmit: PropTypes.func,
};

export default WorkEditor;