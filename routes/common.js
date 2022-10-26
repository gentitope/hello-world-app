const express = require('express');


const commonRoutes = express.Router();


commonRoutes.route('/').get(async function (_req, res) {
    res.send("");
});

commonRoutes.route('/ping').get(async function (_req, res) {
    res.json({
        "status": "OK"
    });
});

commonRoutes.route('/health').get(async function (_req, res) {
    res.json({
        "status": "OK"
    });
});

commonRoutes.route('/api').get(async function (_req, res) {
    res.json({
        "name": "Currency"
    });
});

commonRoutes.route('/code').get(async function (_req, res) {
    res.json({
        "ID": "2354"
    });
});




module.exports = commonRoutes;
