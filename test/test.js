const express = require('express');
const serveStatic = require('serve-static');
const serveIndex = require('serve-index');
const path = require('path');

const root = path.resolve(__dirname, '../');

const index = require(path.join(root, 'index.js'));

const app = express();

const port = 3000;

const indexOpts = {
    icons: true,
    template: index.render
};


app.use(serveStatic(path.join(root, '/test/test-build')));
app.use(serveIndex(path.join(root, '/test/test-build'), indexOpts));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


