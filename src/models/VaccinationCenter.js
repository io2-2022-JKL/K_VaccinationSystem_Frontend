class VaccintationCenter
{
    _id;
    _name;
    _city;
    _address;
    _availableVaccines;
    _openingHours;
    _closingHours;
    _doctors;
    _active;

    constructor(id,name,city,address,availableVaccines,openingHours,closingHours,doctors,active)
    {
        this._id = id; 
        this._name = name;
        this._city = city;
        this._address = address;
        this._availableVaccines = availableVaccines;
        this._openingHours = openingHours;
        this._closingHours = closingHours;
        this._doctors = doctors;
        this._active = active;
    }

    constructor(vaccintationCenter)
    {
        this._id = vaccintationCenter.id; 
        this._name = vaccintationCenter.name;
        this._city = vaccintationCenter.city;
        this._address = vaccintationCenter.address;
        this._availableVaccines = vaccintationCenter.availableVaccines;
        this._openingHours = vaccintationCenter.openingHours;
        this._closingHours = vaccintationCenter.closingHours;
        this._doctors = vaccintationCenter.doctors;
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