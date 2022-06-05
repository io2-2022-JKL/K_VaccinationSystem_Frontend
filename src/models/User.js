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
        this._id = user.id ? user.id : user.patientAccountId;
        this._pesel = user.pesel;
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

    toTableData() {
        const NA = "NA";
        let result = [];

        this._firstName 
        ? result = [...result, { patientFirstName: this._firstName }] 
        : result = [...result, { patientFirstName: NA }];

        this._lastName 
        ? result = [...result, { patientLastName: this._lastName }] 
        : result = [...result, { patientLastName: NA }];

        this._pesel 
        ? result = [...result, { pesel: this._pesel }] 
        : result = [...result, { pesel: NA }];

        this._dateOfBirth 
        ? result = [...result, { dateOfBirth: this._dateOfBirth }] 
        : result = [...result, { dateOfBirth: NA }];
        
        this._mail 
        ? result = [...result, { mail: this._mail }] 
        : result = [...result, { mail: NA }];

        this._phoneNumber 
        ? result = [...result, { phoneNumber: this._phoneNumber }] 
        : result = [...result, { phoneNumber: NA }];

        this._active 
        ? result = [...result, { userActive: this._active }] 
        : result = [...result, { userActive: NA }];

        this._id 
        ? result = [...result, { patientId: this._id }] 
        : result = [...result, { patientId: NA }];

        this._id 
        ? result = [...result, { id: this._id }] 
        : result = [...result, { id: NA }];
        
        return result;
    }
}