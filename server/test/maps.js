const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');

const Maps = require('../models/maps');
const should = chai.should();

chai.use(chaiHTTP);

describe('maps',function(){

  beforeEach(function(done){
    let maps = new Maps({
      title : "Pondok Indah Mall",
      lat : -6.8965475,
      lng : 107.6103536
    })
    maps.save(function(err){
      done();
    })
  })

  afterEach(function(done){
    Maps.collection.drop();
    done();
  })

  // Add Maps
  it("Seharusnya data menyipan data maps dengan metode POST", function(done){
    chai.request(server)
    .post('/api/maps')
    .send({
      title: "Pondok Indah Mall",
      lat: -6.578901,
      lng: 108.6103
    }).end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.should.have.property('message');
      res.body.should.have.property('data');
      res.body.success.should.equal(true);
      res.body.message.should.equal("data have been added");
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('_id');
      res.body.data.title.should.equal('Pondok Indah Mall');
      res.body.data.lat.should.equal(-6.578901);
      res.body.data.lng.should.equal(108.6103);
      done()
    })
  })

  it("Mencari data detail dari title dengan mengembalikannya dengan metode POST", function(done){
    chai.request(server)
    .post('/api/maps/search')
    .send({
      title: "Pondok Indah Mall"
    }).end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('lat');
      res.body[0].should.have.property('lng');
      res.body[0].title.should.equal("Pondok Indah Mall");
      res.body[0].lat.should.equal(-6.8965475);
      res.body[0].lng.should.equal(107.6103536);
      done();
    })
  })

  it("Seharusnya sistem mengembalikan nilai id, title, lat dan lng dengan metode GET", function(done){
    chai.request(server)
    .get('/api/maps')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('lat');
      res.body[0].should.have.property('lng');
      res.body[0].title.should.equal("Pondok Indah Mall");
      res.body[0].lat.should.equal(-6.8965475);
      res.body[0].lng.should.equal(107.6103536);
      done()
    })
  })

  it("Seharusnya Sistem mengembalikan nilai yang berhasil di ubah dengan metode PUT", function(done) {
    chai.request(server)
    .get('/api/maps')
    .end(function(err, res){
      chai.request(server)
      .put('/api/maps/' + res.body[0]._id)
      .send({
        title: "Pondok Indah Mall 2",
        lat: -6.8965475,
        lng:107.6103536
      }).end(function(err, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        response.body.success.should.equal(true);
        response.body.message.should.equal("data have been updated")
        response.body.data.title.should.equal('Pondok Indah Mall 2');
        response.body.data.lat.should.equal(-6.8965475);
        response.body.data.lng.should.equal(107.6103536);
        done();
      })
    })
  })

  it("seharusnya sistem menghapus satu data berdasarkan id dengan metode DELETE", function(done){
    chai.request(server)
    .get('/api/maps')
    .end(function(err, res){
      chai.request(server)
      .delete('/api/maps/' + res.body[0]._id)
      .end(function(err, response){
        response.should.have.status(200);
        response.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        response.body.success.should.equal(true);
        response.body.message.should.equal("data have been deleted");
        response.body.data.title.should.equal("Pondok Indah Mall");
        response.body.data.lat.should.equal(-6.8965475);
        response.body.data.lng.should.equal(107.6103536);
        done();
      })
    })
  })

  it("seharusnya sistem menampilkan data berdasarkan id dengan metode GET", function(done){
    chai.request(server)
    .get('/api/maps')
    .end(function(err, res){
      chai.request(server)
      .get('/api/maps/' + res.body[0]._id)
      .end(function(err, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        response.body.success.should.equal(true);
        response.body.message.should.equal("data found");
        response.body.data.title.should.equal('Pondok Indah Mall');
        response.body.data.lat.should.equal(-6.8965475);
        response.body.data.lng.should.equal(107.6103536);
        done();
      })
    })
  })
})
