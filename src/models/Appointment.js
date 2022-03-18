class Appointment
{
    _whichDose;
    _timeSlot;
    _patient;
    _vaccine;
    _completed;
    _vaccineBatchNumber;

    constructor(whichDose,timeSlot,patient,vaccine,completed,vaccineBatchNumber)
    {
        this._whichDose = whichDose;
        this._timeSlot = timeSlot;
        this._patient = patient;
        this._vaccine = vaccine;
        this._completed = completed;
        this._vaccineBatchNumber = vaccineBatchNumber;
    }

    get getWhichDose() { return this._whichDose; }
    set setWhichDose(whichDose) { this._whichDose = whichDose; }

    get getTimeSlot() { return this._timeSlot; }
    set setTimeSlot(timeSlot) { this._timeSlot = timeSlot; }
    
    get getPatient() { return this._patient; }
    set setPatient(patient) { this._patient = patient; }

    get getVaccine() { return this._vaccine; }
    set setVaccine(vaccine) { this._vaccine = vaccine; }

    get getCompleted() { return this._completed; }
    set setCompleted(completed) { this._completed = completed; }

    get getVaccineBatchNumber() { return this._vaccineBatchNumber; }
    set setVaccineBatchNumber(vaccineBatchNumber) { this._vaccineBatchNumber = vaccineBatchNumber; }
}