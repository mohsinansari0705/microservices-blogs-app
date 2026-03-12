import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());

type Data = {
    id: string;
    title?: string;
    content: string;
    postId?: string;
    status?: string;
}
type Event = {
    type: 'string';
    data: Data;
}
const events: Event[] = [];


app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    // posts service
    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log(err.message);
    });

    // comments service
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log(err.message);
    });

    // query service
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log(err.message);
    });

    // moderation service
    axios.post('http://localhost:4003/events', event).catch((err) => {
        console.log(err.message);
    });

    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.send(events);
});


app.listen(4005, () => {
    console.log('Event-Bus listening on port 4005...');
});
