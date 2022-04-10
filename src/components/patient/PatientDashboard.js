import React, {Component} from 'react';
import '../../styles/patient/patient.css';

export function PatientDashboard() {
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
                                Imię: Jakub
                            </h3>
                        </div>
                        <div>
                            <h3>
                                Nazwisko: Nowak
                            </h3>
                        </div>
                    </div>
                </div>
                <div>
                    <table>
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
                    </table>
                </div>
            </div>
        </div>

    )
}