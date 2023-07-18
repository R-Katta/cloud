const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

AWS.config.update({region: 'your_region'});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = "TemperatureData";

const app = express();
app.use(bodyParser.json());

app.post('/addData', (req, res) => {
    const params = {
        TableName: tableName,
        Item: {
            'id': Date.now(),
            'temperature': req.body.temperature,
            'convertedValue': req.body.convertedValue,
            'type': req.body.type
        }
    };

    dynamodb.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).json({error: "Could not save data to DB"});
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.status(200).json({message: "Data saved successfully."});
        }
    });
});

app.get('/getData', (req, res) => {
    const params = {
        TableName: tableName,
    };

    dynamodb.scan(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).json({error: "Could not retrieve data from DB"});
        } else {
            res.status(200).json(data.Items);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
