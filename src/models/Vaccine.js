class Vaccine
{
    _id;
    _name;
    _company;
    _virus;
    _numberOfDoses;
    _minDaysBetweenDoses;
    _maxDaysBetweenDoses;
    _minPatientAge;
    _maxPatientAge;
    _active;
    _batchNumber

    constructor(vaccine)
    {
        this._id = vaccine.id ? vaccine.id : vaccine.vaccineId;
        this._name = vaccine.name ? vaccine.name : vaccine.vaccineName;
        this._company = vaccine.company ? vaccine.company : vaccine.vaccineCompany;
        this._virus = vaccine.virus ? vaccine.virus : vaccine.vaccineVirus;
        this._numberOfDoses = vaccine.numberOfDoses;
        this._minDaysBetweenDoses = vaccine.minDaysBetweenDoses;
        this._maxDaysBetweenDoses = vaccine.maxDaysBetweenDoses;
        this._minPatientAge = vaccine.minPatientAge;
        this._maxPatientAge = vaccine.maxPatientAge;
        this._active = vaccine.active;
        this._batchNumber = vaccine._batchNumber;
    }

    get getId() { return this._id; }
    set setId(id) { this._id = id; }
    
    get getName() { return this._name; }
    set setName(name) { this._name = name; }

    get getCompany() { return this._company; }
    set setCompany(company) { this._company = company; }

    get getVirus() { return this._virus; }
    set setVirus(virus) { this._virus = virus; }

    get getNumberOfDoses() { return this._numberOfDoses; }
    set setNumberOfDoses(number) { this._numberOfDoses = number; }

    get getMinDaysBetweenDoses() { return this._minDaysBetweenDoses; }
    set setMinDaysBetweenDoses(minDaysBetweenDoses) { this._minDaysBetweenDoses = minDaysBetweenDoses; }

    get getMaxDaysBetweenDoses() { return this._maxDaysBetweenDoses; }
    set setMaxDaysBetweenDoses(maxDaysBetweenDoses) { this._maxDaysBetweenDoses = maxDaysBetweenDoses; }

    get getMinPatientAge() { return this._minPatientAge; }
    set setMinPatientAge(minPatientAge) { this._minPatientAge = minPatientAge; }

    get getMaxPatientAge() { return this._maxPatientAge; }
    set setMaxPatientAge(maxPatientAge) { this._maxPatientAge = maxPatientAge; }

    get getActive() { return this._active; }
    set setActive(active) { this._active = active; }
}