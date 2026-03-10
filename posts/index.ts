import cors from 'cors';
import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'node:crypto';


const app = express();
app.use(bodyParser.json());
app.use(cors());

type Post = {
    id: string;
    title: string;
    content: string;
};
const posts: Record<string, Post> = {};


app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const postId: string = randomBytes(4).toString('hex');
    const { title, content } = req.body;

    posts[postId] = {
        id: postId,
        title: title,
        content: content
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id: postId,
            title: title,
            content: content
        }
    });

    res.status(201).send(posts[postId]);
});


app.listen(4000, () => {
    console.log('Posts service listening on port 4000...');
});
