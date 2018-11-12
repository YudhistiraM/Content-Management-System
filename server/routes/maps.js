var express = require('express');
var router = express.Router();
var Maps = require('../models/maps');


//  1# Add Maps
router.post('/', (req, res) =>{
  let maps = new Maps({
    title: req.body.title,
    lat: req.body.lat,
    lng: req.body.lng
  })
  maps.save().then(data1 => {
    res.json({
      success: true,
      message: "data have been added",
      data:{
        _id: data1._id,
        title: data1.title,
        lat: data1.lat,
        lng: data1.lng
      }
    })
  }).catch(err => {
    res.json({
      success: false,
      message: "adding data has been failed",
      data:{
        _id: null,
        title: null,
        lat: null,
        lng: null
      }
    })
  })
})

//  2# BROWSE
router.post('/search', (req, res)=>{
  let keysearch = {};
  if (req.body.title){
    keysearch.title = {$regex: req.body.title, $options: "$i"}
  }

  Maps.find(keysearch).then(data1 =>{
    res.json(data1);
  }).catch(err =>{
    res.json({
      error: true,
      message: err.message
    })
  })
})

// 3# READ maps
router.get('/', (req, res) =>{
  Maps.find().then(data1 =>{
    res.json(data1);
  }).catch(err =>{
    json({
      error: true,
      message: `something went wrong : ${err.message}`
    })
  })
})

// 4# EDIT maps
router.put('/:id', function(req, res, next) {
  let id = req.params.id;
  Maps.findByIdAndUpdate(id, {
    title: req.body.title,
    lat: req.body.lat,
    lng: req.body.lng
  }, {new: true}).then(data => {
    if(!data){
      res.json({
        success: false,
        message: `updating data has been failed id : ${id} not found`,
        data: {
          _id: null,
          title: null,
          lat: null,
          lng: null
        }
      })
    }else{
      res.json({
        success: true,
        message: "data have been updated",
        data: {
          _id: data._id,
          title: data.title,
          lat: data.lat,
          lng: data.lng
        }
      })
    }
  }).catch(err => {
    res.json({
      success: false,
      message: "updating data has been failed",
      data: {
        _id: null,
        title: null,
        lat: null,
        lng: null
      }
    })
  })
})

// 5# DELETE
router.delete('/:id', function(req, res, next) {
  let id = req.params.id;
  Maps.findByIdAndRemove(id).then(data => {
    if(data){
      res.json({
        success: true,
        message: "data have been deleted",
        data:{
          _id: data._id,
          title: data.title,
          lat: data.lat,
          lng: data.lng
        }
      })
    }else{
      res.json({
        success: false,
        message: `daleting data has been failed id: ${id}`,
        data:{
          _id: null,
          title: data.title,
          lat: data.lat,
          lng: data.lng
        }
      })
    }
  }).catch(err => {
    res.json({
      success: false,
      message: "daleting data has been failed id: ",
      data:{
        _id: null,
        title: null,
        lat: null,
        lng: null
      }
    })
  })
})

//  6# Find Maps
router.get('/:id', function(req, res, next){
  let id = req.params.id;
  Maps.findById(id).then(data => {
    if(data){
      res.json({
        success: true,
        message: "data found",
        data:{
          _id: data._id,
          title: data.title,
          lat: data.lat,
          lng: data.lng
        }
      })
    }else{
      res.json({
        success: false,
        message: `data with id: ${id} not found`,
        data:{
          _id: null,
          title: null,
          lat: null,
          lng: null
        }
      })
    }
  }).catch(err =>{
    res.json({
      success: false,
      message: "data not found",
      data:{
        _id: null,
        title: null,
        lat: null,
        lng: null
      }
    })
  })
})

module.exports = router;
