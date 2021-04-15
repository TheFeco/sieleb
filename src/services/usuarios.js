import Model from './model'

export default (http) => {
    const model = new Model('usuarios', http)
    
    const login = (data) => {
        console.log(data)
        // return model.api('get', 'login', data)
    }

    return {
        index: model.index.bind(model),
        store: model.store.bind(model),
        update: model.update.bind(model),
        delete: model.delete.bind(model),
        show: model.show.bind(model),
        login,
    }
}