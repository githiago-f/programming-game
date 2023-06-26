import './styles/default.css';
import { interpreter, resetProgram } from './scripts/interpreter';
import { selectFile } from './scripts/select-file';
import { Application } from 'pixi.js';

const app = new Application({ height: 570, width: 800 });
document.getElementById('game').append(app.view);

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

selectFile(`# Author: https://github.com/githiago-f
x = 0
enquanto(x < 10):
  se(x % 2 == 0):
    escreve("X :: " + x)
  x = x + 1
`);
