var express = require('express');
var paradoxController = require('../Controllers/paradoxController');


var router = express.Router();



// Rutas de autenticación
router.post('', paradoxController.get_report);

router.use('*', function (req, res){

    console.log('error 404 esta llegando')
  
  })


module.exports = router;