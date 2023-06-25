import './styles/default.css';
import { interpreter, resetProgram } from './scripts/interpreter';
import { selectFile } from './scripts/select-file';

/**
 * @type {HTMLTextAreaElement}
 */
const editor = document.getElementById('script-editor');
/**
 * @type {HTMLButtonElement}
 */
const runButton = document.getElementById('run');

runButton.onclick = function() {
  resetProgram();
  interpreter(editor.value);
}

selectFile(`x = 0
enquanto(x < 10):
  escreve("X :: " + x)
  x = x + 1
`)
