(function() {
DT = require("cql-execution")

var Claimant = function(json) {
    this.__json = json
    this.name = json.name
    this.character = json.character
    this.separationReason = json.separationReason
    this.service = [];
    for (var i = 0; i < (json.service || []).length; i++) {
        this.service.push(new Service(json.service[i]));
    }
    this.training = []
    for (var i = 0; i < (json.training || []).length; i++) {
        this.training.push(new Training(json.training[i]));
    }

    this.id = function(){return this.name}
    this.findRecords = function(type){
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

var Training = function(json){
    this.__json = json
    this.STD = (json.STD) ?  DT.DateTime.parse(json.STD) : null
    this. ETD = (json.ETD) ? DT.DateTime.parse(json.ETD) : null 
}

var Result = function(){

}

var Service = function(json) {
    this.__json = json
    this.EOD = (json.EOD ) ?  DT.DateTime.parse(json.EOD ) : null
    this.RAD = (json.RAD) ? DT.DateTime.parse(json.RAD) : null 
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