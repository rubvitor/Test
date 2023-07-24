const mongoose = require('mongoose');
const db = "mongodb://127.0.0.1:27017/test?tls=false";

const connectDB = () => {
    try {
        console.log('mongo initializing');

        mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Database connection successful');
            initialize();
        })
            .catch(err => {
                console.log(err);
                console.error('Database connection error')
            });

        console.log('MongoDB successfully connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();

var Usuarios;

function initialize() {
    const usuariosSchema = new mongoose.Schema({
        nome: String,
        idade: Number,
        _id: String
    });

    Usuarios = mongoose.model('usuarios', usuariosSchema);
}

module.exports = function (app) {
    const crypto = require('crypto');

    app.get('/listUsers', function (req, res) {
        getUsuarios().then(function(result) {
            res.send(result);
        });
    });

    function getUsuarios() {
        const query = Usuarios.find();

        return query;
    }

    app.post('/addUser', function (req, res) {
        console.log(req.body);
        Usuarios.create({
            _id: crypto.randomUUID(),
            idade: req.body.idade,
            nome: req.body.nome
        });

        getUsuarios().then((data) => {
            console.log(data);
            res.send(data);
        });
    });

    app.put('/updateUser', function (req, res) {
        const update = { $push: { _id: req.data._id } };
        Usuarios.updateOne({
            idade: req.data.idade,
            nome: req.data.nome
        }, update);

        getUsuarios().then((data) => {
            res.send(data);
        });
    });

    app.delete('/deleteUser', function (req, res) {
        const usuario = Usuarios.find({ '_id': req.data._id });
        usuario.deleteOne();

        getUsuarios().then((data) => {
            res.send(data);
        });
    });

    app.get('/getUser/:id', function (req, res) {
        Usuarios.find({ '_id': req.data._id }).then((data) => {
            res.send(data);
        });
    });

    console.log('endpoints created.');

    return app;
}