import {Plugin, PluginKey} from 'prosemirror-state';

// this plugin is used to return the text of the editor, and to allow the editor to be changed

var rawText = '';

function applyTransaction(tr, value, oldState, newState) {
    rawText = tr.doc.textBetween(0, tr.doc.content.size, '\n');
    console.log(rawText);
    return value;
}

// add newText to the state
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
        console.log('submitting work');
        let apiResponse = 'fuck' // todo, actually use the api
        submitTransaction(state, dispatch, apiResponse);
    }
    return true;
}
