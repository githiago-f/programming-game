import './styles/default.css';
import { interpreter, resetProgram } from './scripts/interpreter';
import { selectFile } from './scripts/select-file';
import { Application } from 'pixi.js';
import { edit } from 'ace-code';
import  theme from 'ace-code/src/theme/dracula';
import { Mode } from 'ace-code/src/mode/c_cpp';

const app = new Application({ height: 570, width: 800 });
document.getElementById('game').append(app.view);
/**
 * @type {HTMLButtonElement}
 */
const runButton = document.getElementById('run');

selectFile(`# Author: https://github.com/githiago-f
x = 0
enquanto(x < 10):
  se(x % 2 == 0):
    escreve("X :: " + x)
  x = x + 1
`);

const aceEditor = edit('script-editor', {
  mode: new Mode(),
  theme: theme,
  fontSize: 18
});

runButton.onclick = function() {
  resetProgram();
  interpreter(aceEditor.session.getDocument().getValue());
}

