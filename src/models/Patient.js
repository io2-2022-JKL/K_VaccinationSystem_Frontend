import User from './User';

export default class Patient extends User
{
    constructor(patient)
    {
        var user = new Object();
        user.id = patient.id;
        user.pesel = patient.pesel;
        user.firstName = patient.firstName;
        user.lastName = patient.lastName;
        user.dateOfBirth = patient.dateOfBirth;
        user.mail = patient.mail;
        user.phoneNumber = patient.phoneNumber;
        super(user);
    
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

function createPatient(id,pesel,firstName,lastName,dateOfBirth,mail,phoneNumber,vaccinationCount,vaccinationHistory,futureVaccinations,certificates,active)
{
    var patient = new Object();
    patient.id = id;
    patient.pesel = pesel;
    patient.firstName = firstName;
    patient.lastName = lastName;
    patient.dateOfBirth = dateOfBirth;
    patient.mail = mail;
    patient.phoneNumber = phoneNumber;
    patient.vaccinationCount = vaccinationCount;
    patient.vaccinationHistory = vaccinationHistory;
    patient.futureVaccinations = futureVaccinations;
    patient.certificates = certificates;
    patient.active = active;
    return new Patient(patient);
}