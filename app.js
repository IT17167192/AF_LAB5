'use strict';
const express = require('express');
// import mongoose
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const datejs = require('datejs');
//allow to use env variables
//load env variables
require('dotenv').config();


//nodejs run in this port
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use('/', express.static('public'));

app.get('/', (req, res, next) => {
    res.sendFile('index.html');
});

const UserModel = require('./models/user');

const users = [];

app.post('/users', (req, res, next) => {
    const user = new UserModel(req.body);
    user.save().then(user => {
        res.json(user);
    })
    .catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

app.get('/users', (req, res) => {
    UserModel.find().exec().then(users => {
        res.json(users);
    })
    .catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

app.get('/users/:id', (req, res, id) => {
    UserModel.findById(req.params.id).exec().then(user => {
        res.json(user || {});
    })
    .catch(err => {
        console.error(err);
        res.sendStatus(500)
        ;
    });

});

app.put('/users/:id', (req, res) => {

    UserModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'Error!'
            })
        }
        res.json(user);
    });
});

app.delete('/users/:id', (req, res) => {
    UserModel.remove({_id: req.params.id}).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

app.listen(port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('app listening on port 3000');
});

//db connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
)
.then(() => console.log('DB is Connected'));

