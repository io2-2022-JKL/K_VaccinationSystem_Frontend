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

    get getPatients() { return this._patients; }
    set setPatients(patients) { this._patients = patients; }

    get getVaccinationCenters() { return this._vaccinationCenters; }
    set setVaccinationCenters(vaccinationCenters) { this._vaccinationCenters = vaccinationCenters; }
    
    get getDoctors() { return this._doctors; }
    set setDoctors(doctors) { this._doctors = doctors; }

    get getVaccines() { return this._vaccines; }
    set setVaccines(vaccines) { this._vaccines = vaccines; }
}