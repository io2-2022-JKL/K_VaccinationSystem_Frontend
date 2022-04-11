import ResourceService from '../ResourceService'

class PatientTimeslotsService extends ResourceService {
    resource = 'patient/timeSlots'
}

export default new PatientTimeslotsService()