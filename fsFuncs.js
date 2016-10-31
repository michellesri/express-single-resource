const sander = require('sander');
const parseUrl = require('url').parse;
const qsParse = require('querystring').parse;
const path = require('path');

function getFileList(req, res) {
    let pathname = parseUrl(req.url).pathname;
    sander.readdir(`.${pathname}`)
        .then((result) => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(`${result}`);
            res.end();
        })
        .catch((err) => {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(err.message);
            res.end();
        });
}

function getOneFile(id) {
    // let url = parseUrl(req.url);
    // let pathname = parseUrl(req.url).pathname;
    // let query = qsParse(url.query);

    let pathname = path.join(__dirname, '/cities/');
    console.log('id from fsFunc: ', id);
    console.log('pathname: ', pathname);
    // sander.readFile(pathname + id)
        // .then((result) => {
        //     res.writeHead(200, {'Content-Type': 'text/plain'});
        //     res.write(`${result}`);
        //     res.end();
        // })
        // .catch((err) => {
        //     res.writeHead(400, {'Content-Type': 'text/plain'});
        //     res.write(err.message);
        //     res.end();
        // });
    return sander.readFile(pathname + id + '.txt');
}

function createFile(req, res, filename, data) {
    sander.writeFile('./cities', filename, data)
        .then(() => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(`Successfully created file ${filename} in \'cities\' directory.`);
            res.end();
        })
        .catch((err) => {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(err.message);
            res.end();
        });
}

function replaceFile(req, res, filename, data) {
    sander.writeFile('./cities', filename, data + ' second copy')
        .then(() => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(`File ${filename} was successfully replaced.`);
            res.end();
        })
        .catch((err) => {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(err.message);
            res.end();
        });
}

function deleteFile(req, res) {
    let url = parseUrl(req.url);
    let pathname = parseUrl(req.url).pathname;
    let query = qsParse(url.query);
    sander.unlink(`.${pathname}/${query.name}`)
        .then(() => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(`File ${query.name} successfully deleted.`);
            res.end();
        })
        .catch((err) => {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(err.message);
            res.end();
        });
}

function bodyReader(req, cb) {
    let body = '';

    req.on('data', data => {
        body += data;
    });

    req.on('end', () => {
        try {
            cb(null, JSON.parse(body));
        }
        catch (err) {
            cb(err);
        }
    });
}

module.exports = {getFileList, getOneFile, createFile, replaceFile, deleteFile, bodyReader};