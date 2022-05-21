export default class Vaccine
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
    _batchNumber;

    constructor(vaccine)
    {
        this._id = vaccine.id ? vaccine.id : vaccine.vaccineId;
        this._name = vaccine.name ? vaccine.name : vaccine.vaccineName;
        this._company = vaccine.company ? vaccine.company : vaccine.vaccineCompany;
        if (!this._company) this._company = vaccine.companyName;
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

    toTableData(listOfColumns) {
        const NA = "NA";
        let result = [];
        listOfColumns.map((column) => {
            switch(column.accessor) {
                case "vaccineName":
                    this._name 
                    ? result = [...result, { vaccineName: this._name }] 
                    : result = [...result, { vaccineName: NA }];
                    break;
                case "name":
                    this._name 
                    ? result = [...result, { name: this._name }] 
                    : result = [...result, { name: NA }];
                    break;
                case "vaccineCompany":
                    this._company 
                    ? result = [...result, { vaccineCompany: this._company }] 
                    : result = [...result, { vaccineCompany: NA }];
                    break;
                case "company":
                    this._company 
                    ? result = [...result, { company: this._company }] 
                    : result = [...result, { company: NA }];
                    break;
                case "vaccineVirus":
                    this._virus 
                    ? result = [...result, { vaccineVirus: this._virus }] 
                    : result = [...result, { vaccineVirus: NA }];
                    break;
                case "virus":
                    this._virus 
                    ? result = [...result, { virus: this._virus }] 
                    : result = [...result, { virus: NA }];
                    break;
                case "numberOfDoses":
                    this._numberOfDoses 
                    ? result = [...result, { numberOfDoses: this._numberOfDoses }] 
                    : result = [...result, { numberOfDoses: NA }];
                    break;
                case "minDaysBetweenDoses":
                    this._minDaysBetweenDoses 
                    ? result = [...result, { minDaysBetweenDoses: this._minDaysBetweenDoses }] 
                    : result = [...result, { minDaysBetweenDoses: NA }];
                    break;
                case "maxDaysBetweenDoses":
                    this._maxDaysBetweenDoses 
                    ? result = [...result, { maxDaysBetweenDoses: this._maxDaysBetweenDoses }] 
                    : result = [...result, { maxDaysBetweenDoses: NA }];
                    break;
                case "minPatientAge":
                    this._minPatientAge 
                    ? result = [...result, { minPatientAge: this._minPatientAge }] 
                    : result = [...result, { minPatientAge: NA }];
                    break;
                case "maxPatientAge":
                    this._maxPatientAge 
                    ? result = [...result, { maxPatientAge: this._maxPatientAge }] 
                    : result = [...result, { maxPatientAge: NA }];
                    break;
                case "active":
                    this._active 
                    ? result = [...result, { active: this._active }] 
                    : result = [...result, { active: NA }];
                    break;
                case "batchNumber":
                    this._batchNumber 
                    ? result = [...result, { batchNumber: this._batchNumber }] 
                    : result = [...result, { batchNumber: NA }];
                    break;
                case "id":
                    this._id 
                    ? result = [...result, { id: this._id }] 
                    : result = [...result, { id: NA }];
                    break;
                case "vaccineId":
                    this._id 
                    ? result = [...result, { vaccineId: this._id }] 
                    : result = [...result, { vaccineId: NA }];
                    break;
            }
        })
        return result;
    }
}