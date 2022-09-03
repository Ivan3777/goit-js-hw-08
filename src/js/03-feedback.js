import storageAPI from './storage';
var throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');

form.addEventListener('input', handleInput);

form.addEventListener('submit', handleSubmit);

function handleInput (e) {
    const {name, value} = e.target;

    let savedData = storageAPI.load('formKey');
    savedData = savedData ? savedData : {};
    savedData[name] = value;
    storageAPI.save('formKey', savedData);
}

function initPage () {
savedData = storageAPI.load('formKey');
if (!savedData) {
    return;
}
Object.entries(savedData).forEach(([name, value]) => {
    form.elements[name].value = value;
})
}

function handleSubmit (e) {
    e.preventDefault();
    const {
        elements: {email, message}
    } = e.currentTarget;

    console.log({email: email.value, message: message.value});

    e.currentTarget.reset();
    storageAPI.remove('formKey');
}



