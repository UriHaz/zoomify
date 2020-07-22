const axios = require('axios');
import httpService from './http.service';
export const eventoService = {
    query,
    remove,
    save,
    getById,
    getEmptyEvento
}

// function _getUrl(id = '') {
//     const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/evento' : '//localhost:3000/api/evento';
//     return `${BASE_URL}/${id}`;
// }

// function _getUrl(_id) {
//     return `event/:${_id}`;
// }

// function query(filterBy) {
//     const { name, inStock, type, sort } = filterBy;
//     return axios.get(`${_getUrl()}?name=${name}&inStock=${inStock}&type=${type}&sort=${sort}`)
//         .then(res => res.data)
// }

// function query(filterBy) {
//     const { title, inStock, type, sort } = filterBy;
//     return httpService.get('');
// }

function query(
	filterBy = { txt: "", isInStock: "", order: "asc", type: "", sort: "name" }
) {
	const query = `?txt=${filterBy.txt}&_sort=${filterBy.sort}&_order=${filterBy.order}`;

	return httpService.get(query);
}

function getEmptyEvento() {
    return {
        title: ''
    }
}

function getById(_id) {
console.log('id:',_id);
    return httpService.get(`/${_id}`)
}
// function getById(_id) {
//     return axios.get(`${_id}`)
//     .then((res) => res.data);
// }

function remove(id) {
    return axios.delete(_getUrl(id))
}

function save(evento) {
    return (evento._id) ? _update(evento) : _add(evento)
}

function _update(evento) {
    return axios.put(_getUrl(evento._id), evento)
        .then(res => res.data)
}

function _add(evento) {
    return httpService.post((''), evento)
}