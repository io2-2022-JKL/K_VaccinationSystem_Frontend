class Server
{
    _patients;
    _vaccinationCenters;
    _doctors;
    _vaccines;

    constructor(patients,vaccinationCenters,doctors,vaccines)
    {
        this._patients = patients;
        this._vaccinationCenters = vaccinationCenters;
        this._doctors = doctors;
        this._vaccines = vaccines;
    }

    constructor(server)
    {
        this._patients = server.patients;
        this._vaccinationCenters = server.vaccinationCenters;
        this._doctors = server.doctors;
        this._vaccines = server.vaccines; 
    }

    get getPatients() { return this._patients; }
    set setPatients(patients) { this._patients = patients; }

    get getVaccinationCenters() { return this._vaccinationCenters; }
    set setVaccinationCenters(vaccinationCenters) { this._vaccinationCenters = vaccinationCenters; }
    
    get getDoctors() { return this._doctors; }
    set setDoctors(doctors) { this._doctors = doctors; }

    get getVaccines() { return this._vaccines; }
    set setVaccines(vaccines) { this._vaccines = vaccines; }
}


function createServer(patients,vaccinationCenters,doctors,vaccines)
{
    server = new Object();
    server.patients = patients;
    server.vaccinationCenters = vaccinationCenters;
    server.doctors = doctors;
    server.vaccines = vaccines;
    return new Server(server);
}
