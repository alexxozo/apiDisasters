var port = process.env.port || 3000;

const app = require('./app');

app.listen(port, function () {
    console.log('Example app listening on port' + port);
});
