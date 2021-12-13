import { Schema } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { history, undo, redo } from 'prosemirror-history';
import { HtmlEditor, Editor } from '@aeaton/react-prosemirror';
import { Component } from 'react';
import PropTypes from 'prop-types';

import { WorkSubmitter, getRawText, submitWork } from './WorkSubmitter';
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
        'c-z': undo,
        'c-y': redo,
        'a-Enter': submitWork,
    }),
    keymap(baseKeymap),
    history(),
    WorkSubmitter()
];

class WorkEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : props.value,
            onSubmit: props.onSubmit,
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(value) {
        this.setState({ value: value });
    }

    onSubmit() {
        this.state.onSubmit(getRawText());
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