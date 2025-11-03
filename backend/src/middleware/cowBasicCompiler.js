import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const cowBasicCompiler = (req, res) => {
    const { code } = req.body;

    if (!code) return res.status(400).json({ error: 'No code provided' });

    const exePath = path.join(__dirname, 'cowBasicCompiler');

    if (!fs.existsSync(exePath)) {
        console.error(`Compiler not found at ${exePath}`);
        return res.status(500).json({ error: `Compiler executable not found at ${exePath}` });
    }

    const TIMEOUT_MS = parseInt(process.env.COMPILER_TIMEOUT_MS || '15000', 10);

    const child = spawn(exePath, [], { stdio: ['pipe', 'pipe', 'pipe'] });

    let stdout = '';
    let stderr = '';
    let timedOut = false;

    child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });

    const killTimer = setTimeout(() => {
        timedOut = true;
        try { child.kill(); } catch (e) { console.error('Failed to kill process', e); }
    }, TIMEOUT_MS);

    child.on('error', (err) => {
        clearTimeout(killTimer);
        console.error('Compiler process error:', err);
        if (err && err.code === 'ENOENT') {
            return res.status(500).json({ error: 'Compiler executable not found or not executable' });
        }
        return res.status(500).json({ error: err.message });
    });

    child.on('close', (code) => {
        clearTimeout(killTimer);
        if (timedOut) return res.status(408).json({ error: 'Compilation timed out' });

        if (code !== 0) {
            console.error('Compiler stderr:', stderr);
            return res.status(400).json({ error: stderr || `Process exited with code ${code}` });
        }

        res.json({ output: stdout.trim(), time: stderr.trim() });
    });

    child.stdin.write(code);
    child.stdin.end();
};
