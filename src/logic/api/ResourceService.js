import BasicService from './BasicService'

export default class ResourceService extends BasicService {
    index(query = null, ...params){
        let url = this.resource

        if (query) {
            url += '?'
            Object.keys(query).forEach((key) => {
                url += key + '=' + encodeURI(query[key]) + '&'
            })
        }

        return this.axios.get(url, ...params)
    }

    show(id, ...params) {
        return this.axios.get(this.resource + '/' + id, ...params)
    }

    store(data, ...params) {
        return this.axios.post(this.resource, data, ...params)
    }

    update(id, data, ...params) {
        return this.axios.put(this.resource + '/' + id, data, ...params)
    }

    destroy(id, ...params) {
        return this.axios.delete(this.resource + '/' + id, ...params)
    }
}
