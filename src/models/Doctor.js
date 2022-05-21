import User from "./User";
import VaccinationCenter from "./VaccinationCenter";

export default class Doctor extends User 
{
    _doctorId;
    _vaccinationCenter;

    constructor(doctor)
    {
        super(doctor);
        this._doctorId = doctor.id ? doctor.id : doctor.doctorId;
        this._vaccinationCenter = new VaccinationCenter(doctor);
    }

    get getId() { return this._id; }
    set setid(id) { this._id = id; }

    get getVaccinationCenter() { return this._vaccinationCenter; }
    set setVaccinationCenter(vaccinationCenter) { this._vaccinationCenter = new VaccinationCenter(vaccinationCenter) }

    get getUserAccount() { return this._userAccount; }
    set setUserAccount(userAccount) { this._userAccount = new User(userAccount); }

    toTableData() {
        let result = [];
        if (this._id) result = [{doctorId: this._id}];
        result = [...result, ...super.toTableData(), ...this._vaccinationCenter.toTableData()];
        return result;
    }
}