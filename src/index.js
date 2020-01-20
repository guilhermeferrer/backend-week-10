import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';

mongoose.connect('mongodb://localhost:27017/week-10', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);