import cors from 'cors';
import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'node:crypto';


const app = express();
app.use(bodyParser.json());
app.use(cors());

type Comment = {
    id: string;
    content: string;
    status: string;
};
const commentsByPostId: Record<string, Comment[]> = {};


app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content: content, status: 'pending' });

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content: content,
            postId: req.params.id,
            status: 'pending'
        }
    });

    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { id, content, postId, status } = data;

        const comment = commentsByPostId[postId].find(comment => {
            return comment.id === id;
        });

        if (comment) {
            comment.status = status;
        }

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id: id,
                content: content,
                postId: postId,
                status: status
            }
        });
    }

    res.send({});
});


app.listen(4001, () => {
    console.log("Comments service listening on port 4001...");
});
