import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());
app.use(cors());

type Comment = {
    id: string;
    content: string;
};
type Post = {
    id: string;
    title: string;
    content: string;
    comments: [Comment?];
};
const posts: Record<string, Post> = {};


app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

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
            content: data.content
        });
    }

    res.send({});
});


app.listen(4002, () => {
    console.log('Query service listening on port 4002...');
});
