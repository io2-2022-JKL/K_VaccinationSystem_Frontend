export default class Appointment
{
    _vaccineName;
    _vaccineCompany;
    _vaccineVirus;
    _whichDose;
    _appointmentId;
    _windowBegin;
    _windowEnd;
    _vaccinationCenterName;
    _vaccinationCenterCity;
    _vaccinationCenterStreet;
    _doctorFirstName;
    _doctorLastName;
    _visitState;
    _certifyState;
    _patientFirstName;
    _patientLastName;
    _patientPesel;
    _vaccineBatchNumber;

    constructor(appointment)
    {
        this._vaccineName = appointment.vaccineName;
        this._vaccineCompany = appointment.vaccineCompany;
        this._vaccineVirus = appointment.vaccineVirus;
        this._whichDose = appointment.whichVaccineDose;
        this._appointmentId = appointment.appointmentId;
        this._windowBegin = appointment.windowBegin ? appointment.windowBegin : appointment.from;
        this._windowEnd = appointment.windowEnd ? appointment.windowEnd : appointment.to;
        this._vaccinationCenterName = appointment.vaccinationCenterName;
        this._vaccinationCenterCity = appointment.vaccinationCenterCity;
        this._vaccinationCenterStreet = appointment.vaccinationCenterStreet;
        this._doctorFirstName = appointment.doctorFirstName;
        this._doctorLastName = appointment.doctorLastName;
        this._visitState = appointment.visitState ? appointment.visitState : appointment.state;
        this._certifyState = appointment.certifyState;
        this._patientFirstName = appointment.patientFirstName;
        this._patientLastName = appointment.patientLastName;
        this._patientPesel = appointment.pesel;
        this._vaccineBatchNumber = appointment.batchNumber;
    }

    toString(listOfColumns) {
        let result = [];
        listOfColumns.map((column) => {
            switch(column.accessor) {
                case "vaccineName":
                    result = [...result, { vaccine: this._vaccineName }];
                    break;
                case "vaccineVirus":
                    result = [...result, { virus: this._vaccineVirus }];
                    break;
                case "vaccinationCenterName":
                    result = [...result, { download: this._vaccinationCenterName }];
                    break;
                case "vaccinationCenterCity":
                    result = [...result, { download: this._vaccinationCenterCity }];
                    break;
                case "vaccinationCenterStreet":
                    result = [...result, { download: this._vaccinationCenterStreet }];
                    break;
                case "windowBegin":
                    result = [...result, { download: this._windowBegin }];
                    break;
            }
        })
        return result;
    }
}