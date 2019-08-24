const Hapi = require('hapi');
const mysql = require('mysql');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const server = new Hapi.Server(
    {
        host: 'localhost',
        port: 3000
    });

var dbConfig = {
    host: 'jagsoft.atthost24.pl',
    user: '8213_CarRental',
    password: 'Asia1982?',
    database: '8213_CarRental'
}
let connection = mysql.createConnection(dbConfig);

var displayDB = () => {
    return new Promise((resolve, reject) => {
        try{
        connection.query('select * from Cars', (err, resp) => {
            resolve(resp);
        });
    }
    catch(ex){
        reject(ex);
    }
    });
};

var addCar = () => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO `Cars`(`ID`, `Marka`, `Model`, `Cena`) VALUES (`3`,`Fiat`,`Panda`,`200`)', (err, resp) => {
            resolve(resp);
        });
    });
};

var test = async () => {
    return await displayDB();
}

var addCarAsync = async () => {
    return await addCar();
}

server.route({
    method: 'GET',
    path: '/Cars',
    handler(request, reply) {
        return test();
    }
});

server.route({
    method: 'GET',
    path: '/AddCar',
    handler(request, reply) {
        return addCarAsync();
    }
});

server.start();