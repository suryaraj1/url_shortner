/* eslint-disable no-console */
const express = require('express');
const api = require('./api');

const app = express();
const port = process.env.PORT || 3000;

const url = require('./url_data');

app.use(express.json());
app.use('/api', api);
app.use('/users', express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello node');
});

app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});
