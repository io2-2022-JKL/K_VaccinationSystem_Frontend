import TimeSlot from "./TimeSlot";
import Vaccine from "./Vaccine";
import User from "./User";

export default class Appointment
{
    _id;
    _vaccine;
    _timeSlot;
    _patient;
    _whichDose;
    _visitState;
    _certifyState;

    constructor(appointment)
    {
        this._timeSlot = new TimeSlot(appointment);
        this._patient = new User(appointment)
        this._vaccine = new Vaccine(appointment)
        this._whichDose = appointment.whichVaccineDose;
        this._visitState = appointment.visitState;
        this._certifyState = appointment.certifyState;
    }

    get getWhichDose() { return this._whichDose; }
    set setWhichDose(whichDose) { this._whichDose = whichDose; }

    get getTimeSlot() { return this._timeSlot; }
    set setTimeSlot(timeSlot) { this._timeSlot = new TimeSlot(timeSlot); }
    
    get getPatient() { return this._patient; }
    set setPatient(patient) { this._patient = new User(patient); }

    get getVaccine() { return this._vaccine; }
    set setVaccine(vaccine) { this._vaccine = new Vaccine(vaccine); }

    get getVisitState() { return this._visitState; }
    set setVisitState(state) { this._visitState = state; }

    get getCertifyState() { return this._certifyState; }
    set setCertifyState(state) { this._certifyState = state; }

    toTableData() {
        const NA = "NA";
        let result = {}

        this._id 
        ? result.appointmentId = this._id
        : result.appointmentId = NA

        this._whichDose 
        ? result.whichDose = this._whichDose
        : result.whichDose = NA

        this._visitState 
        ? result.visitState = this._visitState
        : result.visitState = NA
        
        this._certifyState 
        ? result.certifyState = this._certifyState
        : result.certifyState = NA

        
    }
}