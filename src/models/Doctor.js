export default class Doctor extends User 
{
    _vaccinationCenter;
    _futureVaccinations;
    _vaccinationArchieve;
    _active;

    constructor(doctor)
    {
        user = new Object();
        user.id = doctor.id;
        user.pesel = doctor.pesel;
        user.firstName = doctor.firstName;
        user.lastName = doctor.lastName;
        user.dateOfBirth = doctor.dateOfBirth;
        user.mail = doctor.mail;
        user.phoneNumber = doctor.phoneNumber;
        super(user);
        this._vaccinationCenter = doctor.vaccinationCenter;
        this._futureVaccinations = doctor.futureVaccinations;
        this._vaccinationArchieve = doctor.vaccinationArchieve;
        this._active = doctor.active;
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

export function createDoctor(id,pesel,firstName,lastName,dateOfBirth,mail,phoneNumber,vaccinationCenter,futureVaccinations,vaccinationArchieve,active)
{
    doctor = new Object(),
    doctor.id = id;
    doctor.pesel = pesel;
    doctor.firstName = firstName;
    doctor.lastName = lastName;
    doctor.dateOfBirth = dateOfBirth;
    doctor.mail = mail;
    doctor.phoneNumber = phoneNumber;
    doctor.vaccinationCenter = vaccinationCenter;
    doctor.futureVaccinations = futureVaccinations;
    doctor.vaccinationArchieve = vaccinationArchieve;
    doctor.active = active;
    return new Doctor(doctor);
}