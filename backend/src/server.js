import express from 'express';
// import cors from 'cors';
import dotenv from 'dotenv';
import path from "path"
import { spawn } from 'child_process';
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
// Health endpoint to run a quick test compile of both executables and return diagnostics
app.get('/api/compiler-health', async (req, res) => {
    const mwDir = path.join(__dirname, 'middleware');
    const exes = ['cowBasicCompiler', 'pieceItTogether'];
    const TIMEOUT_MS = parseInt(process.env.COMPILER_TIMEOUT_MS || '8000', 10);

    const runOne = (name) => new Promise((resolve) => {
        const exePath = path.join(mwDir, name);
        const result = { name, exePath, exists: false, stdout: '', stderr: '', code: null, timedOut: false, error: null };
        try {
            if (!fs.existsSync(exePath)) {
                result.error = 'not_found';
                return resolve(result);
            }
            result.exists = true;
            const child = spawn(exePath, [], { stdio: ['pipe', 'pipe', 'pipe'] });
            const start = Date.now();
            const killTimer = setTimeout(() => {
                result.timedOut = true;
                try { child.kill(); } catch (e) {}
            }, TIMEOUT_MS);

            child.stdout.on('data', (c) => { result.stdout += c.toString(); });
            child.stderr.on('data', (c) => { result.stderr += c.toString(); });

            child.on('error', (err) => {
                clearTimeout(killTimer);
                result.error = err.message;
                result.code = null;
                result.elapsedMs = Date.now() - start;
                return resolve(result);
            });

            child.on('close', (code) => {
                clearTimeout(killTimer);
                result.code = code;
                result.elapsedMs = Date.now() - start;
                return resolve(result);
            });

            // send a tiny program that immediately returns; adjust to your language's expected input
            const testInput = 'R 0\n';
            child.stdin.write(testInput);
            child.stdin.end();
        } catch (e) {
            result.error = e.message;
            return resolve(result);
        }
    });

    const results = [];
    for (const name of exes) {
        // eslint-disable-next-line no-await-in-loop
        const r = await runOne(name);
        results.push(r);
    }

    return res.json({ results, TIMEOUT_MS });
});

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