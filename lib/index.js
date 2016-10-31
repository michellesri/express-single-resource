const express = require('express');
const app = express();
const path = require('path');
const fs = require('../fsFuncs');

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

app.get('/cities', (req, res) => {
    fs.getFileList(req, res);
});

app.get('/cities/:id', (req, res) => {
    fs.getOneFile(req, res);
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