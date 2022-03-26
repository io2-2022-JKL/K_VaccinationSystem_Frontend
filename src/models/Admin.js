class Admin extends User 
{
    constructor(user)
    {
        super(user);
    }
}

function createAdmin(id,pesel,firstName,lastName,dateOfBirth,mail,phoneNumber)
{
    user = new Object();
    user.id = id;
    user.pesel = pesel;
    user.firstName = firstName;
    user.lastName = lastName;
    user.dateOfBirth = dateOfBirth;
    user.mail = mail;
    user.phoneNumber = phoneNumber;
    return new Admin(user);
}