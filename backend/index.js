require('dotenv').config();
const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/users/user');
const agentRoutes = require('./routes/agents/agent');
const db = require('./models');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'/src/images')));

const resetDB = {force:false};
db.sequelize.sync(resetDB).then(() => {
    db.extradb(resetDB)
    app.use('/user',userRoutes);
    app.use('/agent',agentRoutes);
    app.listen(process.env.PORT_BE,() =>{
        console.log('Server on port ',process.env.PORT_BE)
    });
});

