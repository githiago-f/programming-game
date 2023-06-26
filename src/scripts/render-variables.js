/**
 * @type {HTMLTableElement}
 */
const varsTable = document.getElementById('vars');

/**
 *
 * @param {Map<string, number|string|boolean>} state
 */
export function renderVariables(state) {
    varsTable.innerHTML = `<thead><th><td>Variavel</td><td>Valor</td></th></thead>`;
    varsTable.createTBody();
    for (const [key, val] of state) {
        const row = varsTable.insertRow();
        const name = row.insertCell(0);
        const value = row.insertCell(1);
        name.innerHTML = key;
        value.innerHTML = val;
    }
}
