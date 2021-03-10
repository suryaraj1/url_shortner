/* eslint-disable no-console */
const input = document.querySelector('.input');
const outputForm = document.querySelector('.output-form');
const output = document.querySelector('.output');
const shortenBtn = document.querySelector('.btn');

const isValidUrl = (url) => url.protocol === 'http:' || url.protocol === 'https:';

shortenBtn.addEventListener('click', () => {
    const url = input.value;
    if (!isValidUrl(new URL(url))) {
        outputForm.classList.add('active');
        output.value = 'Please, provide a valid url';
        setTimeout(() => {
            outputForm.classList.remove('active');
            output.value = '';
        }, 2000);
    } else {
        fetch('./api/urls', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                longUrl: url,
            }),
        })
            .then((resp) => resp.json())
            .then((json) => {
                const shortUrl = `${document.location.origin}/${json.id}`;
                output.value = shortUrl;
            });
    }
});
