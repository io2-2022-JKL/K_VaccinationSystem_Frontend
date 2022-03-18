class User {
    _id;
    _pesel;
    _firstName;
    _lastName;
    _dateOfBirth;
    _mail;
    _phoneNumber;

    constructor(id,pesel,firstName,lastName,dateOfBirth,mail,phoneNumber)
    {
        this._id = id;
        this._pesel = pesel;
        this._firstName = firstName;
        this._lastName = lastName;
        this._dateOfBirth = dateOfBirth;
        this._mail = mail;
        this._phoneNumber = phoneNumber;
    }

    constructor(user)
    {
        this._id = user.id;
        this._pesel = user.pesel;
        this._firstName = user.firstName;
        this._lastName = user.lastName;
        this._dateOfBirth = user.dateOfBirth;
        this._mail = user.mail;
        this._phoneNumber = user.phoneNumber; 
    }

    get getId() { return this._id; }
    set setId(id) { this._id = id; }

    get getPesel() { return this._pesel; }
    set setPesel(pesel) { this._pesel = pesel; }
    
    get getFirstName() { return this._firstName; }
    set setFirstName(firstName) { this._firstName = firstName; }

    get getLastName() { return this._lastName; }
    set setLastName(lastName) { this._lastName = lastName; }

    get getDateOfBirth() { return this._dateOfBirth; }
    set setDateOfBirth(dateOfBirth) { this._dateOfBirth = dateOfBirth; }

    get getMail() { return this._mail; }
    set setMail(mail) { this._mail = mail; }

    get getPassword() { return this._password; }
    set setPassword(password) { this._password = password; }

    get getPhoneNumber() { return this._phoneNumber; }
    set setPhoneNumber(phoneNumber) { this._phoneNumber = phoneNumber; }
}