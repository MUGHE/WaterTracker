const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db.config');
const serverConfig = require('./config/server.config');
const errorHandler = require('./middlewares/errorHandler');

const goalRoutes = require('./routes/goalRoutes');
const intakeRoutes = require('./routes/intakeRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', goalRoutes);
app.use('/api', intakeRoutes);

app.use(errorHandler);

app.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port}`);
});
