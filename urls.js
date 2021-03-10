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

router.post('/', (req, res) => {
    const id = shortid.generate();
    urls[id] = req.body.longUrl;
    res.status(201).send({ id });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const longUrl = urls[id];
    console.log(longUrl);
    if (longUrl) {
        return res.status(200).send({ id, longUrl });
    }
    return res.status(404).send('Url with given short id not found!');
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const longUrl = urls[id];
    console.log(id);
    if (longUrl) {
        delete urls[id];
        res.status(201).send('Deletion successful!');
    } else {
        return res.status(404).send('Url with given short id not found!');
    }
});

module.exports = router;
