/* eslint-disable no-console */
const input = document.querySelector('.input');
const outputForm = document.querySelector('.output-form');
const output = document.querySelector('.output');
const tableBody = document.querySelector('.table-body');
const shortenBtn = document.querySelector('.btn');

let countUrls = 0;

// refL https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url

const isValidUrl = (inputUrl) => {
    let url;
    try {
        url = new URL(inputUrl);
    } catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
};

shortenBtn.addEventListener('click', () => {
    const url = input.value;
    if (!isValidUrl(url)) {
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
                countUrls += 1;
                const row = document.createElement('tr');
                const idNumber = document.createElement('td');
                const longUrlCell = document.createElement('td');
                const shortUrlCell = document.createElement('td');
                longUrlCell.innerHTML = url;
                shortUrlCell.innerHTML = shortUrl;
                idNumber.innerHTML = countUrls;
                row.appendChild(idNumber);
                row.appendChild(longUrlCell);
                row.appendChild(shortUrlCell);
                tableBody.appendChild(row);
            });
    }
});
