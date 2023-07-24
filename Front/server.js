const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./'));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

var server = app.listen(8000, () => {
    var host = server.address().address;
    if (!host || host === '' || host === '::') {
        host = '127.0.0.1';
    }

    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});