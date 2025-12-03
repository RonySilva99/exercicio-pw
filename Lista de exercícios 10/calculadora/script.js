const display = document.getElementById('display');
const history = document.getElementById('history');
const keys = document.getElementById('keys');

let current = '0';
let previous = '';
let operator = null;
let justEvaluated = false;

function updateScreen(){
  display.textContent = current;
  history.textContent = previous ? previous : '\u00A0';
}

function inputNumber(n){
  if (justEvaluated) {
    current = '0';
    justEvaluated = false;
  }
  if (n === '.' && current.includes('.')) return;
  if (current === '0' && n !== '.') current = n;
  else current = current + n;
  updateScreen();
}

function clearAll(){
  current = '0'; previous = ''; operator = null; justEvaluated = false;
  updateScreen();
}

function backspace(){
  if (justEvaluated) { clearAll(); return; }
  if (current.length <= 1) current = '0';
  else current = current.slice(0, -1);
  updateScreen();
}

function handlePercent(){
  const num = parseFloat(current);
  if (isNaN(num)) return;
  current = String(num / 100);
  updateScreen();
}

function chooseOperator(op){
  if (operator && !justEvaluated) {
    compute();
  }
  operator = op;
  previous = `${current} ${op}`;
  current = '0';
  updateScreen();
}

function compute(){
  const a = parseFloat(previous);
  const b = parseFloat(current);
  if (isNaN(a) || isNaN(b) || !operator) return;

  let result;

  switch(operator){
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/': result = b === 0 ? 'Erro' : a / b; break;
  }

  current = String(Number.isFinite(result) ? +parseFloat(result).toPrecision(12) : result);
  previous = '';
  operator = null;
  justEvaluated = true;

  updateScreen();
}

keys.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const num = btn.dataset.num;
  const action = btn.dataset.action;

  if (num !== undefined) {
    inputNumber(num);
    return;
  }
  if (!action) return;
  if (action === 'clear') clearAll();
  else if (action === 'back') backspace();
  else if (action === 'percent') handlePercent();
  else if (action === '=') compute();
  else if (['+','-','*','/'].includes(action)) chooseOperator(action);
});

window.addEventListener('keydown', (e) => {
  const k = e.key;

  if ((/[\d\.]/).test(k)) {
    e.preventDefault();
    inputNumber(k);
    return;
  }
  if (k === 'Enter' || k === '=') { e.preventDefault(); compute(); return; }
  if (k === 'Backspace') { e.preventDefault(); backspace(); return; }
  if (k === 'Escape' || k.toLowerCase() === 'c') { e.preventDefault(); clearAll(); return; }
  if (k === '%') { e.preventDefault(); handlePercent(); return; }
  if (k === '+' || k === '-' || k === '*' || k === '/') { e.preventDefault(); chooseOperator(k); return; }
});

updateScreen();
