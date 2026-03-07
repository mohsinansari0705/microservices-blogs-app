import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'node:crypto';


const app = express();
app.use(bodyParser.json());

type Post = {
    id: string;
    title: string;
    body: string
};
const posts: Record<string, Post> = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id: string = randomBytes(4).toString('hex');
    const { title, body } = req.body;

    posts[id] = {
        id, title, body
    };

    res.status(201).send(posts[id]);
});


app.listen(4000, () => {
    console.log('Listening on port 4000...');
});