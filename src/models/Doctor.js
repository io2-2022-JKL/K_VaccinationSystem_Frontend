import User from "./User";
import VaccinationCenter from "./VaccinationCenter";

export default class Doctor extends User 
{
    _vaccinationCenter;

    constructor(doctor)
    {
        super(doctor);
        this._vaccinationCenter = new VaccinationCenter(doctor);
    }

    get getVaccinationCenter() { return this._vaccinationCenter; }
    set setVaccinationCenter(vaccinationCenter) { this._vaccinationCenter = new VaccinationCenter(vaccinationCenter) }

    get getUserAccount() { return this._userAccount; }
    set setUserAccount(userAccount) { this._userAccount = new User(userAccount); }

    toTableData(listOfColumns) {
        let result = [];
        result = [...super.toTableData(listOfColumns), ...this._vaccinationCenter.toTableData(listOfColumns)];
        return result;
    }
}