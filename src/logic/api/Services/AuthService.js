import ResourceService from '../ResourceService'

class AuthService extends ResourceService {
    logIn(data) {
        return this.axios.post('signin', data)
    }
    resource = ''
}

export default new AuthService()