/* eslint-disable no-console */
const express = require('express');
const shortid = require('shortid');

const router = express.Router();
const urls = require('./url_data');

router.get('/', (req, res) => {
    const urlList = [];
    Object.keys(urls).forEach((url) => {
        urlList.push({ id: url, longUrl: urls[url] });
    });
    res.status(200).send(urlList);
});

module.exports = router;
