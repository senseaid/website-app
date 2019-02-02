const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.render('index');
});

router.get('/blind', (request, response) => {
    response.render('blind');
});

router.get('/helper', (request, response) => {
    response.render('helper');
});

module.exports = router;