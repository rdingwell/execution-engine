var express = require('express');
var cql = require('cql-execution');
var measure = require('cql-execution/lib/example/age')
LibraryManager = require("cql-library-manager").LibraryManager
var router = express.Router();

router.post('/:library/:version', function(req, res, next) {
  manager = new LibraryManager("./cql_libraries");
  var lib = manager.resolve(req.params.library, req.params.version);
  psource = new cql.PatientSource(req.body);
  executor = new cql.Executor(lib);
  result = executor.exec(psource);
  res.send(JSON.stringify(result, undefined, 2))
});

module.exports = router;
