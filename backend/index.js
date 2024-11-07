// require('dotenv').config();
const express = require('express');
// const path = require('path')
const app = express();
// const cors = require('cors');

// const adminRoutes = require('./routes/admins/admin');
// const userRoutes = require('./routes/users/user');
// const agentRoutes = require('./routes/agents/agent');
// const db = require('./models');

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

// const resetDB = {force:false};
// db.sequelize.sync(resetDB).then(() => {
//     db.extradb(resetDB)
    
//     app.use('/admin',adminRoutes);
//     app.use('/user',userRoutes);
//     app.use('/agent',agentRoutes);

//     app.use('/bg_search',express.static(path.join(__dirname,'/src/images/bgSearch')));
//     app.use('/package_tour',express.static(path.join(__dirname,'/src/images/packageTour')));
//     app.use('/qr_code',express.static(path.join(__dirname,'/src/images/qrcode')));
//     app.use('/e_slip',express.static(path.join(__dirname,'/src/images/eSlip')));

//     app.get('/bg_search/:filename', (req, res) => {
//         res.sendFile(path.join(__dirname, "/src/images/bgSearch/"+req.params.filename));
//     });
//     app.get('/package_tour/:filename', (req, res) => {
//         res.sendFile(path.join(__dirname, "/src/images/packageTour/"+req.params.filename));
//     });
//     app.get('/qr_code/:filename', (req, res) => {
//         res.sendFile(path.join(__dirname, "/src/images/qrcode/"+req.params.filename));
//     });
//     app.get('/e_slip/:filename', (req, res) => {
//         res.sendFile(path.join(__dirname, "/src/images/eSlip/"+req.params.filename));
//     });

//     app.listen(process.env.PORT_BE,() =>{
//         console.log('Server on port ',process.env.PORT_BE)
//     });
// });

    app.get("/", (req, res) => res.send("Express on Vercel"));
    app.listen(process.env.PORT_BE,() =>{
        console.log('Server on port ',process.env.PORT_BE)
    });

// module.exports = app;
