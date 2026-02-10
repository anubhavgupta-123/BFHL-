const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = 3000;
try {
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (e) => {
        console.error('Server error:', e);
    });
} catch (e) {
    console.error('Exception:', e);
}
