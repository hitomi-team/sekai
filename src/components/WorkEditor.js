import { Schema } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { history, undo, redo } from 'prosemirror-history';
import { HtmlEditor, Editor, Toolbar } from '@aeaton/react-prosemirror';
import { Component } from 'react';
import PropTypes from 'prop-types';

import { WorkSubmitter, submitWork } from './WorkSubmitter';

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

export const leftToolbar = [
    {
        id: 'leftbar',
        items: [
            {
                id: 'undo',
                title: 'Undo',
                content: 'Undo',
                action: undo,
                enable: undo,
            },
            {
                id: 'redo',
                title: 'Redo',
                content: 'Redo',
                action: redo,
                enable: redo,
            }
        ],

    }
]

export const rightToolbar = [
    {
        id: 'rightbar',
        items: [
            {
                id: 'submit',
                title: 'Submit',
                content: 'Submit',
                action: submitWork,
                enable: submitWork,
            }
        ],

    }
]

class WorkEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : props.value,
            onSubmit: props.onSubmit,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({ value: value });
    }

    render() {
        return (
            <div className="editor">
                <div className={this.state.infoClass}>{this.state.infoMsg}</div>
                <HtmlEditor plugins={plugins} schema={docSchema} value={this.state.value} handleChange={this.handleChange} debounce={250}>
                    <Editor />
                    <div className="prosemirror-toolbar-group">
                        <div className="controls-buttons">
                            <Toolbar toolbar={leftToolbar} style={{margin: '10px'}}/>
                        </div>
                        <div className="controls-buttons">
                            <Toolbar toolbar={rightToolbar} style={{margin: '10px'}}/>
                        </div>
                    </div>
                </HtmlEditor>
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