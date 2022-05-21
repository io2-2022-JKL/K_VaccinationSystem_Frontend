export default class VaccintationCenter
{
    _id;
    _name;
    _city;
    _address;
    _availableVaccines;
    _openingHours;
    _active;
  
    constructor(vaccintationCenter)
    {
        this._id = vaccintationCenter.id; 
        this._name = vaccintationCenter.name ? vaccintationCenter.name : vaccintationCenter.centerName;
        if (!this._name) this._name = vaccintationCenter.vaccinationCenterName;
        this._city = vaccintationCenter.city ? vaccintationCenter.city : vaccintationCenter.centerCity;
        if (!this._city) this._city = vaccintationCenter.vaccinationCenterCity;
        this._address = vaccintationCenter.street ? vaccintationCenter.street : vaccintationCenter.centerStreet;
        if (!this._address) this._address = vaccintationCenter.vaccinationCenterStreet;
        this._availableVaccines = vaccintationCenter.vaccines.map((vac) => new Vaccine(vac));
        this._openingHours = vaccintationCenter.openingHours;
        this._active = vaccintationCenter.active;
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
}