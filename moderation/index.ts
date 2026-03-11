import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());


app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.toLowerCase().includes('orange') ? 'rejected' : 'approved';
        
        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                content: data.content,
                postId: data.postId,
                status: status
            }
        });
    }

    res.send({});
});


app.listen(4003, () => {
    console.log("Moderation service listening on port 4003...");
});
