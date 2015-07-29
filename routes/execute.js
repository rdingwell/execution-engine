var express = require('express');
var cql = require('cql-execution');
var measure = require('cql-execution/lib/example/age')
var router = express.Router();

router.get('/', function(req, res, next) {
  var lib = new cql.Library(measure);
  psource = new cql.PatientSource([ {
                            "resourceType": "Bundle",
                            "id": "example1",
                            "meta": {
                              "versionId": "1",
                              "lastUpdated": "2014-08-18T01:43:30Z"
                            },
                            "base": "http://example.com/base",
                            "entry" : [{
                                  "resource": {
                                  "id" : "1",
                                  "meta" :{ "profile" : ["patient-qicore-qicore-patient"]},
                                  "resourceType" : "Patient",
                                  "identifier": [{ "value": "1" }],
                                  "name": {"given":["John"], "family": ["Smith"]},
                                  "gender": "M",
                                  "birthDate" : "1980-02-17T06:15"}
                                  }
                            ]
                          } ]);
  executor = new cql.Executor(lib);
  result = executor.exec(psource);
  res.send(JSON.stringify(result, undefined, 2))
});

module.exports = router;
