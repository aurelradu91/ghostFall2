import express from 'express';

const app = express();

import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();

import {DbService} from './dbService.js'

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended : false}));

//create
app.post('/insert', (request, response) => {
    const {name} = request.body;
    const db = DbService.getDbServiceInstance();

    const result = db.insertNewName(name);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err))

})



//read

app.get('/getAll', (request, response) => {
    const db = DbService.getDbServiceInstance();

    const result = db.getAllData()

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));

})

//search

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = DbService.getDbServiceInstance();
    const result = db.searchByName(name);
    
        result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
    })


app.listen(process.env.PORT, () => console.log('app is running'));