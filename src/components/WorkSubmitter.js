import {Plugin, PluginKey} from 'prosemirror-state';
import { currentOptions } from './App';
import { getGenerator, newGenerator } from './Generator';

// this plugin is used to return the text of the editor, and to allow the editor to be changed

var rawText = '';

function applyTransaction(tr, value, oldState, newState) {
    rawText = tr.doc.textBetween(0, tr.doc.content.size, '\n');
    return value;
}

function submitTransaction(state, dispatch, newText) {
    var tr = state.tr.insertText(newText);
    dispatch(tr);
    return state;
}

export function getRawText() {
    return rawText;
}

const workKey = new PluginKey('workSubmitter');

export function WorkSubmitter(options) {
    return new Plugin({
        key: workKey,
        state: {
            init: function init() {
                return {};
            },
            apply: applyTransaction
        }
    });
}

export function submitWork(state, dispatch) {
    // call api to submit work
    let work = workKey.getState(state);
    if (!work) return false;
    if (dispatch) {
        let generator = getGenerator(currentOptions);
        if (generator === null) generator = newGenerator(currentOptions.serverOptions.serverAddress, currentOptions.serverOptions.username, currentOptions.serverOptions.password);
        let options = currentOptions;
        options.work = getRawText();
        generator.generate(options).then(response => {
            submitTransaction(state, dispatch, response);
        })
    }
    return true;
}
