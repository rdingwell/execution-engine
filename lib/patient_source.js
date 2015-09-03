(function() {
DT = require("cql-execution").datatypes

var Claimant = function(json) {
    this.__json = json
    console.log(json)
    this.name = json.name
    this.service = [];
    for (var i = 0; i < (json.service || []).length; i++) {
        this.service.push(new Service(json.service[i]));
    }
    this.id = function(){this.name}
    this.findRecords = function(type){
        console.log("PS "+type)
        console.log(this.service)
        if(type == "Claimant"){
            return [this];
        }
        if(type == "Service"){
           return this.service; 
       }else{
        return []
       }
    }
}

var Service = function(json) {
    this.__json = json
    this.EOD = DT.DateTime.parse((json.EOD || ""))
    this.RAD = DT.DateTime.parse((json.RAD || ""))
    this.character = json.character
    this.separationReason = json.separationReason
    this.training = []
    for (var i = 0; i < (json.training || []).length; i++) {
        var train = json.traning[i]
        this.training.push({
            STD: DT.DateTime.parse((train.STD || "")),
            ETD: DT.DateTime.parse((train.EDT || ""))
        });
    }
}

function PatientSource(patients) {
    this.patients = patients;
    this.nextPatient();
}

PatientSource.prototype.currentPatient = function() {
    return this.current_patient;
}

PatientSource.prototype.nextPatient = function() {
    var current = this.patients.shift();
    this.current_patient = current ? new Claimant(current) : void 0;
    return this.current_patient;
}


module.exports.PatientSource = PatientSource;
}).call(this);