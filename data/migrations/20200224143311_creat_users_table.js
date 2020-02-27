
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments().unsigned();
        tbl.string('username', 127).notNullable().unique();
        tbl.string('password').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
