import Vaccine from "./Vaccine";

export default class VaccintationCenter
{
    _id;
    _name;
    _city;
    _address;
    _availableVaccines;
    _openingHours;
    _active;
  
    constructor(vaccinationCenter)
    {
        this._id = vaccinationCenter.id ? vaccinationCenter.id : vaccinationCenter.vaccinationCenterId;
        this._name = vaccinationCenter.name ? vaccinationCenter.name : vaccinationCenter.centerName;
        if (!this._name) this._name = vaccinationCenter.vaccinationCenterName;
        this._city = vaccinationCenter.city ? vaccinationCenter.city : vaccinationCenter.centerCity;
        if (!this._city) this._city = vaccinationCenter.vaccinationCenterCity;
        this._address = vaccinationCenter.street ? vaccinationCenter.street : vaccinationCenter.centerStreet;
        if (!this._address) this._address = vaccinationCenter.vaccinationCenterStreet;
        if (vaccinationCenter.vaccines) this._availableVaccines = vaccinationCenter.vaccines.map((vac) => new Vaccine(vac));
        this._openingHours = vaccinationCenter.openingHours;
        this._active = vaccinationCenter.active;
    }
    
    get getId() { return this._id; }
    set setId(id) { this._id = id; }
    
    get getName() { return this._name; }
    set setName(name) { this._name = name; }

    get getCity() { return this._city; }
    set setCity(city) { this._city = city; }

    get getAddress() { return this._address; }
    set setAddress(address) { this._address = address; }

    get getAvailableVaccines() { return this._availableVaccines; }
    set setAvailableVaccines(availableVaccines) { this._availableVaccines = availableVaccines; }

    get getOpeningHours() { return this._openingHours; }
    set setOpeningHours(openingHours) { this._openingHours = openingHours; }

    get getClosingHours() { return this._closingHours; }
    set setClosingHours(closingHours) { this._closingHours = closingHours; }

    get getDoctors() { return this._doctors; }
    set setDoctors(doctors) { this._doctors = doctors; }

    get getActive() { return this._active; }
    set setActive(active) { this._active = active; }

    toTableData() {
        const NA = "NA";
        let result = new Object();

        this._name 
        ? result.name = this._name
        : result.name = NA

        this._city 
        ? result.city = this._city
        : result.city = NA

        this._address 
        ? result.street = this._address
        : result.street = NA

        this._active 
        ? result.active = true
        : result.active = false

        this._id 
        ? result.id = this._id
        : result.id = NA
        
        return result;
    }
}