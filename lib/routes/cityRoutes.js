const express = require('express');
const router = express.Router();
// const crudHandler = require('../crudHandler.js');
const bodyparser = require('../bodyparser');
const City = require('../models/city');

module.exports = router

.get('/', (req, res, next) => {
  const query = {};
  console.log('req.query: ', req.query);

  if(req.query.name) query.name = req.query.name;

  City.find(query)
    .then(city => res.send(city))
    .catch(next);
  // crudHandler.getFileList()
  //       .then((files) => {
  //         res.writeHead(200, {'Content-Type': 'text/plain'});
  //         files.forEach(file => {
  //           res.write(file + '\n');
  //         });
  //         res.end();
  //       })
  //       .catch(next);
})
.get('/numberofsanjoses', (req, res, next) => {
  console.log('mynewpathfires');
  City.find()
  .where('name', 'san jose')
  .exec((err, data) => {
    if(err) {
      console.log('err in mynewpath: ', err);
      next(err);
    }
    else {
      res.send(200, data.length);
    }
  });
})

.get('/:id', (req, res, next) => {
  let id = req.params.id;
  City.findById(id)
    .then(city => res.send(city))
    .catch(next);
})

.post('/', bodyparser, (req, res, next) => {
  new City(req.body).save()
    .then(saved => res.send(saved))
    .catch(next);
  // crudHandler.createFile(req.body.name, req.body.name)
  //         .then(() => {
  //           res.writeHead(200, {'Content-Type': 'text/plain'});
  //           res.write(`File ${req.body.name}.txt successfully created in \'cities\' directory.`);
  //           res.end();
  //         })
  //         .catch((error) => {
  //           let errObj = {};
  //           errObj.code = 500;
  //           errObj.message = 'Internal server error';
  //           errObj.error = error;
  //           next(errObj);
  //         });
})

.put('/:id', bodyparser, (req, res, next) => {
  City.findByIdAndUpdate(req.params.id, req.body)
    .then(saved => res.send(saved))
    .catch(next);
  // //get req.params TODO
  // crudHandler.replaceFile(req.body.name, req.body.name)
  //   .then(() => {
  //     res.writeHead(200, {'Content-Type': 'text/plain'});
  //     res.write(`File ${req.body.name}.txt successfully replaced.`);
  //     res.end();
  //   })
  //   .catch(next);
})

.delete('/:id', (req, res, next) => {
  City.removeById(req.params.id)
    .then(saved => res.send(saved))
    .catch(next);
  // let id = req.params.id;
  // crudHandler.deleteFile(id)
  //       .then(() => {
  //         res.writeHead(200, {'Content-Type': 'text/plain'});
  //         res.write(`File ${id}.txt successfully deleted.`);
  //         res.end();
  //       })
  //       .catch(next);
});
