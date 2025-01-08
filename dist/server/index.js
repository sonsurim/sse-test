import express from 'express';
const app = express();
const PORT = 3000;
app.get('/events', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    let counter = 0;
    res.write(`data: ${JSON.stringify({ message: 'First Message from server!', counter })}\n\n`);
    const interval = setInterval(() => {
        counter++;
        res.write(`data: ${JSON.stringify({ message: 'Update from server', counter })}\n\n`);
    }, 2000);
    req.on('close', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});
app.listen(PORT, () => {
    console.log(`SSE server running at http://localhost:${PORT}`);
});
