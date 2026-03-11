import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;

    // posts service
    axios.post('http://localhost:4000/events', event);

    // comments service
    axios.post('http://localhost:4001/events', event);

    // query service
    axios.post('http://localhost:4002/events', event);

    // moderation service
    axios.post('http://localhost:4003/events', event);

    res.send({ status: 'OK' });
});


app.listen(4005, () => {
    console.log('Event-Bus listening on port 4005...');
});
