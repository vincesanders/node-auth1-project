const db = require('../data/dbConfig');

module.exports = {
    get,
    getBy,
    getById,
    insert,
}

function get() {
    return db('users');
}

function getBy(filter) {
    return db('users').where(filter).first();
}

function getById(id) {
    return db('users').where({ id }).first();
}

function insert(user) {
    return db('users').insert(user, 'id').then(ids => {
        return getById(ids[0]);
    });
}