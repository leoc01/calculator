const zeroKey = document.getElementById('zeroo');
const oneKey = document.getElementById('one');
const twoKey = document.getElementById('two');
const threeKey = document.getElementById('three');
const fourKey = document.getElementById('four');
const fiveKey = document.getElementById('five');
const sixKey = document.getElementById('six');
const sevenKey = document.getElementById('seven');
const eightKey = document.getElementById('eight');
const nineKey = document.getElementById('nine');

const addKey = document.getElementById('addd');
const subtractKey = document.getElementById('subtrac');
const multiplyKey = document.getElementById('multipl');
const divideKey = document.getElementById('divide');

const clearKey = document.getElementById('clear');
const backspaceKey = document.getElementById('backspace');
const changeSignKey = document.getElementById('changeSign');
const decimalKey = document.getElementById('decima');

const equalKey = document.getElementById('equal');

const screen = document.getElementById('screen');

let x = 0;
let y = 0;
let screenNumber = '0';
let operation = 'null';

//some buttons change the behavior depends on where was the last click

//error: block the calculator
let error = false;
//firstClickOnOperation: block calling equalFunction if click on operations more than once in a row
let firstClickOnOperation = true;
//lastWasEqual1: call the clearFunction to clean the calculator if you did one operation and start a new one clicking on a number
let lastWasEqual = false;
//newNumber: check if should update the old number or replace.
let newNumber = true;
//blockBackspace: allow backspace just in numbers wrote by the user
let blockBackspace = false;

//functions declaration

const createNumber = (pressed) => {
	if (!error) {
		if (lastWasEqual) {
			clearFunction();
			lastWasEqual = false;
		}

		if (newNumber === true) {
			screenNumber = '0';
			newNumber = false;
		}

		if (
			pressed !== '.' ||
			(screenNumber.split('.').length < 2 && pressed === '.')
		) {
			if (pressed === '.' && screenNumber === '0') {
				screenNumber = '0.';
			} else {
				screenNumber = `${screenNumber}${pressed}`;
			}

			blockBackspace = false;
		}

		if (
			screenNumber.length > 1 &&
			screenNumber[0] === '0' &&
			screenNumber.split('.').length < 2
		) {
			screenNumber = screenNumber.substring(1);
		}

		checkSize(screenNumber.length);

		y = parseFloat(screenNumber);

		firstClickOnOperation = true;
	}

	updateScreen(screenNumber);
};

//check if the lenght of the number fit in the 8-digit screen
const checkSize = (size) => {
	if (size > 8) {
		error = true;
		screenNumber = 'err >8dig';
	}
};

const updateScreen = (newScreenNumber) => {
	screen.innerHTML = newScreenNumber;
};

const setOperation = (key) => {
	lastWasEqual = false;

	if (firstClickOnOperation && operation !== 'null') {
		equalFunction();
		firstClickOnOperation = false;
	}

	x = parseFloat(screenNumber);
	newNumber = true;
	operation = key;
};

const doTheMath = () => {
	let result;

	switch (operation) {
		case '+':
			result = addFunction(x, y);
			break;
		case '-':
			result = subtractFunction(x, y);
			break;
		case '*':
			result = multiplyFunction(x, y);
			break;
		case '/':
			result = divideFunction(x, y);
			break;
	}

	return result;
};

const addFunction = (x, y) => {
	return (10000000 * x + 10000000 * y) / 10000000;
};

const subtractFunction = (x, y) => {
	return (10000000 * x - 10000000 * y) / 10000000;
};

const multiplyFunction = (x, y) => {
	return (10000000 * x * (10000000 * y)) / 100000000000000;
};

const divideFunction = (x, y) => {
	return ((10000000 * x) / (10000000 * y)) * 100000000000000;
};

const clearFunction = () => {
	error = false;
	x = 0;
	y = 0;
	screenNumber = '0';
	newNumber = true;
	operation = 'null';
	updateScreen(screenNumber);
	firstClickOnOperation = true;
};

const equalFunction = () => {
	if (!error) {
		let result = doTheMath();

		if (isNaN(result)) {
			result = y;
		}

		if (result === Infinity) {
			result = 'err div0';
			error = true;
		}

		x = result;
		screenNumber = `${result}`;

		checkSize(screenNumber.length);

		updateScreen(screenNumber);
		newNumber = true;

		blockBackspace = true;

		firstClickOnOperation = true;
	}
};

const backspaceFunction = () => {
	if (!error && !blockBackspace) {
		screenNumber = `${screenNumber}`.slice(0, -1);
		if (!screenNumber) {
			screenNumber = '0';
		}
		y = parseFloat(screenNumber);
		updateScreen(screenNumber);
	}
};

const changeSignFunction = () => {
	if (!error) {
		x = parseFloat(screenNumber);
		x = -x;
		screenNumber = `${x}`;
		updateScreen(screenNumber);
	}
};

//event listeners
backspaceKey.addEventListener('click', () => backspaceFunction());
changeSignKey.addEventListener('click', () => changeSignFunction());
clearKey.addEventListener('click', () => clearFunction());

addKey.addEventListener('click', () => setOperation('+'));
subtractKey.addEventListener('click', () => setOperation('-'));
multiplyKey.addEventListener('click', () => setOperation('*'));
divideKey.addEventListener('click', () => setOperation('/'));

equalKey.addEventListener('click', () => {
	equalFunction();
	lastWasEqual = true;
	firstClickOnOperation = false;
});

decimalKey.addEventListener('click', () => createNumber('.'));

zeroKey.addEventListener('click', () => createNumber('0'));
oneKey.addEventListener('click', () => createNumber('1'));
twoKey.addEventListener('click', () => createNumber('2'));
threeKey.addEventListener('click', () => createNumber('3'));
fourKey.addEventListener('click', () => createNumber('4'));
fiveKey.addEventListener('click', () => createNumber('5'));
sixKey.addEventListener('click', () => createNumber('6'));
sevenKey.addEventListener('click', () => createNumber('7'));
eightKey.addEventListener('click', () => createNumber('8'));
nineKey.addEventListener('click', () => createNumber('9'));

function callFunction(event) {
	const key = `${event.keyCode}`;

	switch (key) {
		case '96':
			createNumber('0');
			break;
		case '97':
			createNumber('1');
			break;
		case '98':
			createNumber('2');
			break;
		case '99':
			createNumber('3');
			break;
		case '100':
			createNumber('4');
			break;
		case '101':
			createNumber('5');
			break;
		case '102':
			createNumber('6');
			break;
		case '103':
			createNumber('7');
			break;
		case '104':
			createNumber('8');
			break;
		case '105':
			createNumber('9');
			break;
		case '67':
			clearFunction();
			break;
		case '110':
			createNumber('.');
			break;
		case '8':
			backspaceFunction();
			break;
		case '107':
			setOperation('+');
			break;
		case '109':
			setOperation('-');
			break;
		case '106':
			setOperation('*');
			break;
		case '111':
			setOperation('/');
			break;
		case '13':
			equalFunction();
			lastWasEqual = true;
			firstClickOnOperation = false;
			break;
		case '32':
			changeSignFunction();
			break;
	}
}

window.addEventListener('keydown', callFunction);
