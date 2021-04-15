import axios from 'axios'

const handleResponse = (res) => res.data
const handleError = (res) => {
    res = res.response
    throw res
}

export default class ModelService{
    constructor(model, http){
        this.model = model;
        this.http = http
    }

    getQuery( params = null ) {
        let query = '';
        if( typeof params === 'object' && params &&Object.keys(params).length ) {
            query =  '?' + Object
                .keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')
        }
        if( typeof params === 'string') { query = params }

        return query;
    }

    getUrl(url = ''){
        return `${this.model}/${url}`.replace(/\/$/, ""); 
    }

    // CUSTOM API
    api( method, urlCustom, params = null ){
        let url = this.getUrl(urlCustom);
        switch(method) {
            case 'get':
                return axios.get(`${url}/${this.getQuery( params )}`).then(handleResponse).catch(handleError);
            case 'post':
            case 'put':
            case 'delete':
                return axios[method](url, params).then(handleResponse).catch(handleError);
            default:
                return null;
        }
    }

    // CUSTOM
    custom(method, urlCustom, params = null) {
        switch(method) {
            case 'get':
                return axios.get( urlCustom + this.getQuery( params ) )
                    .then(handleResponse)
                    .catch(handleError);
            case 'post':
                return axios.post( urlCustom, params)
                    .then(handleResponse)
                    .catch(handleError);
            default:
                return null;
        }
    }

    index( params ){
        return this.http.get( this.getUrl() + this.getQuery( params )  )
            .then(handleResponse)
            .catch(handleError);
    }

    show( id ) {
        return this.http.get( this.getUrl(id) )
            .then(handleResponse)
            .catch(handleError);
    }

    create( params ){
        let query = this.getQuery( params );

        return this.http.get( this.getUrl('create') + query )
            .then(handleResponse)
            .catch(handleError);
    }

    store( params ){
        return this.http.post( this.getUrl(), params)
            .then(handleResponse)
            .catch(handleError);
    }

    edit( id, params ){
        let query = this.getQuery( params );
        
        return this.http.get( this.getUrl(`${id}/edit`) + query )
            .then(handleResponse)
            .catch(handleError);
    }

    update( id, params ){
        this.getUrl()
        return this.http.put( this.getUrl(id) , params)
            .then(handleResponse)
            .catch(handleError);
    }

    delete( id ){
        return this.http.delete( this.getUrl(id) )
            .then(handleResponse)
            .catch(handleError);
    }
}
