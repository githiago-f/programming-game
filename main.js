import { interpreter, vars } from './src/scripts/interpreter';
import './style.css';

/**
 * @type {HTMLTextAreaElement}
 */
const editor = document.getElementById('script-editor');
/**
 * @type {HTMLButtonElement}
 */
const runButton = document.getElementById('run');

runButton.onclick = function() {
  interpreter(editor.value);
}
