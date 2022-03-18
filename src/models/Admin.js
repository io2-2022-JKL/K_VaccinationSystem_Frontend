class Admin extends User 
{
    constructor(id,pesel,firstName,lastName,dateOfBirth,mail,phoneNumber)
    {
        super(id,pesel,firstName,lastName,dateOfBirth,mail,phoneNumber);
    }

    constructor(user)
    {
        super(user);
    }
}