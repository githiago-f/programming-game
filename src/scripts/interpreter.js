import { renderVariables } from "./render-variables";

// memory registers
export const vars = new Map(); // { varName: value }

// constants
const varStatement = /[^\s]\s?\=\s?[^\s]/i;
const conditionStatement = /[^\s]\s?(>=|<=|>|<|==)\s?[^\s]/;
const aritimeticStatement = /[0-9]*\s?(\*|\+|\/|\-|\%)\s?[0-9]*/;
const ifStatement = /^if\([^]+\):$/;
const whileStatement = /^while\([^]+\):$/;
const printStatement = /^print\([^]+\)/;

// interpreter functions
export function interpreter(program) {
  const lines = program.split(/\n/g);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if(whileStatement.test(line)) {
      const linesToJump = countNestedLines(lines[i], lines.slice(i+1));
      const nextLines = lines.slice(i+1, i + 1 + linesToJump);
      handleLoops(line, nextLines, linesToJump);
      i += linesToJump;
    }
    else if (ifStatement.test(line)) {
      i += handleIf(lines[i], lines.slice(i + 1));
    }
    else if (varStatement.test(line)) {
      handleAssignment(line);
    }
    else if (printStatement.test(line)) {
      console.log(atom(line.replace(/print\(|\)$/g, '')));
    }
    renderVariables(vars);
  }
}

function aritimatics(operation) {
  let [left, op, right] = operation.split(/(\*|\+|\\|\-|\%)/);
  left = left.trim();
  right = right.trim();
  switch (op) {
    case '*': return atom(left) * atom(right);
    case '/': return atom(left) / atom(right);
    case '-': return atom(left) - atom(right);
    case '%': return atom(left) % atom(right);
    case '+': return atom(left) + atom(right);
  }
}
function conditions(operation) {
  let [left, operator, right] = operation.split(/(>=|<=|>|<|==)/);
  left = left.trim();
  right = right.trim();
  switch (operator) {
    case '>': return atom(left) > atom(right);
    case '<': return atom(left) < atom(right);
    case '>=': return atom(left) >= atom(right);
    case '<=': return atom(left) <= atom(right);
    case '==': return atom(left) === atom(right);
  }
}
function atom(val) {
  if (conditionStatement.test(val)) return conditions(val);
  else if (aritimeticStatement.test(val)) return aritimatics(val);
  else if (!isNaN(Number(val))) return Number(val);
  else if (val === 'true') return true;
  else if (val === 'false') return false;
  else if (val.startsWith('"') && val.endsWith('"')) return val.replace(/"/g, '');
  else {
    if (vars.has(val))
      return vars.get(val);
    throw Error(val + ' is not defined');
  }
}
function handleAssignment(line) {
  const [name, ...value] = line.split(/=/);
  vars.set(name.trim(), atom(value.join('').trim()));
}
function countNestedLines(line, nextLines) {
  function indentationCount(ln) {
    if(!/^\s/.test(ln)) {
      return 0;
    }
    return indentationCount(ln.slice(1)) + 1;
  }
  const spaces = indentationCount(line);
  let nestedLines = 0;
  for (const l of nextLines) {
    const lineSpace = indentationCount(l);
    if (lineSpace <= spaces) break;
    nestedLines++;
  }
  return nestedLines;
}
function handleLoops(line, nextLines) {
  const condition = () => atom(line.replace(/while\(|\)\:/g, ''));
  while(condition()) {
    interpreter(nextLines.join('\n'));
  }
}
function handleIf(line, nextLines) {
  const nestedLines = countNestedLines(line, nextLines);
  const value = atom(line.trim().replace(/if\(|\)\:/g, ''));
  if (value === true) return 0;
  return nestedLines;
}
