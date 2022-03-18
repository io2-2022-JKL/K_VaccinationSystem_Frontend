class Vaccine
{
    _id;
    _company;
    _name;
    _number;
    _minDaysBetweenDoses;
    _maxDaysBetweenDoses;
    _virus;
    _minPatientAge;
    _maxPatientAge;
    _used;

    constructor(id,company,name,number,minDaysBetweenDoses,maxDaysBetweenDoses,virus,minPatientAge,maxPatientAge,used)
    {
        this._id = id;
        this._company = company;
        this._name = name;
        this._number = number;
        this._minDaysBetweenDoses = minDaysBetweenDoses;
        this._maxDaysBetweenDoses = maxDaysBetweenDoses;
        this._virus = virus;
        this._minPatientAge = minPatientAge;
        this._maxPatientAge = maxPatientAge;
        this._used = used;
    }

    constructor(vaccine)
    {
        this._id = vaccine.id;
        this._company = vaccine.company;
        this._name = vaccine.name;
        this._number = vaccine.number;
        this._minDaysBetweenDoses = vaccine.minDaysBetweenDoses;
        this._maxDaysBetweenDoses = vaccine.maxDaysBetweenDoses;
        this._virus = vaccine.virus;
        this._minPatientAge = vaccine.minPatientAge;
        this._maxPatientAge = vaccine.maxPatientAge;
        this._used = vaccine.used;
    }

    get getId() { return this._id; }
    set setId(id) { this._id = id; }

    get getCompany() { return this._company; }
    set setCompany(company) { this._company = company; }
    
    get getName() { return this._name; }
    set setName(name) { this._name = name; }

    get getNumber() { return this._number; }
    set setNumber(number) { this._number = number; }

    get getMinDaysBetweenDoses() { return this._minDaysBetweenDoses; }
    set setMinDaysBetweenDoses(minDaysBetweenDoses) { this._minDaysBetweenDoses = minDaysBetweenDoses; }

    get getMaxDaysBetweenDoses() { return this._maxDaysBetweenDoses; }
    set setMaxDaysBetweenDoses(maxDaysBetweenDoses) { this._maxDaysBetweenDoses = maxDaysBetweenDoses; }

    get getVirus() { return this._virus; }
    set setVirus(virus) { this._virus = virus; }

    get getMinPatientAge() { return this._minPatientAge; }
    set setMinPatientAge(minPatientAge) { this._minPatientAge = minPatientAge; }

    get getMaxPatientAge() { return this._maxPatientAge; }
    set setMaxPatientAge(maxPatientAge) { this._maxPatientAge = maxPatientAge; }

    get getUsed() { return this._used; }
    set setUsed(used) { this._used = used; }
}