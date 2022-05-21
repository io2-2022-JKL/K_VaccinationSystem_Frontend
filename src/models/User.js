export default class User {
    _id;
    _pesel;
    _firstName;
    _lastName;
    _dateOfBirth;
    _mail;
    _phoneNumber;
    _active
  
    constructor(user)
    {
        this._id = user.id;
        this._pesel = user.PESEL;
        this._firstName = user.firstName;
        this._lastName = user.lastName;
        this._dateOfBirth = user.dateOfBirth;
        this._mail = user.mail;
        this._phoneNumber = user.phoneNumber;
        this._active = user.active;
    }

    get getId() { return this._id; }
    set setId(id) { this._id = id; }

    get getPesel() { return this._pesel; }
    set setPesel(pesel) { this._pesel = pesel; }
    
    get getFirstName() { return this._firstName; }
    set setFirstName(firstName) { this._firstName = firstName; }

    get getLastName() { return this._lastName; }
    set setLastName(lastName) { this._lastName = lastName; }

    get getDateOfBirth() { return this._dateOfBirth[8]+this._dateOfBirth[9]+' '+this._dateOfBirth[5]+this._dateOfBirth[6]+' '+this._dateOfBirth[0]+this._dateOfBirth[1]+this._dateOfBirth[2]+this._dateOfBirth[3]; }
    set setDateOfBirth(dateOfBirth) { this._dateOfBirth = dateOfBirth; }

    get getMail() { return this._mail; }
    set setMail(mail) { this._mail = mail; }

    get getPassword() { return this._password; }
    set setPassword(password) { this._password = password; }

    get getPhoneNumber() { return this._phoneNumber; }
    set setPhoneNumber(phoneNumber) { this._phoneNumber = phoneNumber; }

    get getActive() { return this._active; }
    set setActive(active) { this._active = active; }

    toTableData(listOfColumns) {
        const NA = "NA";
        let result = [];
        listOfColumns.map((column) => {
            switch(column.accessor) {
                case "patientFirstName":
                    this._firstName 
                    ? result = [...result, { patientFirstName: this._firstName }] 
                    : result = [...result, { patientFirstName: NA }];
                    break;
                case "firstName":
                    this._firstName 
                    ? result = [...result, { firstName: this._firstName }] 
                    : result = [...result, { firstName: NA }];
                    break;
                case "patientLastName":
                    this._lastName 
                    ? result = [...result, { patientLastName: this._lastName }] 
                    : result = [...result, { patientLastName: NA }];
                    break;
                case "lastName":
                    this._lastName 
                    ? result = [...result, { lastName: this._lastName }] 
                    : result = [...result, { lastName: NA }];
                    break;
                case "pesel":
                    this._pesel 
                    ? result = [...result, { pesel: this._pesel }] 
                    : result = [...result, { pesel: NA }];
                    break;
                case "dateOfBirth":
                    this._dateOfBirth 
                    ? result = [...result, { dateOfBirth: this._dateOfBirth }] 
                    : result = [...result, { dateOfBirth: NA }];
                    break;
                case "mail":
                    this._mail 
                    ? result = [...result, { mail: this._mail }] 
                    : result = [...result, { mail: NA }];
                    break;
                case "phoneNumber":
                    this._phoneNumber 
                    ? result = [...result, { phoneNumber: this._phoneNumber }] 
                    : result = [...result, { phoneNumber: NA }];
                    break;
                case "active":
                    this._active 
                    ? result = [...result, { active: this._active }] 
                    : result = [...result, { active: NA }];
                    break;
                case "id":
                    this._id 
                    ? result = [...result, { id: this._id }] 
                    : result = [...result, { id: NA }];
                    break;
                case "patientId":
                    this._id 
                    ? result = [...result, { patientId: this._id }] 
                    : result = [...result, { patientId: NA }];
                    break;
            }
        })
        return result;
    }
}export default class User {
    _id;
    _pesel;
    _firstName;
    _lastName;
    _dateOfBirth;
    _mail;
    _phoneNumber;
    _active
  
    constructor(user)
    {
        this._id = user.id;
        this._pesel = user.PESEL;
        this._firstName = user.firstName;
        this._lastName = user.lastName;
        this._dateOfBirth = user.dateOfBirth;
        this._mail = user.mail;
        this._phoneNumber = user.phoneNumber;
        this._active = user.active;
    }

    get getId() { return this._id; }
    set setId(id) { this._id = id; }

    get getPesel() { return this._pesel; }
    set setPesel(pesel) { this._pesel = pesel; }
    
    get getFirstName() { return this._firstName; }
    set setFirstName(firstName) { this._firstName = firstName; }

    get getLastName() { return this._lastName; }
    set setLastName(lastName) { this._lastName = lastName; }

    get getDateOfBirth() { return this._dateOfBirth[8]+this._dateOfBirth[9]+' '+this._dateOfBirth[5]+this._dateOfBirth[6]+' '+this._dateOfBirth[0]+this._dateOfBirth[1]+this._dateOfBirth[2]+this._dateOfBirth[3]; }
    set setDateOfBirth(dateOfBirth) { this._dateOfBirth = dateOfBirth; }

    get getMail() { return this._mail; }
    set setMail(mail) { this._mail = mail; }

    get getPassword() { return this._password; }
    set setPassword(password) { this._password = password; }

    get getPhoneNumber() { return this._phoneNumber; }
    set setPhoneNumber(phoneNumber) { this._phoneNumber = phoneNumber; }

    get getActive() { return this._active; }
    set setActive(active) { this._active = active; }

    toTableData(listOfColumns) {
        const NA = "NA";
        let result = [];
        listOfColumns.map((column) => {
            switch(column.accessor) {
                case "patientFirstName":
                    this._firstName 
                    ? result = [...result, { patientFirstName: this._firstName }] 
                    : result = [...result, { patientFirstName: NA }];
                    break;
                case "firstName":
                    this._firstName 
                    ? result = [...result, { firstName: this._firstName }] 
                    : result = [...result, { firstName: NA }];
                    break;
                case "patientLastName":
                    this._lastName 
                    ? result = [...result, { patientLastName: this._lastName }] 
                    : result = [...result, { patientLastName: NA }];
                    break;
                case "lastName":
                    this._lastName 
                    ? result = [...result, { lastName: this._lastName }] 
                    : result = [...result, { lastName: NA }];
                    break;
                case "pesel":
                    this._pesel 
                    ? result = [...result, { pesel: this._pesel }] 
                    : result = [...result, { pesel: NA }];
                    break;
                case "dateOfBirth":
                    this._dateOfBirth 
                    ? result = [...result, { dateOfBirth: this._dateOfBirth }] 
                    : result = [...result, { dateOfBirth: NA }];
                    break;
                case "mail":
                    this._mail 
                    ? result = [...result, { mail: this._mail }] 
                    : result = [...result, { mail: NA }];
                    break;
                case "phoneNumber":
                    this._phoneNumber 
                    ? result = [...result, { phoneNumber: this._phoneNumber }] 
                    : result = [...result, { phoneNumber: NA }];
                    break;
                case "active":
                    this._active 
                    ? result = [...result, { active: this._active }] 
                    : result = [...result, { active: NA }];
                    break;
                case "id":
                    this._id 
                    ? result = [...result, { id: this._id }] 
                    : result = [...result, { id: NA }];
                    break;
                case "patientId":
                    this._id 
                    ? result = [...result, { patientId: this._id }] 
                    : result = [...result, { patientId: NA }];
                    break;
            }
        })
        return result;
    }
}