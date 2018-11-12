var express = require('express');
var router = express.Router();
var Datadate = require('../models/datadate');
var moment = require('moment');

// 1# ADD Datadate
router.post('/', (req, res) => {
  let datadate = new Datadate({
    letter: req.body.letter,
    frequency: req.body.frequency
  })
  datadate.save().then(datadate1 => {
    res.json({
      success: true,
      message: "data has been added",
      data:{
        _id: datadate1._id,
        letter: moment(datadate1.letter).format("YYYY-MM-DD"),
        frequency: datadate1.frequency
      }
    })
  }).catch(err =>{
    res.json({
      success: false,
      message: "adding data has been failed",
      data:{
        _id: null,
        letter: null,
        frequency: null
      }
    })
  })
})

// 2# BROWSE
router.post('/search', (req, res) =>{
  let keyword = {};
  if(req.body.letter){
    keyword.letter = req.body.letter
  }
  if(req.body.frequency){
    keyword.frequency = req.body.frequency
  }

  Datadate.find(keyword).then(datadate1 => {
    let data = []
    datadate1.forEach(item => {
      data.push({
        _id: item._id,
        letter: moment(item.letter).format("YYYY-MM-DD"),
        frequency: item.frequency
      })
    })
    res.json(data);
  }).catch(err =>{
    res.json({
      error: true,
      message: err.message
    })
  })
})

// 3# READ
router.get('/', (req, res) =>{
  Datadate.find().then(data1 =>{
    let data = []
    data1.forEach(item => {
      data.push({
        _id: item._id,
        letter: moment(item.letter).format("YYYY-MM-DD"),
        frequency: item.frequency
      })
    })
    res.json(data);
  }).catch(err =>{
    json({
      error: true,
      message: `something went wrong : ${err.message}`
    })
  })
})

//  4# Edit
router.put('/:id', function(req, res, next) {
  let id = req.params.id;
  Datadate.findByIdAndUpdate(id, {
    letter: req.body.letter,
    frequency: req.body.frequency
  }, {new: true}).then(data => {
    if(!data){
      res.json({
        success: false,
        message: `updating data has been failed id : ${id} not found`,
        data: {
          _id: null,
          letter: null,
          frequency: null
        }
      })
    }else{
      res.json({
        success: true,
        message: "data has been updated",
        data: {
          _id: data._id,
          letter: moment(data.letter).format("YYYY-MM-DD"),
          frequency: data.frequency
        }
      })
    }
  }).catch(err => {
    res.json({
      success: false,
      message: "updating data has been failed",
      data: {
        _id: null,
        letter: null,
        frequency: null
      }
    })
  })
})

// 5# Delete
router.delete('/:id', function(req, res, next) {
  let id = req.params.id;
  Datadate.findByIdAndRemove(id).then(data => {
    if(data){
      res.json({
        success: true,
        message: "data have been deleted",
        data:{
          _id: data._id,
          letter: moment(data.letter).format("YYYY-MM-DD"),
          frequency: data.frequency
        }
      })
    }else{
      res.json({
        success: false,
        message: `daleting data has been failed id: ${id}`,
        data:{
          _id: null,
          letter: null,
          frequency: null
        }
      })
    }
  }).catch(err => {
    res.json({
      success: false,
      message: "daleting data has been failed id: ",
      data:{
        _id: null,
        letter: null,
        frequency: null
      }
    })
  })
})

// 6# Find
router.get('/:id', function(req, res, next){
  let id = req.params.id;
  Datadate.findById(id).then(data => {
    if(data){
      res.json({
        success: true,
        message: "data found",
        data:{
          _id: data._id,
          letter: moment(data.letter).format("YYYY-MM-DD"),
          frequency: data.frequency
        }
      })
    }else{
      res.json({
        success: false,
        message: `data with id: ${id} not found`,
        data:{
          _id: null,
          letter: null,
          frequency: null
        }
      })
    }
  }).catch(err =>{
    res.json({
      success: false,
      message: "data not found",
      data:{
        _id: null,
        letter: null,
        frequency: null
      }
    })
  })
})

module.exports = router;
