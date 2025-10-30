import { exec } from 'child_process';

export const pieceItTogether = (req, res) => {
    const { code } = req.body;

    if (!code)
        return res.status(400).json({ error: 'No code provided' });

    // Run the compiler executable
    const child = exec('./src/middleware/pieceItTogether', { timeout: 5000 }, (error, stdout, stderr) => {
        if (error) {
            if (error.killed) return res.status(408).json({ error: 'Compilation timed out' });
            return res.status(400).json({ error: stderr || error.message });
        }

        const output = stdout.trim()
        const time = stderr.trim()

        res.json({ output, time });
    });

    child.stdin.write(code);
    child.stdin.end();
};
