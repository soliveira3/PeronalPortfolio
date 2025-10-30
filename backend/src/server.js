import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path"

import rateLimiter from './middleware/rateLimiter.js';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { cowBasicCompiler } from './middleware/cowBasicCompiler.js'
import { pieceItTogether } from './middleware/pieceItTogether.js'


dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
const __dirname = path.resolve()
connectDB();

app.use(cors())
app.use('/static', express.static(path.join(__dirname, 'src', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);


// Routes
app.get('/', (req, res) => {
    res.send('API is running');
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.post('/api/compile', cowBasicCompiler)
app.post('/api/pieceItTogether', pieceItTogether)


// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});