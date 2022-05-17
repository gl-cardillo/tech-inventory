var express = require('express');
var router = express.Router();

const item_controller = require('../controllers/itemController')

router.get('/', item_controller.item_list);

router.get('/phones', item_controller.phones_get);

router.get('/computer', item_controller.computer_get);

router.get('/consoles', item_controller.consoles_get);

router.get('/item/create', item_controller.item_create_get);

router.post('/item/create', item_controller.item_create_post);

router.get('/item/:id', item_controller.item_detail);

router.get('/item/:id/update', item_controller.item_update_get);

router.post('/item/:id/update', item_controller.item_update_post);

router.get('/item/:id/delete', item_controller.item_delete_get);

router.post('/item/:id/delete', item_controller.item_delete_post);

module.exports = router;