import express from 'express';

const app = express();

const users = [

];

app.get('/users', (req, res) => {
    res.send('Hello World! :D ');
});

app.post('/users', (req, res) => {
    console.log(req);

    res.send('oi, to aqui');
});

app.listen(3000)