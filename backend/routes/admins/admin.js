const express = require('express');
const routers = express.Router();

const adminControllers = require('../../controllers/admins/api/admin');
//const Middlewares = require('../../controllers/agents/middleware');

routers.get('/home',adminControllers.home);

module.exports = routers;