class Patient extends User
{
    _vaccinationCount;
    _vaccinationHistory;
    _futureVaccinations;
    _certificates;
    _active;

    constructor(id,pesel,firstName,lastName,dateOfBirth,mail,phoneNumber,vaccinationCount,vaccinationHistory,futureVaccinations,certificates,active)
    {
        super(id,pesel,firstName,lastName,dateOfBirth,mail,phoneNumber);
        this._vaccinationCount = vaccinationCount;
        this._vaccinationHistory = vaccinationHistory;
        this._futureVaccinations = futureVaccinations;
        this._certificates = certificates;
        this._active = active;
    }

    constructor(patient)
    {
        super(patient.id,patient.pesel,patient.firstName,patient.lastName,patient.dateOfBirth,patient.mail,patient.phoneNumber);
        this._vaccinationCount = patient.vaccinationCount;
        this._vaccinationHistory = patient.vaccinationHistory;
        this._futureVaccinations = patient.futureVaccinations;
        this._certificates = patient.certificates;
        this._active = patient.active;
    }

    get getVaccinationCount() { return this._vaccinationCount; }
    set setVaccinationCount(vaccinationCount) { this._vaccinationCount = vaccinationCount; }

    get getVaccinationHistory() { return this._vaccinationHistory; }
    set setVaccinationHistory(vaccinationHistory) { this._vaccinationHistory =  vaccinationHistory; }
    
    get getFutureVaccinations() { return this._futureVaccinations; }
    set setFutureVaccinations(futureVaccinations) { this._futureVaccinations = futureVaccinations; }

    get getCertificates() { return this._certificates; }
    set setCertificates(certificates) { this._certificates = certificates; }

    get getActive() { return this._active; }
    set setActive(active) { this._active = active; }
}