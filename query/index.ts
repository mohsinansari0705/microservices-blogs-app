import cors from 'cors';
import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());
app.use(cors());

type Comment = {
    id: string;
    content: string;
    status: string;
};
type Post = {
    id: string;
    title: string;
    content: string;
    comments: [Comment?];
};
const posts: Record<string, Post> = {};


const handleEvents = (type: string, data: any) => {
        if (type === 'PostCreated') {
        posts[data.id] = {
            id: data.id,
            title: data.title,
            content: data.content,
            comments: []
        };
    }

    if (type === 'CommentCreated') {
        posts[data.postId].comments.push({
            id: data.id,
            content: data.content,
            status: data.status
        });
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;

        const comment = posts[postId].comments.find(comment => {
            return comment?.id === id;
        });

        if (comment) {
            comment.content = content;
            comment.status = status;
        }
    }
};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvents(type, data);

    res.send({});
});


app.listen(4002, async () => {
    console.log('Query service listening on port 4002...');

    const res = await axios.get('http://localhost:4005/events');

    for (let event of res.data) {
        console.log(`Processinng event: ${event.type}`);

        handleEvents(event.type, event.data);
    }
});
