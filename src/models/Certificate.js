export default class Certificate
{
    _url;
    _vaccineName;
    _vaccineCompany;
    _virusType;

    constructor(certificate)
    {
        this._url = certificate.url;
        this._vaccineName = certificate.vaccineName;
        this._vaccineCompany = certificate.vaccineCompany;
        this._virusType = certificate.virusType;
    }

    get getUrl() { return this._url; }
    set setUrl(url) { this._url = url; }

    get getVaccineName() { return this._vaccineName; }
    set setVaccineName(vaccineName) { this._vaccineName = vaccineName; }
    
    get getVaccineCompany() { return this._vaccineCompany; }
    set setVaccineCompany(vaccineCompany) { this._vaccineCompany = vaccineCompany; }

    get getVirusType() { return this._virusType; }
    set setVirusType(virusType) { this._virusType = virusType; }


    toTableData(listOfColumns) {
        const NA = "NA";
        let result = [];
        listOfColumns.map((column) => {
            switch(column.accessor) {
                case "vaccine":
                    this._vaccineName 
                    ? result = [...result, { vaccine: this._vaccineName }] 
                    : result = [...result, { vaccine: NA }];
                    break;
                case "virus":
                    this._virusType 
                    ? result = [...result, { virus: this._virusType }] 
                    : result = [...result, { virus: NA }];
                    break;
                case "download":
                    this._url 
                    ? result = [...result, { download: this._url }] 
                    : result = [...result, { download: NA }];
                    break;
            }
        })
        return result;
    }
}