import React, {Component} from 'react';
import '../../styles/patient/patient.css';
import Patient from '../../models/Patient'
import '../../models/User';

export default function PatientDashboard() {

    var tmp = new Object();
    tmp.id = '1';
    tmp.pesel = '00000000001';
    tmp.firstName = 'Jakub';
    tmp.lastName = 'Nowak';
    tmp.dateOfBirth = '24-03-1999';
    tmp.mail = 'jakub.nowak@adres.mailowy.pl';
    tmp.phoneNumber = '+48000000000';
    tmp.vaccinationCount = '0';
    tmp.vaccinationHistory = 'todo';
    tmp.futureVaccinations = 'todo';
    tmp.certificates = 'todo';
    tmp.active = 'a';


    const patient = new Patient(tmp);

    return (
        <div>
            <div className='namePageSeparator'>
                <div className='nameGridElement'>
                    <h2> 
                        Strona główna pacjenta 
                    </h2>
                </div>
                <div className='photoDataSeparator'>
                    <div>
                        <img src="https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-1.jpg" alt="no photo"/>
                    </div>
                    <div>
                        <div>
                            <h3>
                                Imię: {patient.getFirstName}
                            </h3>
                        </div>
                        <div>
                            <h3>
                                Nazwisko: {patient.getLastName}
                            </h3>
                        </div>
                        <div>
                            <h3>
                                Pesel: {patient.getPesel}
                            </h3>
                        </div>
                    </div>
                </div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>
                                Data
                            </th>
                            <th>
                                Godzina
                            </th>
                            <th>
                                Szczepionka
                            </th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>

    )
}