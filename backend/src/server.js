import express from 'express';
// import cors from 'cors';
import dotenv from 'dotenv';
import path from "path"
import fs from 'fs';
import { fileURLToPath } from 'url';

import rateLimiter from './middleware/rateLimiter.js';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { cowBasicCompiler } from './middleware/cowBasicCompiler.js'
import { pieceItTogether } from './middleware/pieceItTogether.js'


dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
    const mwDir = path.join(__dirname, 'middleware');
    const exes = ['cowBasicCompiler', 'pieceItTogether'];
    exes.forEach((name) => {
        const p = path.join(mwDir, name);
        try {
            fs.accessSync(p, fs.constants.X_OK);
            console.log(`Found executable: ${p}`);
        } catch (e) {
            console.warn(`Executable missing or not executable: ${p} -- ${e.message}`);
        }
    });
} catch (e) {
    console.warn('Middleware startup check failed:', e.message);
}
connectDB();

// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);


// Routes
app.post('/api/compile', cowBasicCompiler)
app.post('/api/pieceItTogether', pieceItTogether)


if (process.env.NODE_ENV === "production") {
    const frontDist = path.join(__dirname, '..', '..', 'frontend', 'dist');

    if (fs.existsSync(frontDist)) {
        app.use(express.static(frontDist));

        const indexPath = path.join(frontDist, 'index.html');
        app.get('*', (req, res) => {
            if (fs.existsSync(indexPath)) {
                return res.sendFile(indexPath);
            }
            console.warn(`Frontend index not found at ${indexPath}`);
            return res.status(404).send('Frontend build not found');
        });
    } else {
        console.warn(`Frontend dist folder not found at ${frontDist}`);
    }
}


// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});