var express = require('express');
var cql = require('cql-execution');
var ps = require('../lib/patient_source')
var measure = require('cql-execution/lib/example/age')
LibraryManager = require("cql-library-manager").LibraryManager
var router = express.Router();
console.log(require('../lib/patient_source'))
router.post('/:library/:version', function(req, res, next) {
  debugger;
  manager = new LibraryManager("./cql_libraries");
  var lib = manager.resolve(req.params.library, req.params.version);
  console.log(req)
  psource = new ps.PatientSource([{"name":"ted", "service":[{
  "EOD": "2000-01-01",
  "RAD": "2000-01-01",
  "character": "",
  "separationReason": "",
  "training":[
    {"STD": "2000-01-01",
    "EDT": "2000-01-01"},
     {"STD": "2000-01-01",
    "EDT": "2000-01-01"}
    ]
},
{
  "EOD": "2000-01-01",
  "RAD": "2000-01-01",
  "character": "",
  "separationReason": "",
  "training":[
    {"STD": "2000-01-01",
    "EDT": "2000-01-01"},
     {"STD": "2000-01-01",
    "EDT": "2000-01-01"}
    ]
}
]}]);
  executor = new cql.Executor(lib);
  result = executor.exec(psource);
  res.send(JSON.stringify(result, undefined, 2))
});

module.exports = router;
