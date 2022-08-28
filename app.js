const setupDb = require('./config/db-setup');
const express = require('express');
const router = require('./routes/index');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');
const path = require('path');
dotenv.config({ path: '.env' });

setupDb();
const app = express();
app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}))
app.use(express.json());
app.use(router);

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
},
app
)

sslServer.listen(8080, () => console.log('server is running on port 8080'));
