module.exports = {
    application: {
        port: 3000
    },
    db: {
        host: 'localhost', //database host
        port: 5432, //database port
        user: 'postgres', //postgres user
        password: undefined, //postgres password
        database: 'easypay' //database name
    },
    stub: {
        phones: [
            '+7-978-123-45-67',
            '+7-978-123-46-67',
            '+7-978-123-48-67',
            '+7-978-123-49-67',
            '+7-978-123-50-67',
            '+7-978-123-51-67',
            '+7-978-123-52-67',
            '+7-978-123-53-67'
        ]
    }
};
