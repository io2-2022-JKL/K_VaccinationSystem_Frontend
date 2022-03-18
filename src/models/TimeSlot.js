class TimeSlot
{
    _from;
    _to;
    _doctor;
    _isFree;
    _active;

    constructor(from,to,doctor,isFree,active)
    {
        this._from = from;
        this._to = to;
        this._doctor = doctor;
        this._isFree = isFree;
        this._active = active;
    }

    get getFrom() { return this._from; }
    set setFrom(from) { this._from = from; }

    get getTo() { return this._to; }
    set setTo(to) { this._to = to; }
    
    get getdoctor() { return this._doctor; }
    set setdoctor(doctor) { this._doctor = doctor; }

    get getIsFree() { return this._isFree; }
    set setIsFree(isFree) { this._isFree = isFree; }

    get getActive() { return this._active; }
    set setActive(active) { this._active = active; }
}