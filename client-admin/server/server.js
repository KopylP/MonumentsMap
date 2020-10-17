const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..');
const port = process.env.PORT || 80;
app.use(express.static(publicPath));
app.get('*', (req, res) => {
   console.log(req.url);
   res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(port, () => {
   console.log('Server is up!');
});