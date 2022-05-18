const Item = require('../models/item')
var fs = require('fs');
var path = require('path');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads'});

const {body, validationResult} = require('express-validator');


exports.item_list = function(req, res, next) {
  Item.find().exec(function(err, list_item) {
    if (err) { return next(err)}
    res.render('catalog', {title: 'Catalog', items: list_item})
  })
}

exports.item_detail = function(req, res, next) {
  Item.findById(req.params.id).exec(function(err, item) {
    if (err) { return next(err)} 
    res.render('item_detail', {title: item.name, item: item} )
  })
}

exports.phones_get = function(req, res, next) {
  Item.find({'category': 'Phones'}).exec(function(err, list_item) {
    if (err) { return next(err)}
    res.render('catalog', {title: 'Phones', items: list_item })
  })
}

exports.computer_get = function(req, res, next) {
  Item.find({'category': 'Computers'}).exec(function(err, list_item) {
    if (err) { return next(err)}
    res.render('catalog', {title: 'Computers', items: list_item })
  })
}

exports.consoles_get = function(req, res, next) {
  Item.find({'category': 'Consoles'}).exec(function(err, list_item) {
    if (err) { return next(err)}
    res.render('catalog', {title: 'Consoles', items: list_item })
  })
}

exports.item_create_get = function(req, res, next) {
  res.render('item_form', {title: 'Add item to inventory'})
}



exports.item_create_post = [
  upload.single('image'),
  body('category', 'Category must be selected').isLength({min:1}).escape(),
  body('name', 'Name must not be empty').trim().isLength({min: 1}).escape(),
  body('price', 'Price must not be empty').trim().isLength({min: 1}).escape(),
  body('stock', 'Stock must not be empty').trim().isLength({min: 1}).escape(),
  body('manufacturer', 'Manufacturer must not be empty').escape(),
  body('ssd').escape(),
  body('ram').escape(),
  body('screen_size').escape(),
  body('description').escape(),

   (req, res, next) => {
      const errors = validationResult(req)
      var item = new Item({
        category: req.body.category,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        manufacturer: req.body.manufacturer,
        ssd: req.body.ssd,
        ram: req.body.ram,
        screen_size: req.body.screen_size,
        description: req.body.description,
        img: req.file?.filename,
      })

    if (!req.file.mimetype.match(/^image/) ) {
      res.render('item_form', {title: 'Add item to inventory', item: item, errorImage: true})      
    } else if (!errors.isEmpty()) {
      res.render('item_form', {title: 'Add item to inventory', item: item, errors: errors.array(), selected_category: ''})
    } else {
      item.save(function (err) {
        if (err) {return next(err)} 
        res.redirect(item.url)
      })
    }
  }
]

exports.item_update_get = function(req, res, next) {
  Item.findById(req.params.id).exec(function (err, item) {
    if (err) { return next(err)}
    res.render('item_form', {title: 'Update item', item: item})
  })
}

exports.item_update_post = [
  upload.single('image'),
  body('category', 'Category must be selected').isLength({min:1}).escape(),
  body('name', 'Name must not be empty').trim().isLength({min: 1}).escape(),
  body('price', 'Price must not be empty').trim().isLength({min: 1}).escape(),
  body('stock', 'Stock must not be empty').trim().isLength({min: 1}).escape(),
  body('manufacturer', 'Manufacturer must not be empty').escape(),
  body('ssd').escape(),
  body('ram').escape(),
  body('screen_size').escape(),
  body('description').escape(),

  (req, res, next) => {
      const errors = validationResult(req)

      var item = new Item({
        category: req.body.category,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        manufacturer: req.body.manufacturer,
        ssd: req.body.ssd,
        ram: req.body.ram,
        screen_size: req.body.screen_size,
        description: req.body.description,
        img: req.file?.filename,
        _id: req.params.id
      })
    if (!errors.isEmpty()) {
      res.render('item_form', {title: 'Add item to inventory', item: item, errors: errors.array()}, selected_category = req.body.category)
    } else {
      Item.findByIdAndUpdate(req.params.id, item, {}, function (err, theitem) {
        if (err) {return next(err)} 
        res.redirect(theitem.url)
      })
    }
  }
]

exports.item_delete_get = function(req, res, next) {
  Item.findById(req.params.id).exec(function (err, item) {
    if (err) { return next(err)}
    res.render('item_delete', {title: 'Delete item', item: item})
  })
}

exports.item_delete_post = function(req, res, next) {
    Item.findByIdAndDelete(req.body.itemid, function deleteItem(err) {
      if (err) { return next(err)}
      res.redirect('/')
    })
}