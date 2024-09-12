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

const resetDB = {force:false};
db.sequelize.sync(resetDB).then(() => {
    db.extradb(resetDB)
    
    app.use('/user',userRoutes);
    app.use('/agent',agentRoutes);

    app.use('/package_tour',express.static(path.join(__dirname,'/src/images/package_tour')));
    app.use('/qr_code',express.static(path.join(__dirname,'/src/images/qrcode')));

    app.get('/package_tour/:filename', (req, res) => {
        res.sendFile(path.join(__dirname, "/src/images/package_tour/"+req.params.filename));
    })
    app.get('/qr_code/:filename', (req, res) => {
        res.sendFile(path.join(__dirname, "/src/images/qrcode/"+req.params.filename));
    })

    app.listen(process.env.PORT_BE,() =>{
        console.log('Server on port ',process.env.PORT_BE)
    });
});

