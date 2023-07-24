var app = require('express')();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

var bodyParser = require('body-parser');

app.use(function (req, res, next) {

    const allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:8000', 'http://127.0.0.1:8000', 'http://localhost:9000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.header('Access-Control-Allow-Headers', 'x-requested-with,content-type');

    res.header('Access-Control-Allow-Credentials', true);

    return next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app = require('./endpoints')(app);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

var server = app.listen(3000, () => {
    var host = server.address().address;
    if (!host || host === '' || host === '::') {
        host = '127.0.0.1';
    }

    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});

// var server = app.listen(8081, function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log("Example app listening at http://%s:%s", host, port)
// });