const express = require('express');
const app = express();
const path = require('path');
const parseUrl = require('url').parse;
const qsParse = require('querystring').parse;
const fs = require('../fsFuncs');

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

// let url = parseUrl(req.url);
// let pathname = parseUrl(req.url).pathname;
// let query = qsParse(url.query);

// var pathname = '/cities';

app.get('/cities', (req, res) => {
    fs.getFileList(req, res);
});

app.get('/cities/:id', (req, res) => {
    console.log('id route');
    console.log('req.params:', req.params.id);
    let id = req.params.id;
    fs.getOneFile(id)
        .then((file) => {
            res.send(file);
        })
        .catch((err) => {
            res.send('err: ', err);
        });
        //catch promise here
});

app.post('/cities', (req, res) => {
    fs.bodyReader(req, (err, data) => {
        fs.createFile(req, res, data.name + '.txt', data.name);
    });
});

app.put('/cities', (req, res) => {
    fs.bodyReader(req, (err, data) => {
        fs.replaceFile(req, res, data.name + '.txt', data.name);
    });
});

app.delete('/cities/:id', (req, res) => {
    fs.deleteFile(req, res);
});

module.exports = app;