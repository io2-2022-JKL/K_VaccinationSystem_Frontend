class Doctor extends User 
{
    _vaccinationCenter;
    _futureVaccinations;
    _vaccinationArchieve;
    _active;

    constructor(id,pesel,firstName,lastName,dateOfBirth,mail,password,phoneNumber,vaccinationCenter,futureVaccinations,vaccinationArchieve,active)
    {
        super(id,pesel,firstName,lastName,dateOfBirth,mail,password,phoneNumber);
        this._vaccinationCenter = vaccinationCenter;
        this._futureVaccinations = futureVaccinations;
        this._vaccinationArchieve = vaccinationArchieve;
        this._active = active;
    }

    get getVaccinationCenter() { return this._vaccinationCenter; }
    set setVaccinationCenter(vaccinationCenter) { this._vaccinationCenter = vaccinationCenter; }

    get getFutureVaccinations() { return this._futureVaccinations; }
    set setFutureVaccinations(futureVaccinations) { this._futureVaccinations = futureVaccinations; }
    
    get getVaccinationArchieve() { return this._vaccinationArchieve; }
    set setVaccinationArchieve(vaccinationArchieve) { this._vaccinationArchieve = vaccinationArchieve; }

    get getActive() { return this._active; }
    set setActive(active) { this._active = active; }
}