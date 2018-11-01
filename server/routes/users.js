var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');


/* GET users listing. */
// router.get('/', function(req, res, next){
//   User.find({}, (err, data)=>{
//     res.json(data);
//   })
// })


router.post('/register', function(req, res, next){
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    retypepassword: req.body.retypepassword
  });

  user.save((err, userSaved)=>{
    let token = jwt.sign({ user: user }, 'secretkey', { expiresIn: 86400 });
    res.json(
      {
        data: {
          email: userSaved.email
        },
        token: token
      });
    })
  })

  router.post('/login', (req, res) =>{
    User.findOne({
      email: req.body.email,
    }).then(user => {
      if(!user){
        res.json({error: true, message : "Email is invalid"})
      }else{
        if(req.body.password != user.password){
          res.json({error: true, message: "Password is invalid"})
        }else{
          let token = jwt.sign({ user: user }, 'secretkey', { expiresIn: 86400 });
          res.json({
            data:{
              email: user.email
            },
            token: token
          })
        }
      }
    })
  })

  router.get('/', (req, res) => {
    User.find({}).then(user => {
      res.json(user);
    }).catch(err => {
      console.log(err.message());
    })
  })

  router.post('/check', (req, res) =>{
    var token = req.body.token || req.query.token || req.header['x-access-token'];
    jwt.verify(token, 'secretkey', (err, decoded)=>{
      if(decoded){
        res.json({valid: true})
      }else{
        res.json({valid: false, message: "Token is invalid"})
      }

    })
  })

  router.get('/destroy', (req, res) =>{
  res.json({
    logout: true
  })
})



  // router.post('/register', function(req, res, next) {
  //   res.json(req.body);
  // });
  //
  // router.post('/login', function(req, res, next) {
  //   if(req.body.email && req.body.password){
  //     //User.find().
  //   }
  // res.json(
  //   {
  //     data: {
  //       email: 'test'
  //     },
  //     token: 'asfsafdasf'
  //   });
  //   });

  module.exports = router;
