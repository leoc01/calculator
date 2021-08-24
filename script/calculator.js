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
let screenNumber = 0;
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

//start function declarations
const updateScreen = (newScreenNumber) => {
	screen.innerHTML = newScreenNumber;
};

const addFunction = (x, y) => {
	return x + y;
};

const subtractFunction = (x, y) => {
	return x - y;
};

const multiplyFunction = (x, y) => {
	return x * y;
};

const divideFunction = (x, y) => {
	return x / y;
};

const createNumber = (pressed) => {
	if (!error) {
		if (lastWasEqual) {
			clearFunction();
			lastWasEqual = false;
		}

		if (newNumber === true) {
			screenNumber = 0;
			newNumber = false;
		}

		screenNumber = parseInt(`${screenNumber.toString()}${pressed}`);
		y = screenNumber;
		updateScreen(screenNumber);
		firstClickOnOperation = true;
	}
};

const setOperation = (key) => {
	lastWasEqual = false;

	if (firstClickOnOperation && operation !== 'null') {
		equalFunction();
		firstClickOnOperation = false;
	}

	x = screenNumber;
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

const clearFunction = () => {
	error = false;
	x = 0;
	y = 0;
	screenNumber = 0;
	newNumber = true;
	operation = 'null';
	updateScreen(screenNumber);
	firstClickOnOperation = true;
};

const equalFunction = () => {
	if (!error) {
		let result = doTheMath();

		if (result === Infinity) {
			result = 'error';
			error = true;
		}

		x = result;
		screenNumber = result;
		updateScreen(screenNumber);
		newNumber = true;

		firstClickOnOperation = true;
	}
};

const backspaceFunction = () => {
	if (!error) {
		screenNumber = parseInt(`${screenNumber.toString()}`.slice(0, -1));
		if (isNaN(screenNumber)) {
			screenNumber = 0;
		}
		y = screenNumber;
		updateScreen(screenNumber);
	}
};

const changeSignFunction = () => {
	if (!error) {
		x = screenNumber;
		x = -x;
		screenNumber = x;
		updateScreen(screenNumber);
	}
};

//start creating event listeners
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
