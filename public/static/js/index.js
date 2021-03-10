/* eslint-disable no-console */
const input = document.querySelector('.input');
const outputForm = document.querySelector('.output-form');
const output = document.querySelector('.output');
const shortenBtn = document.querySelector('.btn');

console.log(output);
shortenBtn.addEventListener('click', () => {
    outputForm.classList.add('active');
    output.value = 'Please, provide a valid url';
    setTimeout(() => {
        outputForm.classList.remove('active');
        output.value = '';
    }, 2000);
});
