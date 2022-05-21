import Doctor from "./Doctor";
import VaccintationCenter from "./VaccinationCenter";

export default class TimeSlot
{
    _id;
    _from;
    _to;
    _isFree;
    _vaccinationCenter;
    _doctor;

    constructor(timeSlot)
    {
        this._id = timeSlot.id;
        this._from = timeSlot.from;
        this._to = timeSlot.to;
        this._isFree = timeSlot.isFree;
        this._vaccinationCenter = new VaccintationCenter(timeSlot);
        this._doctor = new Doctor(timeSlot);
    }

    get getId() { return this._id; }
    set setId(id) { this._id = id; }

    get getFrom() { return this._from; }
    set setFrom(from) { this._from = from; }

    get getTo() { return this._to; }
    set setTo(to) { this._to = to; }

    get getIsFree() { return this._isFree; }
    set setIsFree(isFree) { this._isFree = isFree; }
    
    get getDoctor() { return this._doctor; }
    set setDoctor(doctor) { this._doctor = new Doctor(doctor); }

    get getVaccinationCenter() { return this._vaccinationCenter; }
    set setVaccinationCenter(center) { this._vaccinationCenter = new VaccintationCenter(center); }

    toTableData() {
        const NA = "NA";
        let result = [];

        this._id 
        ? result = [...result, {timeSlotId: this._id}] 
        : result = [...result, {timeSlotId: NA}];

        this._from 
        ? result = [...result, {from: this._from}] 
        : result = [...result, {from: NA}];

        this._to 
        ? result = [...result, {to: this._to}] 
        : result = [...result, {to: NA}];
        
        this._isFree 
        ? result = [...result, {isFree: this._isFree}] 
        : result = [...result, {isFree: NA}];

        result = [...result, ...this._doctor.toTableData(), ...this._vaccinationCenter.toTableData()];
    }
}